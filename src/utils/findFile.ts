import { type IDocument } from '../types';
import searchByKey from './searchByKey';

const findFile = (key: number, docs: IDocument[]) => {
  const activeFile = searchByKey(key, docs);
  if (activeFile && activeFile.type === 'FILE') return activeFile;
  return null;
};

export default findFile;
