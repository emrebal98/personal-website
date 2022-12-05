import { type IDocument } from '../types';

/**
 * Searches for an object with a given key in an array of IDocument objects.
 * @param key The key to search for.
 * @param docs The array of IDocument objects to search in.
 * @returns The IDocument object with the given key, or null if no match is found.
 */
const searchByKey: (key: number, docs: IDocument[]) => IDocument | null = (
  key,
  docs
) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const node of docs) {
    // If the current item has a "key" property that matches the search key, return the item
    if (node.key === key) return node;
    // If the current item is a folder and has children, search for the key in its children
    if (node.type === 'FOLDER' && node.children) {
      const child = searchByKey(key, node.children);
      // If a child matching the key is found, return it
      if (child) return child;
    }
  }
  // If no match is found, return null
  return null;
};
export default searchByKey;
