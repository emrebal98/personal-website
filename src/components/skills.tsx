import Image from 'next/image';
import { type FunctionComponent } from 'react';
import { clg, SKILLS } from '../utils';

const Skills: FunctionComponent = () => (
  <div className="container mx-auto flex flex-wrap justify-center gap-8 py-4">
    {SKILLS.map((skill) => (
      // Card
      <div
        key={skill.id}
        className="flex h-[150px] w-[150px] items-center rounded bg-light-gradient px-4 py-8 dark:bg-dark-gradient"
        title={skill.title}
      >
        {skill.isStaticImage === true ? (
          <Image src={skill.icon} alt={skill.title} priority />
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
