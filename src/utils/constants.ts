import type { IDocument } from '../types';

export const DOCUMENTS: IDocument[] = [
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

export const DOCUMENTS_ORDER = ['FOLDER', 'FILE'];
