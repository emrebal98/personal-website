import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
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
  // Active document
  folderHasActiveFile: number;
  setFolderHasActiveFile: (folderId: number) => void;
  // Active tabs
  activeTabs: number[];
  addActiveTab: (fileId: number) => void;
  removeActiveTab: (fileId: number) => void;
  clearActiveTabs: () => void;
  // Active tab
  activeTab: number;
  setActiveTab: (fileId: number) => void;
}

const useDocumentsStore = create<DocmentsState>(
  // @ts-ignore - devtools is not a valid middleware
  devtools(
    persist(
      (set) => ({
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
        // Active document
        folderHasActiveFile: -1,
        setFolderHasActiveFile: (folderId) => set(() => ({ folderHasActiveFile: folderId })),
        // Active tabs
        activeTabs: [],
        addActiveTab: (fileId) =>
          set((state) => ({
            activeTabs: [...state.activeTabs, fileId],
          })),
        removeActiveTab: (fileId) =>
          set((state) => ({
            activeTabs: state.activeTabs.filter((id) => id !== fileId),
          })),
        clearActiveTabs: () => set(() => ({ activeTabs: [] })),
        // Active tab
        activeTab: -1,
        setActiveTab: (fileId) => set(() => ({ activeTab: fileId })),
      }),
      { name: 'documents' }
    )
  )
);

export default useDocumentsStore;
