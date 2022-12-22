import { type IDocument } from '../types';

/**
 * Adds new document to the documents array.
 * @param newDoc The new IDocument object to add.
 * @param docs The array of IDocument objects to search in.
 * @returns The updated array of IDocument objects.
 */
const addDocument: (newDoc: IDocument, docs: IDocument[]) => IDocument[] = (newDoc, docs) => {
  // If the new document is added to the root
  if (newDoc.parent === -1) return [...docs, newDoc];
  const updatedState = docs.map((item) => {
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

export default addDocument;
