import { type IDocument, type IFile } from '../types';

/**
 * Finds the given word in a string and returns the three substrings before and after the word.
 *
 * @param {string} word The word to find in the string
 * @param {string} s The string to search in
 * @returns {object} An object containing the three substrings before, word, and after the found word, or null if the word was not found
 */
function findWord(word: string, s: string) {
  // Find the index of the word in the string
  const index = s.indexOf(word);

  // Check if the word was found in the string
  if (index === -1) {
    // Return null if the word was not found
    return null;
  }

  // Return the three strings before and after the found word
  return {
    before: s.substring(0, index),
    word: s.substring(index, index + word.length),
    after: s.substring(index + word.length),
  };
}

/**
 * Searches the given array of documents for files that contain the given word.
 *
 * @param word The word to search for
 * @param documents The array of documents to search
 * @returns An array of objects with the following properties:
 *          - file: the IFile object that contains the search word
 *          - lineNumber: the line number where the word appears in the file
 *          - lineText: the text of the line where the word appears in the file
 */
function searchFiles(word: string, documents: IDocument[]) {
  // initialize an empty array to store the found files
  const foundFiles: {
    file: IFile;
    lineNumber: number;
    lineText: { before: string; word: string; after: string };
  }[] = [];

  // iterate over the documents array using the forEach method
  documents.forEach((document) => {
    // check if the current document is a file
    if (document.type === 'FILE') {
      // check if its content contains the search word
      if (document.content && document.content.toLowerCase().includes(word.toLocaleLowerCase())) {
        const splitContent = document.content.split('\n');
        // iterate over the lines of the file's content
        splitContent.forEach((line, index) => {
          // check if the current line contains the search word
          const find = findWord(word.toLowerCase(), line.toLowerCase());
          if (find !== null) {
            // if the content contains the word, add the file to the foundFiles array
            foundFiles.push({ file: document, lineNumber: index + 1, lineText: find });
          }
        });
      }
    } else {
      // if the document is not a file, it is a folder, so search its children recursively
      // add the found files to the foundFiles array
      foundFiles.push(...searchFiles(word, document.children));
    }
  });

  // return the array of found files
  return foundFiles;
}

export default searchFiles;
