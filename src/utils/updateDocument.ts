import { type IDocument } from '../types';

/**
 * Update the documents array with given newDocument.
 * @param newDocumet The new IDocument object to update.
 * @param docs The array of IDocument objects to search in.
 * @returns The updated array of IDocument objects.
 */
const updateDocument: (key: number, newDocument: IDocument, docs: IDocument[]) => IDocument[] = (
  key,
  newDocument,
  docs
) => {
  // Create a new array to store the updated documents
  const updatedDocuments: IDocument[] = [];
  docs.forEach((doc) => {
    // Create a new document to store the updated document
    let currentDoc = JSON.parse(JSON.stringify(doc));
    // Check if the current document is an IDocument with the specified key
    if (currentDoc.key === key) {
      currentDoc = { ...currentDoc, ...newDocument };
    }
    // Check if the current document is an IFolder
    if (currentDoc.type === 'FOLDER') {
      // If so, update the children of the folder recursively
      currentDoc.children = updateDocument(key, newDocument, currentDoc.children);
    }
    // Add the document to the updated array
    updatedDocuments.push(currentDoc);
  });
  // Return the updated array
  return updatedDocuments;
};

export default updateDocument;
