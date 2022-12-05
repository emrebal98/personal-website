import { type IDocument } from '../types';
import searchByKey from './searchByKey';

/**
 * Recursively searches for the parent objects of a given IDocument object with a given key.
 * @param key The key of the IDocument object to search for.
 * @param docs The array of IDocument objects to search in.
 * @param resultArr The array of parent objects found so far. This should not be provided by the caller, it is used for recursion.
 * @returns An array of IDocument objects representing the parents of the IDocument object with the given key, starting from the immediate parent and ending with the root object. If no object with the given key is found, an empty array is returned.
 */
const findParents: (
  key: number,
  docs: IDocument[],
  resultArr?: IDocument[]
) => IDocument[] = (key, docs, resultArr = []) => {
  // Search for the IDocument object with the given key
  const doc = searchByKey(key, docs);
  // If no object is found, return the result array
  if (!doc) return resultArr;
  // If the object has no parent (i.e. it is the root object), return the result array with the object appended
  if (doc.parent === -1) return [...resultArr, doc];
  // Otherwise, recursively search for the parent object, appending the current object to the result array
  return findParents(doc.parent, docs, [...resultArr, doc]);
};

export default findParents;
