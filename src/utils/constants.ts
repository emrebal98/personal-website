import type { IDocument } from '../types';

export const DOCUMENTS: IDocument[] = [
  {
    key: 1,
    title: 'Home',
    type: 'FOLDER',
    parent: -1,
    children: [
      {
        key: 11,
        title: 'home.tsx',
        type: 'FILE',
        parent: 1,
        content: `import React from 'react';\n\nconst Home = () => {\n  return <div>Home</div>;\n};\n\nexport default Home;\n`,
      },
      {
        key: 12,
        title: 'index.tsx',
        type: 'FILE',
        parent: 1,
        content: "import Home from './home';\n\nexport default Home;\n",
      },
    ],
  },
  {
    key: 2,
    title: 'Projects',
    type: 'FOLDER',
    parent: -1,
    children: [
      { key: 21, title: 'projects.tsx', type: 'FILE', parent: 2, content: '' },
      { key: 22, title: 'index.tsx', type: 'FILE', parent: 2, content: '' },
    ],
  },
  {
    key: 3,
    title: 'Experience',
    type: 'FOLDER',
    parent: -1,
    children: [
      { key: 31, title: 'experiences.tsx', type: 'FILE', parent: 3, content: '' },
      { key: 32, title: 'index.tsx', type: 'FILE', parent: 3, content: '' },
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
          { key: 441, title: 'asd.tsx', type: 'FILE', parent: 40, content: '' },
          { key: 442, title: 'zxc.tsx', type: 'FILE', parent: 40, content: '' },
        ],
      },
      {
        key: 41,
        title: 'skills.tsx',
        type: 'FILE',
        parent: 4,
        content: `import React, { type FunctionComponent } from 'react';
      import Skills from './skills';
          
      const skills = [
        'TypeScript',
        'JavaScript',
        'React',
        'Next.js',
        'CSS',
        'TailwindCSS',
        'Sass',
      ];
      
      const App: FunctionComponent = () => {
        return <Skills skills={skills} />;
      };
          
      export default App;`,
      },
      { key: 42, title: 'index.tsx', type: 'FILE', parent: 4, content: '' },
    ],
  },
  {
    key: 5,
    title: 'asd.tsx',
    type: 'FILE',
    parent: -1,
    content: '',
  },
];

export const DOCUMENTS_ORDER = ['FOLDER', 'FILE'];
