import { type IDocument } from '../types';

const updateFileContent: (key: number, newContent: string, docs: IDocument[]) => IDocument[] = (
  key,
  newContent,
  docs
) => {
  // Create a new array to store the updated documents
  const updatedDocuments: IDocument[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const doc of docs) {
    // Check if the current document is an IFile with the specified key
    if (doc.type === 'FILE' && doc.key === key) {
      // If so, update the content of the file
      doc.content = newContent;
    }

    // Check if the current document is an IFolder
    if (doc.type === 'FOLDER') {
      // If so, update the children of the folder recursively
      doc.children = updateFileContent(key, newContent, doc.children);
    }
    // Add the document to the updated array
    updatedDocuments.push(doc);
  }
  // Return the updated array
  return updatedDocuments;
};

export default updateFileContent;
