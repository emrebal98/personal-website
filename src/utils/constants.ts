import {
  Allianz,
  CSharp,
  CSS,
  Flutter,
  Git,
  Java,
  JavaScript,
  Jotform,
  MySQL,
  NextJS,
  NodeJS,
  Prisma,
  Python,
  ReactJS,
  Sass,
  SistemTeknik,
  StyledComponents,
  TailwindCSS,
  TRPC,
  TypeScript,
} from '../assets/icons';
import { type IDocument, type IExperience, type IRunComponent, type ISkill } from '../types';

export const contactExtensionKey = 999;

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
    isRunnable: true,
    children: [
      { key: 21, title: 'projects.tsx', type: 'FILE', parent: 2, content: '' },
      { key: 22, title: 'index.tsx', type: 'FILE', parent: 2, content: '' },
    ],
  },
  {
    key: 3,
    title: 'Experiences',
    type: 'FOLDER',
    parent: -1,
    isRunnable: true,
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
    isRunnable: true,
    children: [
      // {
      //   key: 40,
      //   title: 'folderin',
      //   type: 'FOLDER',
      //   parent: 4,
      //   children: [
      //     { key: 441, title: 'asd.tsx', type: 'FILE', parent: 40, content: '' },
      //     { key: 442, title: 'zxc.tsx', type: 'FILE', parent: 40, content: '' },
      //   ],
      // },
      {
        key: 41,
        title: 'skills.tsx',
        type: 'FILE',
        parent: 4,
        content:
          "import React, { type FunctionComponent } from 'react';\nimport Skills from './skills';\n          \nconst skills = [\n  'TypeScript',\n  'JavaScript',\n  'React',\n  'Next.js',\n  'CSS',\n  'TailwindCSS',\n  'Sass',\n];\n      \nconst App: FunctionComponent = () => {\n  return <Skills skills={skills} />;\n  };\n          \nexport default App;",
      },
      { key: 42, title: 'index.tsx', type: 'FILE', parent: 4, content: '' },
    ],
  },
  {
    key: 5,
    title: 'asd.tsx',
    type: 'FILE',
    parent: -1,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In pellentesque massa placerat duis. Eget arcu dictum varius duis at. Nam at lectus urna duis convallis. Ut faucibus pulvinar elementum integer. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Pretium lectus quam id leo in vitae turpis. Volutpat consequat mauris nunc congue nisi vitae suscipit. Ultrices in iaculis nunc sed augue lacus. Sed euismod nisi porta lorem mollis. Bibendum neque egestas congue quisque egestas diam. At in tellus integer feugiat scelerisque varius morbi enim nunc. Lectus arcu bibendum at varius vel pharetra vel turpis nunc. Cras semper auctor neque vitae tempus quam pellentesque. Interdum varius sit amet mattis vulputate enim nulla aliquet. Tincidunt lobortis feugiat vivamus at augue. Nunc aliquet bibendum enim facilisis.

    Odio tempor orci dapibus ultrices in iaculis nunc sed augue. Eget arcu dictum varius duis at consectetur lorem. Euismod nisi porta lorem mollis aliquam ut porttitor. Dignissim diam quis enim lobortis scelerisque. Suscipit adipiscing bibendum est ultricies integer quis. Nunc id cursus metus aliquam eleifend mi in nulla posuere. In egestas erat imperdiet sed. Ac orci phasellus egestas tellus rutrum. Nec feugiat nisl pretium fusce id velit. In tellus integer feugiat scelerisque varius morbi enim nunc. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Mauris sit amet massa vitae tortor condimentum. Amet facilisis magna etiam tempor orci. Ipsum a arcu cursus vitae congue. Faucibus turpis in eu mi bibendum neque egestas. Augue interdum velit euismod in pellentesque massa placerat duis. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut. Turpis in eu mi bibendum neque.
    
    Sem nulla pharetra diam sit. Integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque. Vivamus arcu felis bibendum ut tristique et egestas. Etiam dignissim diam quis enim. In hac habitasse platea dictumst. Tortor aliquam nulla facilisi cras fermentum. Sodales neque sodales ut etiam sit amet. Sapien eget mi proin sed. Vitae nunc sed velit dignissim sodales ut eu. Aliquet nibh praesent tristique magna sit amet. Vitae congue eu consequat ac felis donec et. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget.
    
    Pharetra sit amet aliquam id. Laoreet id donec ultrices tincidunt arcu non sodales. Bibendum ut tristique et egestas quis ipsum suspendisse ultrices. Et egestas quis ipsum suspendisse ultrices. Orci ac auctor augue mauris augue neque gravida. Id interdum velit laoreet id donec ultrices tincidunt arcu non. Leo integer malesuada nunc vel risus commodo viverra maecenas. Libero id faucibus nisl tincidunt eget nullam non. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Eleifend mi in nulla posuere. Aliquam ultrices sagittis orci a scelerisque purus semper.
    
    Turpis nunc eget lorem dolor. Id porta nibh venenatis cras sed. Nulla malesuada pellentesque elit eget gravida. Praesent semper feugiat nibh sed pulvinar proin gravida. Morbi tempus iaculis urna id volutpat lacus. Iaculis urna id volutpat lacus laoreet non curabitur gravida. Quisque non tellus orci ac auctor augue mauris augue neque. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Sed viverra ipsum nunc aliquet. Ac tortor dignissim convallis aenean et tortor at. Ultricies tristique nulla aliquet enim tortor. Sapien et ligula ullamcorper malesuada proin libero nunc consequat. Nunc sed augue lacus viverra. Amet dictum sit amet justo. Ac orci phasellus egestas tellus rutrum tellus pellentesque. Vitae semper quis lectus nulla at volutpat diam ut venenatis. Amet justo donec enim diam vulputate ut pharetra sit.`,
  },
  {
    key: contactExtensionKey,
    title: 'Contact Page',
    type: 'FILE',
    parent: -1,
    content: '',
    isExtension: true,
  },
];

export const DOCUMENTS_ORDER = ['FOLDER', 'FILE'];

export const RUNCOMPONENT_ORDER: IRunComponent[] = ['Projects', 'Skills', 'Experiences'];

export const SKILLS: ISkill[] = [
  {
    id: 211,
    title: 'NextJS',
    icon: NextJS,
    className: 'text-black dark:text-white',
  },
  {
    id: 212,
    title: 'ReactJS',
    icon: ReactJS,
  },
  {
    id: 213,
    title: 'TypeScript',
    icon: TypeScript,
  },
  {
    id: 214,
    title: 'JavaScript',
    icon: JavaScript,
  },
  {
    id: 215,
    title: 'TailwindCSS',
    icon: TailwindCSS,
    className: 'text-black dark:text-white',
  },
  {
    id: 216,
    title: 'CSS',
    icon: CSS,
  },
  {
    id: 217,
    title: 'Sass',
    icon: Sass,
  },
  {
    id: 218,
    title: 'styled-components',
    icon: StyledComponents,
    isStaticImage: true,
  },
  {
    id: 219,
    title: 'NodeJS',
    icon: NodeJS,
  },
  {
    id: 220,
    title: 'Prisma',
    icon: Prisma,
    className: 'text-black dark:text-white',
  },
  {
    id: 221,
    title: 'tRPC',
    icon: TRPC,
  },
  {
    id: 222,
    title: 'Git',
    icon: Git,
  },
  {
    id: 223,
    title: 'MySQL',
    icon: MySQL,
  },
  {
    id: 224,
    title: 'Flutter',
    icon: Flutter,
  },
  {
    id: 225,
    title: 'C#',
    icon: CSharp,
  },
  {
    id: 226,
    title: 'Java',
    icon: Java,
  },
  {
    id: 227,
    title: 'Python',
    icon: Python,
  },
];

export const EXPERIENCES: IExperience[] = [
  {
    id: 311,
    companyName: 'Jotform',
    companyLogo: Jotform,
    jobs: [
      {
        id: 3111,
        jobTitle: 'UI Developer',
        jobType: 'Internship',
        startDate: new Date('2022-08-01'),
        endDate: new Date('2022-09-01'),
      },
    ],
    location: 'Istanbul, Turkey',
    skills: ['ReactJS', 'JavaScript', 'styled-components', 'CSS', 'Git'],
  },
  {
    id: 312,
    companyName: 'Allianz Partners',
    companyLogo: Allianz,
    jobs: [
      {
        id: 3121,
        jobTitle: 'Workplace Service Specialist',
        jobType: 'Contract',
        startDate: new Date('2021-09-01'),
        endDate: new Date('2021-10-01'),
      },
      {
        id: 3122,
        jobTitle: 'Intern',
        jobType: 'Internship',
        startDate: new Date('2021-08-01'),
        endDate: new Date('2021-08-01'),
      },
    ],
    location: 'Istanbul, Turkey',
  },
  {
    id: 313,
    companyName: 'Sistem Teknik Industrial Furnaces',
    companyLogo: SistemTeknik,
    jobs: [
      {
        id: 3131,
        jobTitle: 'Software Intern',
        jobType: 'Seasonal',
        startDate: new Date('2018-07-01'),
        endDate: new Date('2018-09-01'),
      },
    ],
    location: 'Kocaeli, Turkey',
    skills: ['C#', 'SQL', 'WinForms'],
  },
];
