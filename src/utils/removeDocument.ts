import { type IDocument } from '../types';

/**
 * Remove the IDocument from the documents array.
 * @param key The key of the IDocument object to remove.
 * @param docs The array of IDocument objects to search in.
 * @returns The updated array of IDocument objects.
 */
const removeDocument: (key: number, docs: IDocument[]) => IDocument[] = (key, docs) => {
  // Create a new array to store the updated documents
  const updatedDocuments: IDocument[] = [];

  docs.forEach((doc) => {
    // Create a new document to store the updated document
    const newDoc = doc;
    // Check if the current document is an IFolder
    if (newDoc.type === 'FOLDER') {
      // If so, update the children of the folder recursively
      newDoc.children = removeDocument(key, newDoc.children);
    }
    // Check if the current document is an IDocument with the specified key
    if (newDoc.key !== key) {
      // Add the document to the updated array
      updatedDocuments.push(newDoc);
    }
  });
  // Return the updated array
  return updatedDocuments;
};

export default removeDocument;
