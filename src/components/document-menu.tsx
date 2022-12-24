import {
  ArrowDownOnSquareStackIcon,
  ArrowPathIcon,
  DocumentPlusIcon,
  FolderPlusIcon,
} from '@heroicons/react/24/outline/';
import { type CSSProperties, type FunctionComponent, useRef, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { useDocumentsStore } from '../stores';
import { type IDocument } from '../types';
import { addDocument, clg, DOCUMENTS_ORDER, removeDocument, updateDocument } from '../utils';
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
  // State for edit mode
  const [onEditMode, setOnEditMode] = useState<boolean>(false);
  const fileButtonRef = useRef<HTMLButtonElement>(null);
  const folderButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // const [preventOnBlur, setPreventOnBlur] = useState<boolean>(false);

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

  const handleEditComplete = (doc: IDocument, value: string) => {
    const updatedDoc = doc;
    updatedDoc.title = value;
    updatedDoc.onEditMode = false;
    const newState = updateDocument(doc.key, updatedDoc, documents);
    setDocuments(newState);
    setOnEditMode(false);
  };

  const handleEditCancel = (doc: IDocument) => {
    const newState = removeDocument(doc.key, documents);
    setDocuments(newState);
    setOnEditMode(false);
  };

  const handleFileAdd = () => {
    // Prevent adding a new file if there is already one in edit mode
    if (onEditMode) {
      inputRef.current?.focus();
      return;
    }
    setOnEditMode(true);
    const newFile: IDocument = {
      key: Math.floor(Math.random() * 1000),
      title: '',
      type: 'FILE',
      content: '',
      parent: activeFolders[activeFolders.length - 1] ?? -1,
      onEditMode: true,
    };
    const newState = addDocument(newFile, documents);
    setDocuments(newState);
  };

  const handleFolderAdd = () => {
    // Prevent adding a new folder if there is already one in edit mode
    if (onEditMode) {
      inputRef.current?.focus();
      return;
    }
    setOnEditMode(true);
    const newFolder: IDocument = {
      key: Math.floor(Math.random() * 1000),
      title: '',
      type: 'FOLDER',
      children: [],
      parent: activeFolders[activeFolders.length - 1] ?? -1,
      onEditMode: true,
    };
    const newState = addDocument(newFolder, documents);
    setDocuments(newState);
  };

  const handleResetDocuments = () => {
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
        <p className="select-none font-segoeui text-base font-normal text-slate-900 dark:text-slate-100">
          EXPLORER
        </p>
        {/* Buttons */}
        <div className="flex gap-2">
          <button
            ref={fileButtonRef}
            className="text-slate-600 dark:text-slate-400"
            type="button"
            title="Add file"
            onClick={handleFileAdd}
          >
            <DocumentPlusIcon className="h-6 w-6" />
          </button>
          <button
            ref={folderButtonRef}
            className="text-slate-600 dark:text-slate-400"
            type="button"
            onClick={handleFolderAdd}
            title="Add folder"
          >
            <FolderPlusIcon className="h-6 w-6" />
          </button>

          <ArrowPathIcon
            className="h-6 w-6 cursor-pointer text-slate-600 dark:text-slate-400"
            onClick={handleResetDocuments}
            title="Reset documents"
          />
          <ArrowDownOnSquareStackIcon
            className="h-6 w-6 cursor-pointer text-slate-600 dark:text-slate-400"
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
                  onEditComplete={handleEditComplete}
                  onEditCancel={handleEditCancel}
                  inputRef={inputRef}
                  excludeBlur={[fileButtonRef, folderButtonRef]}
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
