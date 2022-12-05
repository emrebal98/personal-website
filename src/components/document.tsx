import { CodeBracketIcon, FolderIcon } from '@heroicons/react/24/outline';
import React, { type FunctionComponent } from 'react';
import { useDocumentsStore } from '../stores';
import { type IDocument } from '../types';
import { clg, DOCUMENTS_ORDER, findIfAnyChildIsActive, findParents } from '../utils';

interface DocumentProps {
  document: IDocument;
  indent?: number;
  onFolderClick?: (doc: IDocument) => void;
  onFileClick?: (doc: IDocument) => void;
}

const Document: FunctionComponent<DocumentProps> = ({
  document,
  indent = 0,
  onFolderClick,
  onFileClick,
}) => {
  // All documents
  const documents = useDocumentsStore((state) => state.documents);
  // Active folders
  const activeFolders = useDocumentsStore((state) => state.activeFolders);
  // Active file
  const activeFile = useDocumentsStore((state) => state.activeFile);
  const isActiveFile = (key: number) => activeFile === key;

  const isActiveFolder = (key: number) => {
    if (key === -1) return false;
    // Find the parents of the given key that are folders
    const parents = findParents(key, documents).filter((f) => f.type === 'FOLDER');
    // Return `true` if every parent is included in the activeFolders list, otherwise `false`
    return parents.every((k) => activeFolders.includes(k.key));
  };
  const isFolderHasActiveFile = (key: number) =>
    activeFolders.includes(key) ? false : findIfAnyChildIsActive(key, activeFile, documents);

  const handleFolderClick = (doc: IDocument) => {
    if (!onFolderClick) return;
    onFolderClick(doc);
  };

  const handleFileClick = (doc: IDocument) => {
    if (!onFileClick) return;
    onFileClick(doc);
  };

  return (
    <>
      {/* FOLDER */}
      {document.type === 'FOLDER' ? (
        <>
          <button
            className={clg(
              'cursor-pointer items-center gap-2',
              {
                flex: isActiveFolder(document.parent) || document.parent === -1,
              },
              {
                hidden: !(isActiveFolder(document.parent) || document.parent === -1),
              }
            )}
            style={{ paddingLeft: `${indent * 8}px` }}
            onClick={() => handleFolderClick(document)}
            type="button"
          >
            <FolderIcon
              className={clg(
                'h-6 w-6',
                { 'text-slate-100': isActiveFolder(document.key) },
                { 'text-slate-400': !isActiveFolder(document.key) }
              )}
            />

            <span
              className={clg(
                'select-none font-segoeui text-base font-normal',
                { 'text-slate-100': isActiveFolder(document.key) },
                {
                  'text-slate-400':
                    !isActiveFolder(document.key) && !isFolderHasActiveFile(document.key),
                },
                { 'text-cyan-300': isFolderHasActiveFile(document.key) }
              )}
            >
              {document.title}
            </span>
          </button>
          {document.children.length > 0 &&
            document.children
              .sort((a, b) => DOCUMENTS_ORDER.indexOf(a.type) - DOCUMENTS_ORDER.indexOf(b.type))
              .map((child) => (
                <Document
                  key={child.key}
                  document={child}
                  indent={indent + 1}
                  onFolderClick={handleFolderClick}
                  onFileClick={handleFileClick}
                />
              ))}
        </>
      ) : (
        //   FILE
        <button
          className={clg(
            'cursor-pointer items-center gap-2',
            {
              flex: isActiveFolder(document.parent) || document.parent === -1,
            },
            {
              hidden: !(isActiveFolder(document.parent) || document.parent === -1),
            }
          )}
          style={{ paddingLeft: `${indent * 8}px` }}
          onClick={() => handleFileClick(document)}
          type="button"
        >
          <CodeBracketIcon
            className={clg(
              'h-6 w-6',
              { 'text-cyan-300': isActiveFile(document.key) },
              { 'text-slate-400': !isActiveFile(document.key) }
            )}
          />
          <span
            className={clg(
              'select-none font-segoeui text-base font-normal',
              { 'text-cyan-300': isActiveFile(document.key) },
              { 'text-slate-400': !isActiveFile(document.key) }
            )}
          >
            {document.title}
          </span>
        </button>
      )}
    </>
  );
};

Document.defaultProps = {
  indent: undefined,
  onFolderClick: undefined,
  onFileClick: undefined,
} as Partial<DocumentProps>;

export default Document;
