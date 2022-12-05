import {
  ArrowDownOnSquareStackIcon,
  ArrowPathIcon,
  DocumentPlusIcon,
  FolderPlusIcon,
} from '@heroicons/react/24/outline/';
import { type FunctionComponent } from 'react';
import { useDocumentsStore } from '../stores';
import { type IDocument } from '../types';
import { DOCUMENTS, DOCUMENTS_ORDER, findParents } from '../utils';

import Document from './document';

const LeftMenuBar: FunctionComponent = () => {
  // All documents
  const documents = useDocumentsStore((state) => state.documents);
  const setDocuments = useDocumentsStore((state) => state.setDocuments);
  // Active folders
  const activeFolders = useDocumentsStore((state) => state.activeFolders);
  const addActiveFolder = useDocumentsStore((state) => state.addActiveFolder);
  const removeActiveFolder = useDocumentsStore((state) => state.removeActiveFolder);
  const clearActiveFolders = useDocumentsStore((state) => state.clearActiveFolders);
  // Active file
  const activeFile = useDocumentsStore((state) => state.activeFile);
  const setActiveFile = useDocumentsStore((state) => state.setActiveFile);
  // Active document
  const folderHasActiveFile = useDocumentsStore((state) => state.folderHasActiveFile);
  const setFolderHasActiveFile = useDocumentsStore((state) => state.setFolderHasActiveFile);

  const isActiveFolder = (key: number) => {
    if (key === -1) return false;
    // Find the parents of the given key that are folders
    const parents = findParents(key, documents).filter((f) => f.type === 'FOLDER');
    // Return `true` if every parent is included in the activeFolders list, otherwise `false`
    return parents.every((k) => activeFolders.includes(k.key));
  };
  const isActiveFile = (key: number) => activeFile === key;
  const isFolderHasActiveFile = (key: number) => folderHasActiveFile === key;

  const handleFolderClick = (doc: IDocument) => {
    // Open folder
    if (activeFolders.findIndex((f) => f === doc.key) === -1) {
      // If folder has active file remove the active folder from the folderHasActiveFile
      if (isFolderHasActiveFile(doc.key)) {
        const parents = findParents(activeFile, documents).filter((f) => f.type === 'FOLDER');
        const notInActiveFolderButHasActiveChild = parents.find(
          (f) => !activeFolders.includes(f.key) && f.key !== doc.key
        );
        if (notInActiveFolderButHasActiveChild)
          setFolderHasActiveFile(notInActiveFolderButHasActiveChild.key);
        else setFolderHasActiveFile(-1);
      }
      // Add folder to active folders
      addActiveFolder(doc.key);
    }
    // Close folder
    else {
      // Check closed folder has active file
      const parents = findParents(activeFile, documents).filter((f) => f.type === 'FOLDER');
      const result = parents.findIndex((f) => f.key === doc.key) !== -1;
      if (result) setFolderHasActiveFile(doc.key);
      // Remove folder from active folders list
      removeActiveFolder(doc.key);
    }
  };

  const handleFileClick = (doc: IDocument) => {
    if (activeFile !== doc.key) {
      // Clear folderHasActiveFile
      setFolderHasActiveFile(-1);
      // Set active file
      setActiveFile(doc.key);
    }
  };

  const handleCollapseFolders = () => {
    // Check folderHasActiveFile for all top parent folders
    const parents = findParents(activeFile, documents).filter((f) => f.type === 'FOLDER');
    const result = parents.findIndex((f) => f.parent === -1) !== -1;
    if (result) setFolderHasActiveFile((parents[parents.length - 1] as IDocument).key);
    // Clear active folders
    clearActiveFolders();
  };

  // Adds new document to the documents array according to the parent
  const addDocument: (newDoc: IDocument, state: IDocument[]) => IDocument[] = (newDoc, state) => {
    // If the new document is added to the root
    if (newDoc.parent === -1) return [...state, newDoc];
    const updatedState = state.map((item) => {
      // If the parent is found, add the new document to the children array
      if (item.type === 'FOLDER' && item.children && item.key === newDoc.parent) {
        return {
          ...item,
          children: [...item.children, newDoc],
        };
      }
      // If the parent is not found, keep the same state
      if (item.type === 'FOLDER' && item.children) {
        return {
          ...item,
          children: addDocument(newDoc, item.children),
        };
      }
      return item;
    });
    return updatedState;
  };

  // TODO: make this editable
  const handleFileAdd = () => {
    const newFile: IDocument = {
      key: Math.floor(Math.random() * 1000),
      title: 'newFile.tsx',
      type: 'FILE',
      parent: activeFolders[activeFolders.length - 1] ?? -1,
    };
    const newState = addDocument(newFile, documents);
    setDocuments(newState);
  };

  // TODO: make this editable
  const handleFolderAdd = () => {
    const newFolder: IDocument = {
      key: Math.floor(Math.random() * 1000),
      title: 'newFolder',
      type: 'FOLDER',
      children: [],
      parent: activeFolders[activeFolders.length - 1] ?? -1,
    };
    const newState = addDocument(newFolder, documents);

    setDocuments(newState);
  };

  const handleResetDocuments = () => {
    // Return to the initial state
    clearActiveFolders();
    addActiveFolder(1);
    setActiveFile(12);
    setFolderHasActiveFile(-1);
    setDocuments(DOCUMENTS);
  };
  return (
    <div className="flex flex-col gap-4 py-2 px-4">
      {/* Topbar */}
      <div className="flex gap-16">
        {/* Text */}
        <p className="select-none font-segoeui text-base font-normal text-slate-100">EXPLORER</p>
        {/* Buttons */}
        <div className="flex gap-2">
          <DocumentPlusIcon
            className="h-6 w-6 cursor-pointer text-slate-400"
            onClick={handleFileAdd}
          />
          <FolderPlusIcon
            className="h-6 w-6 cursor-pointer text-slate-400"
            onClick={handleFolderAdd}
          />
          <ArrowPathIcon
            className="h-6 w-6 cursor-pointer text-slate-400"
            onClick={handleResetDocuments}
          />
          <ArrowDownOnSquareStackIcon
            className="h-6 w-6 cursor-pointer text-slate-400"
            onClick={handleCollapseFolders}
          />
        </div>
      </div>
      {/* Folders */}
      {documents
        .sort((a, b) => DOCUMENTS_ORDER.indexOf(a.type) - DOCUMENTS_ORDER.indexOf(b.type))
        .map((doc) => (
          <Document
            key={doc.key}
            document={doc}
            isActiveFile={isActiveFile}
            isActiveFolder={isActiveFolder}
            isFolderHasActiveFile={isFolderHasActiveFile}
            onFolderClick={handleFolderClick}
            onFileClick={handleFileClick}
          />
        ))}
    </div>
  );
};

export default LeftMenuBar;
