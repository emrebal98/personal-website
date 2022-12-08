interface IDocumentBase {
  key: number;
  title: string;
  parent: number;
}

interface IFolder extends IDocumentBase {
  type: 'FOLDER';
  children: IDocument[];
}

interface IFile extends IDocumentBase {
  type: 'FILE';
  content?: string;
}

export type IDocument = IFolder | IFile;