import {
  ArrowDownOnSquareStackIcon,
  ArrowPathIcon,
  DocumentPlusIcon,
  FolderPlusIcon,
} from '@heroicons/react/24/outline/';
import { type CSSProperties, type FunctionComponent } from 'react';
import SimpleBar from 'simplebar-react';
import { useDocumentsStore } from '../stores';
import { type IDocument } from '../types';
import { clg, DOCUMENTS_ORDER } from '../utils';
import Document from './document';

interface IDocumentMenu {
  className?: string;
  style?: CSSProperties;
}

const DocumentMenu: FunctionComponent<IDocumentMenu> = ({ className, style }) => {
  // All documents
  const documents = useDocumentsStore((state) => state.documents);
  const setDocuments = useDocumentsStore((state) => state.setDocuments);
  const clearDocuments = useDocumentsStore((state) => state.clearDocuments);
  // Active folders
  const activeFolders = useDocumentsStore((state) => state.activeFolders);
  const addActiveFolder = useDocumentsStore((state) => state.addActiveFolder);
  const removeActiveFolder = useDocumentsStore((state) => state.removeActiveFolder);
  const clearActiveFolders = useDocumentsStore((state) => state.clearActiveFolders);
  // Active file
  const activeFile = useDocumentsStore((state) => state.activeFile);
  const setActiveFile = useDocumentsStore((state) => state.setActiveFile);
  // Active tabs
  const addActiveTab = useDocumentsStore((state) => state.addActiveTab);
  const clearActiveTabs = useDocumentsStore((state) => state.clearActiveTabs);

  const handleFolderClick = (doc: IDocument) => {
    // Open folder
    if (activeFolders.findIndex((f) => f === doc.key) === -1) {
      // Add folder to active folders
      addActiveFolder(doc.key);
    }
    // Close folder
    else {
      // Remove folder from active folders list
      removeActiveFolder(doc.key);
    }
  };

  const handleFileClick = (doc: IDocument) => {
    if (activeFile !== doc.key) {
      // Set active file
      setActiveFile(doc.key);
      addActiveTab(doc.key);
    }
  };

  const handleCollapseFolders = () => {
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
    // setFolderHasActiveFile(-1);
    // Initial state of the active folders
    clearActiveFolders();
    addActiveFolder(1);
    setActiveFile(12);
    // Initial state of the active tabs
    clearActiveTabs();
    addActiveTab(12);
    // Iniital state of the documents
    clearDocuments();
  };
  return (
    <div
      className={clg('flex w-full flex-col gap-4 py-2 px-4 md:min-w-[300px] md:max-w-[300px]', {
        [className as string]: className !== undefined,
      })}
      style={style}
    >
      {/* Topbar */}
      <div className="flex justify-between gap-4 md:gap-16">
        {/* Text */}
        <p className="select-none font-segoeui text-base font-normal text-slate-100">EXPLORER</p>
        {/* Buttons */}
        <div className="flex gap-2">
          <DocumentPlusIcon
            className="h-6 w-6 cursor-pointer text-slate-400"
            onClick={handleFileAdd}
            title="Add file"
          />
          <FolderPlusIcon
            className="h-6 w-6 cursor-pointer text-slate-400"
            onClick={handleFolderAdd}
            title="Add folder"
          />
          <ArrowPathIcon
            className="h-6 w-6 cursor-pointer text-slate-400"
            onClick={handleResetDocuments}
            title="Reset documents"
          />
          <ArrowDownOnSquareStackIcon
            className="h-6 w-6 cursor-pointer text-slate-400"
            onClick={handleCollapseFolders}
            title="Collapse folders"
          />
        </div>
      </div>
      {/* Folders */}
      <div className="h-full overflow-hidden">
        <SimpleBar className="h-full w-full">
          <div className="flex flex-col gap-4">
            {documents
              .sort((a, b) => DOCUMENTS_ORDER.indexOf(a.type) - DOCUMENTS_ORDER.indexOf(b.type))
              .map((doc) => (
                <Document
                  key={doc.key}
                  document={doc}
                  onFolderClick={handleFolderClick}
                  onFileClick={handleFileClick}
                />
              ))}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

DocumentMenu.defaultProps = {
  className: undefined,
  style: undefined,
};

export default DocumentMenu;
