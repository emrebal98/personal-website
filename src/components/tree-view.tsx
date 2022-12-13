import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline/';
import React, { type FunctionComponent, useState } from 'react';
import { useDocumentsStore } from '../stores';
import { type IFile } from '../types';

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
  const setActiveFile = useDocumentsStore((state) => state.setActiveFile);
  // Active tabs
  const addActiveTab = useDocumentsStore((state) => state.addActiveTab);
  // Active line number
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
    // Set active file
    setActiveFile(child.file.key);
    addActiveTab(child.file.key);

    setTimeout(() => {
      //   const preCodeEditor = document.getElementsByClassName('pre-code-editor');
      //   const spans = preCodeEditor[0]?.getElementsByTagName('span');
      //   if (spans) {
      //     for (let i = 0; i < spans.length; i += 1) {
      //       const element = spans[i];
      //       if (element?.textContent?.includes(child.lineText.word)) {
      //         console.log(element);
      //       }
      //     }
      //   }

      const line = document.getElementById(`line-${child.lineNumber}`);
      //   line?.setAttribute('style', 'color: RED');
      setActiveLineNumber(child.lineNumber);
      line?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 0);

    // console.log(child);
    // console.log(line);
  };

  return (
    <div className="flex select-none flex-col gap-2">
      <button
        className="flex items-center gap-2 text-slate-400 hover:text-slate-100"
        type="button"
        onClick={() => setExpand((prev) => !prev)}
      >
        {expand ? (
          <ChevronDownIcon className="h-4 w-4 cursor-pointer" />
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
              className="w-full text-left text-slate-400 hover:text-slate-100"
              type="button"
              onClick={() => handleChildClick(item)}
            >
              <p className="overflow-hidden text-ellipsis whitespace-nowrap break-keep">
                {item.lineText.before.slice(
                  item.lineText.before.length - 10 < 0 ? 0 : item.lineText.before.length - 10,
                  item.lineText.before.length
                )}
                <span className="rounded bg-gradient-to-br from-slate-400/40 to-slate-400/0 text-slate-100">
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
