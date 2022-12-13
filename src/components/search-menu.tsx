import React, { type FunctionComponent, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { useDocumentsStore } from '../stores';
import { type IFile } from '../types';
import { searchFiles } from '../utils';
import TreeView from './tree-view';

interface SearchMenuProps {}

const SearchMenu: FunctionComponent<SearchMenuProps> = () => {
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
    const foundFiles = searchFiles(e.target.value, documents);

    const groupedArray = foundFiles.reduce((acc, curr) => {
      const { title } = curr.file;
      if (!acc[title]) {
        acc[title] = [];
      }
      acc[title]?.push(curr);
      return acc;
    }, {} as { [key: string]: typeof foundFiles });

    setFoundGroupedArray(groupedArray);
  };

  return (
    <div className="flex w-full flex-col gap-4 py-2 px-4 font-segoeui md:min-w-[300px] md:max-w-[300px]">
      {/* Topbar */}
      <div className="flex flex-col gap-4">
        {/* Text */}
        <p className="select-none font-segoeui text-base font-normal text-slate-100">SEARCH</p>
        {/* bg-gradient-to-br from-slate-400/40 to-slate-400/0 */}
        <input
          className="rounded border border-slate-400 bg-transparent px-2 py-1 text-slate-100 focus-visible:outline-none"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
      </div>
      {/* Documents */}
      <div className="overflow-hidden">
        <SimpleBar className="h-full w-full">
          <div className="flex flex-col gap-4">
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
