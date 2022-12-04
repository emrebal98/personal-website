import {
  ArrowDownOnSquareStackIcon,
  ArrowPathIcon,
  CodeBracketIcon,
  Cog8ToothIcon,
  DocumentDuplicateIcon,
  DocumentPlusIcon,
  FolderIcon,
  FolderPlusIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  SquaresPlusIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline/';
import { type NextPage } from 'next';
import Head from 'next/head';
import { Fragment, useState } from 'react';
import { Document } from '../components';
import { clg } from '../utils';

type IDocument =
  | {
      key: number;
      title: string;
      type: 'FOLDER';
      parent: number;
      children?: IDocument[];
    }
  | { key: number; title: string; type: 'FILE'; parent: number };

const DOCUMENTS_CONS: IDocument[] = [
  {
    key: 1,
    title: 'Home',
    type: 'FOLDER',
    parent: -1,
    children: [
      { key: 11, title: 'home.tsx', type: 'FILE', parent: 1 },
      { key: 12, title: 'index.tsx', type: 'FILE', parent: 1 },
    ],
  },
  {
    key: 2,
    title: 'Projects',
    type: 'FOLDER',
    parent: -1,
    children: [
      { key: 21, title: 'projects.tsx', type: 'FILE', parent: 2 },
      { key: 22, title: 'index.tsx', type: 'FILE', parent: 2 },
    ],
  },
  {
    key: 3,
    title: 'Experience',
    type: 'FOLDER',
    parent: -1,
    children: [
      { key: 31, title: 'experiences.tsx', type: 'FILE', parent: 3 },
      { key: 32, title: 'index.tsx', type: 'FILE', parent: 3 },
    ],
  },
  {
    key: 4,
    title: 'Skills',
    type: 'FOLDER',
    parent: -1,
    children: [
      {
        key: 40,
        title: 'folderin',
        type: 'FOLDER',
        parent: 4,
        children: [
          { key: 441, title: 'asd.tsx', type: 'FILE', parent: 40 },
          { key: 442, title: 'zxc.tsx', type: 'FILE', parent: 40 },
        ],
      },
      { key: 41, title: 'skills.tsx', type: 'FILE', parent: 4 },
      { key: 42, title: 'index.tsx', type: 'FILE', parent: 4 },
    ],
  },
  {
    key: 5,
    title: 'asd.tsx',
    type: 'FILE',
    parent: -1,
  },
];

const Home: NextPage = () => {
  const [documents, setDocuments] = useState<IDocument[]>(DOCUMENTS_CONS);
  const [activeFolders, setActiveFolders] = useState<number[]>([1]);
  const [activeFile, setActiveFile] = useState<number>(12);
  const [folderHasActiveFile, setFolderHasActiveFile] = useState<number>(-1);

  const searchByKey: (key: number, arr?: IDocument[]) => IDocument | null = (
    key,
    arr = DOCUMENTS_CONS
  ) => {
    // TODO: Make it good
    // eslint-disable-next-line no-restricted-syntax
    for (const node of arr) {
      if (node.key === key) return node;
      if (node.type === 'FOLDER' && node.children) {
        const child = searchByKey(key, node.children);
        if (child) return child;
      }
    }
    return null;
  };

  const findParents: (key: number, arr?: IDocument[]) => IDocument[] = (
    key,
    arr = []
  ) => {
    const doc = searchByKey(key);
    if (!doc) return arr;
    if (doc.parent === -1) return [...arr, doc];
    return findParents(doc.parent, [...arr, doc]);
  };

  const isActiveFolder = (key: number) => {
    if (key === -1) return false;
    // Check every parent of the active file
    const parents = findParents(key).filter((f) => f.type === 'FOLDER');
    return parents.every((k) => activeFolders.includes(k.key));
  };
  const isActiveFile = (key: number) => activeFile === key;
  const isFolderHasActiveFile = (key: number) => folderHasActiveFile === key;

  const handleFolderClick = (doc: IDocument) => {
    // Open folder
    if (activeFolders.findIndex((f) => f === doc.key) === -1) {
      // If folder has active file remove the active folder from the folderHasActiveFile
      if (isFolderHasActiveFile(doc.key)) {
        const parents = findParents(activeFile).filter(
          (f) => f.type === 'FOLDER'
        );
        const notInActiveFolderButHasActiveChild = parents.find(
          (f) => !activeFolders.includes(f.key) && f.key !== doc.key
        );
        if (notInActiveFolderButHasActiveChild)
          setFolderHasActiveFile(notInActiveFolderButHasActiveChild.key);
        else setFolderHasActiveFile(-1);
      }
      setActiveFolders((prev) => [...prev, doc.key]);
    }
    // Close folder
    else {
      // Check closed folder has active file
      const parents = findParents(activeFile).filter(
        (f) => f.type === 'FOLDER'
      );
      const result = parents.findIndex((f) => f.key === doc.key) !== -1;
      if (result) setFolderHasActiveFile(doc.key);
      // Remove folder from active folders list
      setActiveFolders((prev) => prev.filter((f) => f !== doc.key));
    }
  };

  const handleFileClick = (doc: IDocument) => {
    if (activeFile !== doc.key) {
      // Clear folderHasActiveFile
      setFolderHasActiveFile(-1);
      // Set active file
      setActiveFile(doc.key);
    }
  };

  const handleCollapseFolders = () => {
    // Check folderHasActiveFile for all top parent folders
    const parents = findParents(activeFile).filter((f) => f.type === 'FOLDER');
    const result = parents.findIndex((f) => f.parent === -1) !== -1;
    if (result)
      setFolderHasActiveFile((parents[parents.length - 1] as IDocument).key);
    // Clear active folders
    setActiveFolders([]);
  };

  const handleFileAdd = () => {
    const newFile: IDocument = {
      key: Math.floor(Math.random() * 1000),
      title: 'newFile.tsx',
      type: 'FILE',
      parent: activeFolders[activeFolders.length - 1] ?? -1,
    };

    // If not top most folder
    if (newFile.parent !== -1) {
      const parent = searchByKey(newFile.parent);
      if (parent && parent.type === 'FOLDER') {
        parent.children?.push(newFile);
        setDocuments([...documents, newFile]);
      }
    }
    // If top most folder
    else {
      const newDocuments = [...documents, newFile];
      setDocuments(newDocuments);
    }
  };

  // TODO: understand why it doesn't work
  // https://codesandbox.io/s/hungry-pine-k7g0y9?file=/src/document.js:166-187
  const handleResetDocuments = () => {
    if (documents !== DOCUMENTS_CONS) setDocuments(DOCUMENTS_CONS);
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"> */}
      <main className="relative min-h-screen overflow-hidden bg-slate-900 p-16">
        {/* Window */}
        <div className="relative flex min-h-[900px] rounded-2xl bg-gradient-to-br from-slate-400/40 to-slate-400/0 p-4">
          {/* Icon Indicator Line */}
          <div className="absolute top-[40px] -left-4 h-[1px] w-8 rotate-90 bg-cyan-300 blur-[1px]" />
          {/* Left Icon Bar */}
          <div className="flex flex-col justify-between gap-8 p-2">
            {/* Body */}
            <div className="flex flex-col gap-8">
              <DocumentDuplicateIcon className="h-8 w-8 text-slate-100" />
              <MagnifyingGlassIcon className="h-8 w-8 text-slate-400" />
              <SquaresPlusIcon className="h-8 w-8 text-slate-400" />
              <PlayIcon className="h-8 w-8 text-slate-400" />
            </div>
            {/* Bottom */}
            <div className="flex flex-col gap-4">
              <UserCircleIcon className="h-8 w-8 text-slate-400" />
              <Cog8ToothIcon className="h-8 w-8 text-slate-400" />
            </div>
          </div>
          {/* Left Menu Bar */}
          <div className="flex flex-col gap-4 py-2 px-4">
            {/* Topbar */}
            <div className="flex gap-16">
              {/* Text */}
              <p className="select-none font-segoeui text-base font-normal text-slate-100">
                EXPLORER
              </p>
              {/* Buttons */}
              <div className="flex gap-2">
                <DocumentPlusIcon
                  className="h-6 w-6 cursor-pointer text-slate-400"
                  onClick={handleFileAdd}
                />
                <FolderPlusIcon className="h-6 w-6 cursor-pointer text-slate-400" />
                <ArrowPathIcon
                  className="h-6 w-6 cursor-pointer text-slate-400"
                  onClick={handleResetDocuments}
                />
                <ArrowDownOnSquareStackIcon
                  className="h-6 w-6 cursor-pointer text-slate-400"
                  onClick={handleCollapseFolders}
                />
              </div>
            </div>
            {/* Folders */}
            {documents.map((doc) => (
              <Document
                key={doc.key}
                document={doc}
                isActiveFile={isActiveFile}
                isActiveFolder={isActiveFolder}
                isFolderHasActiveFile={isFolderHasActiveFile}
                onFolderClick={handleFolderClick}
                onFileClick={handleFileClick}
              />
            ))}
          </div>
        </div>
        {/* Circles */}
        <div className="absolute left-[1066px] top-[315px] h-[100px] w-[100px] rounded-full bg-cyan-300 mix-blend-screen blur-3xl" />
        <div className="absolute left-[395px] top-[741px] h-[100px] w-[100px] rounded-full bg-cyan-300 mix-blend-screen blur-3xl" />
      </main>
    </>
  );
};

export default Home;
