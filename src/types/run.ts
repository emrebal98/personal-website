import { type StaticImageData } from 'next/image';

export type IRunComponent = 'Home' | 'Projects' | 'Skills' | 'Experiences';

interface ISkillBase {
  id: number;
  title: string;
  className?: string;
  isStaticImage?: boolean;
}

interface ISkillWithSVG extends ISkillBase {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  isStaticImage?: false;
}

interface ISkillWithStaticImage extends ISkillBase {
  icon: StaticImageData;
  isStaticImage: true;
}

export type ISkill = ISkillWithSVG | ISkillWithStaticImage;

export interface IExperience {
  id: number;
  companyName: string;
  companyLogo: StaticImageData;
  jobs: {
    id: number;
    jobTitle: string;
    jobType: string;
    startDate: Date;
    endDate: Date;
    isPresent?: boolean;
  }[];
  location: string;
  skills?: string[];
}
