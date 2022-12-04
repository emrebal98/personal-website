import { CodeBracketIcon, FolderIcon } from '@heroicons/react/24/outline';
import React from 'react';
import type { FunctionComponent } from 'react';
import { clg } from '../utils';

// TODO: move somewhere else
type IDocument =
  | {
      key: number;
      title: string;
      type: 'FOLDER';
      parent: number;
      children?: IDocument[];
    }
  | { key: number; title: string; type: 'FILE'; parent: number };

interface DocumentProps {
  document: IDocument;
  indent?: number;
  isActiveFolder: (key: number) => boolean;
  isActiveFile: (key: number) => boolean;
  isFolderHasActiveFile: (key: number) => boolean;
  onFolderClick?: (doc: IDocument) => void;
  onFileClick?: (doc: IDocument) => void;
}

const Document: FunctionComponent<DocumentProps> = ({
  document,
  indent = 0,
  isActiveFile,
  isActiveFolder,
  isFolderHasActiveFile,
  onFolderClick,
  onFileClick,
}) => {
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
                hidden: !(
                  isActiveFolder(document.parent) || document.parent === -1
                ),
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
                    !isActiveFolder(document.key) &&
                    !isFolderHasActiveFile(document.key),
                },
                { 'text-cyan-300': isFolderHasActiveFile(document.key) }
              )}
            >
              {document.title}
            </span>
          </button>
          {document.children &&
            document.children.map((child) => (
              <Document
                key={child.key}
                document={child}
                indent={indent + 1}
                isActiveFile={isActiveFile}
                isActiveFolder={isActiveFolder}
                isFolderHasActiveFile={isFolderHasActiveFile}
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
              hidden: !(
                isActiveFolder(document.parent) || document.parent === -1
              ),
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
