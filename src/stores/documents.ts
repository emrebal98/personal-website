import create from 'zustand';
// import { devtools, persist } from 'zustand/middleware';
import { type IDocument } from '../types';
import { DOCUMENTS } from '../utils';

interface DocmentsState {
  // All documents
  documents: IDocument[];
  setDocuments: (documents: IDocument[]) => void;
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
}

const useDocumentsStore = create<DocmentsState>((set) => ({
  // All documents
  documents: DOCUMENTS,
  setDocuments: (documents) => set(() => ({ documents })),
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
}));

export default useDocumentsStore;
