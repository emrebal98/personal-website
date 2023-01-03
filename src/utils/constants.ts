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
  Zustand,
} from '../assets/icons';
import { type IDocument, type IExperience, type IRunComponent, type ISkill } from '../types';

export const contactExtensionKey = 999;

export const DOCUMENTS: IDocument[] = [
  {
    key: 1,
    title: 'Home',
    type: 'FOLDER',
    parent: -1,
    isRunnable: true,
    children: [
      {
        key: 11,
        title: 'home.tsx',
        type: 'FILE',
        parent: 1,
        content:
          'import { type FunctionComponent } from \'react\';\n\nconst Home: FunctionComponent = () => (\n  <div className="container mx-auto flex flex-col items-center gap-8 py-4">\n    {/* Card */}\n    <div className="flex w-full flex-col items-center gap-4 rounded bg-gradient-to-br from-slate-400/40 to-slate-400/0 px-4 py-8 font-segoeui text-slate-100 md:flex-row md:items-start">\n      <div className="flex flex-col gap-4">\n        <h1 className="font-segoeui text-4xl font-bold text-slate-100">Hi, I am Emre BAL</h1>\n        <h3 className="text-xl font-bold text-slate-100">Software Developer</h3>\n        <p className="text-base font-normal text-slate-100">\n          I am currently improving myself on Next.js with using T3 stack. You can navigate to skills\n          page to see what technologies that I used.\n        </p>\n      </div>\n    </div>\n    <div className="flex w-full flex-col items-center gap-4 rounded bg-gradient-to-br from-slate-400/40 to-slate-400/0 px-4 py-8 font-segoeui text-slate-100 md:flex-row md:items-start">\n      <div className="flex flex-col gap-4">\n        <h3 className="text-xl font-bold text-slate-100">Why is this site like a code editor?</h3>\n        <p className="text-base font-normal text-slate-100">\n          Basically, I wanted to create an unusual website to introduce myself.\n        </p>\n        <h3 className="text-xl font-bold text-slate-100">How do I use it?</h3>\n        <ul className="list-disc pl-8 text-base font-normal text-slate-100">\n          <li>There are 4 pages Home, Projects, Experiences, Skills. </li>\n          <li>\n            You can navigate between pages without going back to code view from top navigation bar.\n          </li>\n          <li>\n            To run one of these pages, you can open any file under the relevant directory and press\n            the run button.\n          </li>\n          <li>I leave the rest for you to discover. 😀</li>\n        </ul>\n      </div>\n    </div>\n  </div>\n);\n\nexport default Home;\n',
      },
      {
        key: 12,
        title: 'index.tsx',
        type: 'FILE',
        parent: 1,
        content:
          "import { type FunctionComponent } from 'react';\nimport Home from './home';\n\nconst App: FunctionComponent = () => {\n  return <Home />;\n};\n\nexport default App;\n",
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
      {
        key: 21,
        title: 'projects.tsx',
        type: 'FILE',
        parent: 2,
        content:
          'import {\n  ArrowLongRightIcon,\n  ArrowTopRightOnSquareIcon,\n  ComputerDesktopIcon,\n  DevicePhoneMobileIcon,\n  RocketLaunchIcon,\n} from \'@heroicons/react/24/outline/\';\nimport Link from \'next/link\';\nimport { type FunctionComponent, type RefObject, useState } from \'react\';\nimport { clg, DEVICES, PROJECTS } from \'../utils\';\n\nconst Projects: FunctionComponent = () => (\n  <div\n    className="relative mx-auto h-full origin-top-left overflow-hidden rounded-2xl bg-gradient-to-br from-slate-400/40 to-slate-400/0 backdrop-blur-2xl transition-width"\n    style={{\n      width: isParentSizeGreater(\'width\') ? DEVICES[device].width : \'100%\',\n    }}\n  >\n    {loading === true && (\n      <div className="absolute inset-0 flex items-center justify-center bg-slate-400/40 backdrop-blur-lg">\n        <RocketLaunchIcon\n          className="h-12 w-12 animate-[spin_2s_linear_infinite] text-slate-100"\n          title="Loading"\n        />\n      </div>\n    )}\n    <iframe\n      className="h-full w-full origin-top-left"\n      src={PROJECTS[projectIndex]?.url}\n      title={PROJECTS[projectIndex]?.title}\n      loading="lazy"\n      onLoad={() => setLoading(false)}\n      style={{\n        width: DEVICES[device].width,\n        height: calculateIframeHeight(),\n        transform: calculatedZoom < 1 ? `scale(${calculatedZoom})` : \'unset\',\n      }}\n    />\n    {/* Bottom Navbar */}\n    <div className="absolute inset-x-0 bottom-0 flex h-[50px] items-center justify-between rounded-b-2xl bg-gradient-to-br from-slate-400/40 to-slate-400/0 px-4 backdrop-blur-2xl">\n      <div className="flex w-full justify-start">\n        <Link\n          className="rounded bg-slate-600/60 py-1 px-2 text-slate-100 hover:bg-slate-600"\n          href={PROJECTS[projectIndex]?.url ?? \'#\'}\n          target="_blank"\n          title="Open site in new tab"\n        >\n          <ArrowTopRightOnSquareIcon className="h-6 w-6" />\n        </Link>\n      </div>\n      <div className="flex w-full justify-center">\n        <button\n          className={clg(\'h-10 w-10 rounded-l p-1 text-slate-100 \', {\n            \'bg-slate-900\': device === \'desktop\',\n            \'bg-slate-900/50 \': device !== \'desktop\',\n          })}\n          type="button"\n          onClick={() => setDevice(\'desktop\')}\n        >\n          <ComputerDesktopIcon />\n        </button>\n        <button\n          className={clg(\'h-10 w-10 rounded-r p-1 text-slate-100 \', {\n            \'bg-slate-900\': device === \'mobile\',\n            \'bg-slate-900/50 \': device !== \'mobile\',\n          })}\n          type="button"\n          onClick={() => setDevice(\'mobile\')}\n        >\n          <DevicePhoneMobileIcon />\n        </button>\n      </div>\n      <div className="flex w-full justify-end">\n        <button\n          className="flex gap-2 rounded bg-slate-600/60 px-2 text-slate-100 hover:bg-slate-600"\n          type="button"\n          onClick={() => handleNextProject()}\n        >\n          <p className="stroke-red-600 stroke-2">Next</p>\n          <ArrowLongRightIcon className="h-6 w-6" />\n        </button>\n      </div>\n    </div>\n  </div>\n);\n\nexport default Projects;\n',
      },
      {
        key: 22,
        title: 'index.tsx',
        type: 'FILE',
        parent: 2,
        content:
          "import { type FunctionComponent } from 'react';\nimport Projects from './projects';\n\nconst App: FunctionComponent = () => {\n  return <Projects />;\n};\n\nexport default App;\n",
      },
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
          "import { type FunctionComponent } from 'react';\nimport Experiences from './experiences';\n\nconst App: FunctionComponent = () => {\n  return <Experiences />;\n};\n\nexport default App;\n",
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
    key: contactExtensionKey,
    title: 'Contact Page',
    type: 'FILE',
    parent: -1,
    content: '',
    isExtension: true,
  },
];

export const DOCUMENTS_ORDER = ['FOLDER', 'FILE'];

export const RUNCOMPONENT_ORDER: IRunComponent[] = ['Home', 'Projects', 'Skills', 'Experiences'];

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
    id: 228,
    title: 'Zustand',
    icon: Zustand,
    isStaticImage: true,
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
