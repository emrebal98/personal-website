import Image from 'next/image';
import { type FunctionComponent } from 'react';
import { calculateMonths, EXPERIENCES, getDateString } from '../utils';

const Experiences: FunctionComponent = () => (
  <div className="container mx-auto flex flex-col items-center gap-8 py-4">
    {EXPERIENCES.map((experience) => (
      <div
        key={experience.id}
        className="flex w-full flex-col items-center gap-4 rounded bg-gradient-to-br from-slate-400/40 to-slate-400/0 px-4 py-8 font-segoeui text-slate-100 md:flex-row md:items-start"
      >
        {/* Logo */}
        <Image src={experience.companyLogo} alt={experience.companyName} width={80} height={80} />
        {experience.jobs.length === 1 && experience.jobs[0] ? (
          // If there is only one job, show the job title, company name, job type, start date, end date, location, and skills.
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">{experience.jobs[0].jobTitle}</h3>
            <p className="text-sm">{`${experience.companyName} • ${experience.jobs[0].jobType}`}</p>
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
          // If there are more than one job, show the company name, total months, location, and jobs.
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
            {experience.jobs.map((job) => (
              <div key={job.id} className="relative flex flex-col gap-2">
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
