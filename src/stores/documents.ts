import create from 'zustand';
import { persist } from 'zustand/middleware';
import { type IDocument, type IMenuNames, type IRunComponent } from '../types';
import { DOCUMENTS, searchByKey, updateDocument } from '../utils';

interface DocumentsState {
  // All documents
  documents: IDocument[];
  findAndUpdateContent: (key: number, newContent: string) => void;
  setDocuments: (documents: IDocument[]) => void;
  clearDocuments: () => void;
  // Active folders
  activeFolders: number[];
  addActiveFolder: (folderId: number) => void;
  removeActiveFolder: (folderId: number) => void;
  clearActiveFolders: () => void;
  // Active file
  activeFile: number;
  setActiveFile: (fileId: number) => void;
  // Active line number
  activeLineNumber: number;
  setActiveLineNumber: (lineNumber: number) => void;
  // Active tabs
  activeTabs: number[];
  addActiveTab: (fileId: number) => void;
  removeActiveTab: (fileId: number) => void;
  clearActiveTabs: () => void;
  // Show menus
  showMenu: { [key in IMenuNames]: boolean };
  toggleMenu: (menuName: IMenuNames) => void;
  hideAllMenus: () => void;
  // Run component
  runComponent: IRunComponent;
  setRunComponent: (componentName: IRunComponent) => void;
}

const useDocumentsStore = create<DocumentsState>()(
  persist(
    (set, get) => ({
      // All documents
      documents: JSON.parse(JSON.stringify(DOCUMENTS)),
      findAndUpdateContent: (key, newContent) =>
        set((state) => {
          const currentDocument = searchByKey(key, state.documents);
          // If the current document is a folder, do nothing
          if (!currentDocument || currentDocument.type === 'FOLDER')
            return { documents: state.documents };
          // If the current document is a file, update the content
          const newDocuments = updateDocument(
            key,
            { ...currentDocument, content: newContent },
            state.documents
          );
          return { documents: newDocuments };
        }),
      setDocuments: (documents) => set(() => ({ documents })),
      clearDocuments: () => set(() => ({ documents: JSON.parse(JSON.stringify(DOCUMENTS)) })),
      // Active folders
      activeFolders: [1],
      addActiveFolder: (folderId) =>
        set((state) => ({
          activeFolders: [...state.activeFolders, folderId],
        })),
      removeActiveFolder: (folderId) =>
        set((state) => ({
          activeFolders: state.activeFolders.filter((id) => id !== folderId),
        })),
      clearActiveFolders: () => set(() => ({ activeFolders: [] })),
      // Active file
      activeFile: 12,
      setActiveFile: (fileId) => {
        get().setActiveLineNumber(-1);
        set(() => ({ activeFile: fileId }));
      },
      // Active line number
      activeLineNumber: -1,
      setActiveLineNumber: (lineNumber) => set(() => ({ activeLineNumber: lineNumber })),
      // Active tabs
      activeTabs: [12],
      addActiveTab: (fileId) =>
        set((state) => {
          // If the tab is already open, do nothing
          if (state.activeTabs.indexOf(fileId) === -1) {
            // when adding a new tab, set it as the active file
            state.setActiveFile(fileId);
            return {
              activeTabs: [...state.activeTabs, fileId],
            };
          }
          return {};
        }),
      removeActiveTab: (fileId) =>
        set((state) => ({
          activeTabs: state.activeTabs.filter((id) => id !== fileId),
        })),
      clearActiveTabs: () => set(() => ({ activeTabs: [] })),
      // Show menus
      showMenu: {
        documentMenu: false,
        searchMenu: false,
        extensionMenu: false,
        runMenu: true,
      },
      toggleMenu: (menuName) => {
        if (!get().showMenu[menuName]) get().hideAllMenus();
        set((state) => ({
          showMenu: {
            ...state.showMenu,
            [menuName]: !state.showMenu[menuName],
          },
        }));
      },
      hideAllMenus: () =>
        set(() => ({
          showMenu: {
            documentMenu: false,
            searchMenu: false,
            extensionMenu: false,
            runMenu: false,
          },
        })),
      // Run component
      runComponent: 'Home',
      setRunComponent: (componentName) => set(() => ({ runComponent: componentName })),
    }),
    { name: 'documents-CE' }
  )
);

export default useDocumentsStore;
