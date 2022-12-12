import create from 'zustand';
// import { devtools, persist } from 'zustand/middleware';
import { type IDocument, type IFile, type MenuNames } from '../types';
import { DOCUMENTS, searchByKey, updateFileContent } from '../utils';

interface DocumentsState {
  // All documents
  documents: IDocument[];
  findActiveFile: (key: number) => IFile | null;
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
  // Active tabs
  activeTabs: number[];
  addActiveTab: (fileId: number) => void;
  removeActiveTab: (fileId: number) => void;
  clearActiveTabs: () => void;
  // Show menus
  showMenu: { [key in MenuNames]: boolean };
  toggleMenu: (menuName: MenuNames) => void;
}

const useDocumentsStore = create<DocumentsState>((set, get) => ({
  // All documents
  documents: JSON.parse(JSON.stringify(DOCUMENTS)),
  findActiveFile: (key) => {
    const activeFile = searchByKey(key, get().documents);
    if (activeFile && activeFile.type === 'FILE') return activeFile;
    return null;
  },
  findAndUpdateContent: (key, newContent) =>
    set((state) => {
      const newDocuments = updateFileContent(key, newContent, state.documents);
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
  setActiveFile: (fileId) => set(() => ({ activeFile: fileId })),
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
    leftMenuBar: true,
    rightMenuBar: false,
  },
  toggleMenu: (menuName) =>
    set((state) => ({
      showMenu: {
        ...state.showMenu,
        [menuName]: !state.showMenu[menuName],
      },
    })),
}));

export default useDocumentsStore;
