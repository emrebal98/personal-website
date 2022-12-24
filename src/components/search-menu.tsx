import React, { type FunctionComponent, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { useDocumentsStore } from '../stores';
import { type IFile } from '../types';
import { searchFiles } from '../utils';
import TreeView from './tree-view';

const SearchMenu: FunctionComponent = () => {
  // All documents
  const documents = useDocumentsStore((state) => state.documents);
  const [search, setSearch] = useState<string>('');

  const [foundGroupedArray, setFoundGroupedArray] = useState<{
    [key: string]: {
      file: IFile;
      lineNumber: number;
      lineText: { before: string; word: string; after: string };
    }[];
  }>();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    // If search is empty
    if (!e.target.value) return setFoundGroupedArray(undefined);
    // Search files
    const foundFiles = searchFiles(e.target.value, documents);
    // Group files
    const groupedArray = foundFiles.reduce((acc, curr) => {
      const { title } = curr.file;
      if (!acc[title]) {
        acc[title] = [];
      }
      acc[title]?.push(curr);
      return acc;
    }, {} as { [key: string]: typeof foundFiles });
    // Set found grouped array
    return setFoundGroupedArray(groupedArray);
  };

  return (
    <div className="flex w-full flex-col gap-4 py-2 px-4 font-segoeui md:min-w-[300px] md:max-w-[300px]">
      {/* Topbar */}
      <div className="flex flex-col gap-4">
        {/* Text */}
        <p className="select-none font-segoeui text-base font-normal text-slate-900 dark:text-slate-100">
          SEARCH
        </p>
        <input
          className="rounded border border-slate-600 bg-transparent px-2 py-1 text-slate-900 placeholder:text-slate-600 focus-visible:outline-none dark:border-slate-400 dark:text-slate-100 dark:placeholder:text-slate-400"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
      </div>
      {/* Documents */}
      <div className="h-full overflow-hidden">
        <SimpleBar className="h-full w-full">
          <div className="flex flex-col gap-2">
            {foundGroupedArray &&
              Object.keys(foundGroupedArray).map((key) => (
                <TreeView key={key} title={key} childs={foundGroupedArray[key]} />
              ))}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default SearchMenu;
