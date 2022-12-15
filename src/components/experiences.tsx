import dayjs from 'dayjs';
import Image, { type StaticImageData } from 'next/image';
import React from 'react';
import type { FunctionComponent } from 'react';
import { Allianz, Jotform, SistemTeknik } from '../assets/icons';

interface ExperiencesProps {}

type Experience = {
  companyName: string;
  companyLogo: StaticImageData;
  jobs: {
    jobTitle: string;
    jobType: string;
    startDate: Date;
    endDate: Date;
  }[];
  location: string;
  skills?: string[];
};

const experiences: Experience[] = [
  {
    companyName: 'JotForm',
    companyLogo: Jotform,
    jobs: [
      {
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
    companyName: 'Allianz Partners',
    companyLogo: Allianz,
    jobs: [
      {
        jobTitle: 'Workplace Service Specialist',
        jobType: 'Contract',
        startDate: new Date('2021-09-01'),
        endDate: new Date('2021-10-01'),
      },
      {
        jobTitle: 'Intern',
        jobType: 'Internship',
        startDate: new Date('2021-08-01'),
        endDate: new Date('2021-08-01'),
      },
    ],
    location: 'Istanbul, Turkey',
  },
];

const calculateMonths = (startDate: Date, endDate: Date) => {
  console.log(startDate, endDate);

  const start = dayjs(startDate);
  const end = dayjs(endDate);
  return end.subtract(start.get('months'), 'months').get('months');
};

const getDateString = (startDate: Date, endDate: Date) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const monthDiff = calculateMonths(startDate, endDate);

  const result = `${start.format('MMM YYYY')} - ${end.format('MMM YYYY')} • ${monthDiff + 1} month${
    monthDiff + 1 > 1 ? 's' : ''
  }`;
  return result;
};

// calculateMonths(experience.jobs[0].startDate, experience.jobs[0].endDate) + 1
const Experiences: FunctionComponent<ExperiencesProps> = () => (
  <div className="flex flex-col items-center gap-8 px-16 py-4">
    {experiences.map((experience, index) => (
      <div
        key={index}
        className="flex w-full flex-col items-center gap-4 rounded bg-gradient-to-br from-slate-400/40 to-slate-400/0 px-4 py-8 font-segoeui text-slate-100 md:flex-row md:items-start"
      >
        <Image src={experience.companyLogo} alt={experience.companyName} width={80} height={80} />
        {experience.jobs.length === 1 && experience.jobs[0] ? (
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">{experience.jobs[0].jobTitle}</h3>
            <p className="text-sm">{experience.jobs[0].jobType}</p>
            <p className="text-sm text-slate-300">
              {getDateString(experience.jobs[0].startDate, experience.jobs[0].endDate)}
            </p>
            <p className="text-sm text-slate-200">{experience.location}</p>
            <p className="text-sm">
              <span className="font-bold">Skills: </span>
              {experience.skills?.join(' • ')}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">{experience.companyName}</h3>
              <p className="text-sm">
                {`${
                  calculateMonths(
                    experience.jobs[experience.jobs.length - 1]?.startDate as Date,
                    experience.jobs[0]?.endDate as Date
                  ) + 1
                } months`}
              </p>
              <p className="text-sm text-slate-300">{experience.location}</p>
            </div>
            {experience.jobs.map((job, j) => (
              <div key={j} className="relative flex flex-col gap-2">
                <h4 className="font-bold">{job.jobTitle}</h4>
                <p className="text-sm">{job.jobType}</p>

                <p className="text-sm text-slate-300">
                  {getDateString(job.startDate, job.endDate)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

export default Experiences;
