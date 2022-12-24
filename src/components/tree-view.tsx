import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline/';
import React, { type FunctionComponent, useState } from 'react';
import { useDocumentsStore } from '../stores';
import { type IFile } from '../types';
import { clg } from '../utils';

interface TreeViewProps {
  title: string;
  childs?: {
    file: IFile;
    lineNumber: number;
    lineText: {
      before: string;
      word: string;
      after: string;
    };
  }[];
}

const TreeView: FunctionComponent<TreeViewProps> = ({ title, childs }) => {
  const [expand, setExpand] = useState<boolean>(true);
  // Active file
  const activeFile = useDocumentsStore((state) => state.activeFile);
  const setActiveFile = useDocumentsStore((state) => state.setActiveFile);
  // Active tabs
  const addActiveTab = useDocumentsStore((state) => state.addActiveTab);
  // Active line number
  const activeLineNumber = useDocumentsStore((state) => state.activeLineNumber);
  const setActiveLineNumber = useDocumentsStore((state) => state.setActiveLineNumber);

  const handleChildClick = (child: {
    file: IFile;
    lineNumber: number;
    lineText: {
      before: string;
      word: string;
      after: string;
    };
  }) => {
    if (activeFile !== child.file.key) {
      // Set active file
      setActiveFile(child.file.key);
      addActiveTab(child.file.key);
    }
    // Set active line number
    setActiveLineNumber(child.lineNumber);
  };

  // Check if the search is active
  const isActiveSearch = (lineNumber: number, fileKey: number) =>
    activeLineNumber === lineNumber && activeFile === fileKey;

  return (
    <div className="flex select-none flex-col gap-2">
      <button
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        type="button"
        onClick={() => setExpand((prev) => !prev)}
      >
        {expand ? (
          <ChevronDownIcon className="h-4 w-4 cursor-pointer text-slate-900 dark:text-slate-100" />
        ) : (
          <ChevronRightIcon className="h-4 w-4 cursor-pointer" />
        )}
        <p className="">{title}</p>
      </button>
      <div className="flex flex-col pl-4">
        {expand &&
          childs?.map((item) => (
            <button
              id="child-item"
              key={item.file.key + item.lineNumber}
              className={clg(
                'w-full text-left ',
                {
                  'text-cyan-700 dark:text-cyan-300': isActiveSearch(
                    item.lineNumber,
                    item.file.key
                  ),
                },
                {
                  'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100':
                    !isActiveSearch(item.lineNumber, item.file.key),
                }
              )}
              type="button"
              onClick={() => handleChildClick(item)}
            >
              <p className="overflow-hidden text-ellipsis whitespace-nowrap break-keep">
                {item.lineText.before.slice(
                  item.lineText.before.length - 10 < 0 ? 0 : item.lineText.before.length - 10,
                  item.lineText.before.length
                )}
                <span
                  className={clg(
                    'rounded bg-gradient-to-br text-slate-900 dark:text-slate-100',
                    {
                      'from-cyan-700/40 to-cyan-700/0 dark:from-cyan-300/40 dark:to-cyan-300/0':
                        isActiveSearch(item.lineNumber, item.file.key),
                    },
                    {
                      'from-slate-600/40 to-slate-600/0 dark:from-slate-400/40 dark:to-slate-400/0':
                        !isActiveSearch(item.lineNumber, item.file.key),
                    }
                  )}
                >
                  {item.lineText.word}
                </span>
                {item.lineText.after.slice(0, 80)}
              </p>
            </button>
          ))}
      </div>
    </div>
  );
};

TreeView.defaultProps = {
  childs: undefined,
};

export default TreeView;
