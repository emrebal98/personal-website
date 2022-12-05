import { type IDocument } from '../types';
import searchByKey from './searchByKey';

/**
 * Finds if any child of a folder is an active file.
 * @param key The key of the parent folder.
 * @param activeFile The key of the active file.
 * @param docs The array of documents.
 * @returns true if any child of the folder is an active file, false otherwise.
 */
const findIfAnyChildIsActive: (key: number, activeFile: number, docs: IDocument[]) => boolean = (
  key,
  activeFile,
  docs
) => {
  // Find the document object with the given key.
  const self = searchByKey(key, docs);
  // If the document object is not found, return false.
  if (!self) return false;

  // If the document object is a file, check if its key is the active file.
  if (self.type === 'FILE') return activeFile === self.key;
  // If the document object is a folder, check if any of its children is an active file.
  if (self.type === 'FOLDER')
    return self.children.some((child) => findIfAnyChildIsActive(child.key, activeFile, docs));
  // If the folder object is not a file or a folder, return false.
  return false;
};

export default findIfAnyChildIsActive;
