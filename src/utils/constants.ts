/* eslint-disable no-template-curly-in-string */
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
      {
        key: 31,
        title: 'experiences.tsx',
        type: 'FILE',
        parent: 3,
        content:
          'import Image from \'next/image\';\nimport { type FunctionComponent } from \'react\';\nimport { calculateMonths, EXPERIENCES, getDateString } from \'../utils\';\n\nconst Experiences: FunctionComponent = () => (\n  <div className="container mx-auto flex flex-col items-center gap-8 py-4">\n    {EXPERIENCES.map((experience) => (\n      <div\n        key={experience.id}\n        className="flex w-full flex-col items-center gap-4 rounded bg-gradient-to-br from-slate-400/40 to-slate-400/0 px-4 py-8 font-segoeui text-slate-100 md:flex-row md:items-start"\n      >\n        {/* Logo */}\n        <Image src={experience.companyLogo} alt={experience.companyName} width={80} height={80} />\n        {experience.jobs.length === 1 && experience.jobs[0] ? (\n          // If there is only one job, show the job title, company name, job type, start date, end date, location, and skills.\n          <div className="flex flex-col gap-2">\n            <h3 className="font-bold">{experience.jobs[0].jobTitle}</h3>\n            <p className="text-sm">{`${experience.companyName} • ${experience.jobs[0].jobType}`}</p>\n            <p className="text-sm text-slate-300">\n              {getDateString(experience.jobs[0].startDate, experience.jobs[0].endDate)}\n            </p>\n            <p className="text-sm text-slate-200">{experience.location}</p>\n            <p className="text-sm">\n              <span className="font-bold">Skills: </span>\n              {experience.skills?.join(\' • \')}\n            </p>\n          </div>\n        ) : (\n          // If there are more than one job, show the company name, total months, location, and jobs.\n          <div className="flex flex-col gap-4">\n            <div className="flex flex-col gap-2">\n              <h3 className="font-bold">{experience.companyName}</h3>\n              <p className="text-sm">\n                {`${\n                  calculateMonths(\n                    experience.jobs[experience.jobs.length - 1]?.startDate as Date,\n                    experience.jobs[0]?.endDate as Date\n                  ) + 1\n                } months`}\n              </p>\n              <p className="text-sm text-slate-300">{experience.location}</p>\n            </div>\n            {experience.jobs.map((job) => (\n              <div key={job.id} className="relative flex flex-col gap-2">\n                <h4 className="font-bold">{job.jobTitle}</h4>\n                <p className="text-sm">{job.jobType}</p>\n                <p className="text-sm text-slate-300">\n                  {getDateString(job.startDate, job.endDate)}\n                </p>\n              </div>\n            ))}\n          </div>\n        )}\n      </div>\n    ))}\n  </div>\n);\n\nexport default Experiences;\n',
      },
      {
        key: 32,
        title: 'index.tsx',
        type: 'FILE',
        parent: 3,
        content:
          "import { type FunctionComponent } from 'react';\nimport Experiencesfrom './experiences';\n\nconst App: FunctionComponent = () => {\n  return <Experiences/>;\n};\n\nexport default App;\n",
      },
    ],
  },
  {
    key: 4,
    title: 'Skills',
    type: 'FOLDER',
    parent: -1,
    isRunnable: true,
    children: [
      {
        key: 41,
        title: 'skills.tsx',
        type: 'FILE',
        parent: 4,
        content:
          "import Image from 'next/image';\nimport { type FunctionComponent } from 'react';\nimport { clg, SKILLS } from '../utils';\n\nconst Skills: FunctionComponent = () => (\n  <div className=\"container mx-auto flex flex-wrap justify-center gap-8 py-4\">\n    {SKILLS.map((skill) => (\n      // Card\n      <div\n        key={skill.id}\n        className=\"flex h-[150px] w-[150px] items-center rounded bg-gradient-to-br from-slate-400/40 to-slate-400/0 px-4 py-8\"\n        title={skill.title}\n      >\n        {skill.isStaticImage === true ? (\n          <Image src={skill.icon} alt={skill.title} />\n        ) : (\n          <skill.icon\n            className={clg('h-full w-full', {\n              [skill.className as string]: skill.className !== undefined,\n            })}\n          />\n        )}\n      </div>\n    ))}\n  </div>\n);\n\nexport default Skills;\n",
      },
      {
        key: 42,
        title: 'index.tsx',
        type: 'FILE',
        parent: 4,
        content:
          "import { type FunctionComponent } from 'react';\nimport Skills from './skills';\n\nconst App: FunctionComponent = () => {\n  return <Skills />;\n};\n\nexport default App;\n",
      },
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
