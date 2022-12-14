interface IDocumentBase {
  key: number;
  title: string;
  parent: number;
}

interface IFolder extends IDocumentBase {
  type: 'FOLDER';
  children: IDocument[];
  isRunnable?: boolean;
}

export interface IFile extends IDocumentBase {
  type: 'FILE';
  content: string;
  isExtension?: boolean;
}

export type IDocument = IFolder | IFile;
