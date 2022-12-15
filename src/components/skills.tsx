import Image from 'next/image';
import { type FunctionComponent } from 'react';
import {
  CSharp,
  CSS,
  Flutter,
  Git,
  Java,
  JavaScript,
  MySQL,
  NextJS,
  NodeJS,
  Prisma,
  Python,
  ReactJS,
  Sass,
  StyledComponents,
  TailwindCSS,
  TRPC,
  TypeScript,
} from '../assets/icons';
import { clg } from '../utils';

const skills = [
  {
    title: 'NextJS',
    icon: NextJS,
    className: 'text-black dark:text-white',
  },
  {
    title: 'ReactJS',
    icon: ReactJS,
  },
  {
    title: 'TypeScript',
    icon: TypeScript,
  },
  {
    title: 'JavaScript',
    icon: JavaScript,
  },
  {
    title: 'TailwindCSS',
    icon: TailwindCSS,
    className: 'text-black dark:text-white',
  },
  {
    title: 'CSS',
    icon: CSS,
  },
  {
    title: 'Sass',
    icon: Sass,
  },
  {
    title: 'styled-components',
    icon: StyledComponents,
    isNotSvg: true,
  },
  {
    title: 'NodeJS',
    icon: NodeJS,
  },
  {
    title: 'Prisma',
    icon: Prisma,
    className: 'text-black dark:text-white',
  },
  {
    title: 'tRPC',
    icon: TRPC,
  },
  {
    title: 'Git',
    icon: Git,
  },
  {
    title: 'MySQL',
    icon: MySQL,
  },
  {
    title: 'Flutter',
    icon: Flutter,
  },
  {
    title: 'C#',
    icon: CSharp,
  },
  {
    title: 'Java',
    icon: Java,
  },
  {
    title: 'Python',
    icon: Python,
  },
];

const Skills: FunctionComponent = () => (
  <div className="flex flex-wrap justify-center gap-8 py-4">
    {skills.map((skill, index) => (
      // Card
      <div
        key={index}
        className="flex h-[150px] w-[150px] items-center rounded bg-gradient-to-br from-slate-400/40 to-slate-400/0 px-4 py-8"
        title={skill.title}
      >
        {skill.isNotSvg === true ? (
          <Image src={skill.icon} alt={skill.title} />
        ) : (
          <skill.icon
            className={clg('h-full w-full', {
              [skill.className as string]: skill.className !== undefined,
            })}
          />
        )}
      </div>
    ))}
  </div>
);

export default Skills;
