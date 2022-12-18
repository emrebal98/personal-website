import {
  ArrowLongRightIcon,
  ArrowTopRightOnSquareIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline/';
import Link from 'next/link';
import { type FunctionComponent, type RefObject, useState } from 'react';
import { clg, useElementWidth } from '../utils';

const PROJECTS = [
  'https://blog-with-nextjs-emrebal98.vercel.app/',
  'http://oriondizaynmakina.com/',
];

const DEVICES: { [key in 'desktop' | 'mobile']: { width: number; height: number } } = {
  desktop: {
    width: 1440,
    height: 1080,
  },
  mobile: {
    width: 414,
    height: 896,
  },
};

interface IProjectsProps {
  barRef: RefObject<HTMLElement>;
}

const Projects: FunctionComponent<IProjectsProps> = ({ barRef }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [currentProject, setCurrentProject] = useState<string>(PROJECTS[0] as string);
  // Current parent width
  const parent = useElementWidth(barRef);
  // Calculated value for zoom respect to window width
  const calculatedZoom = 1 / (DEVICES[device].width / parent.width);

  const handleNextProject = () => {
    setLoading(true);
    const currentIndex = PROJECTS.indexOf(currentProject);
    if (currentIndex === PROJECTS.length - 1) {
      setCurrentProject(PROJECTS[0] as string);
    } else setCurrentProject(PROJECTS[currentIndex + 1] as string);
  };

  const isParentSizeGreater = (type: 'width' | 'height') => {
    if (type === 'width') {
      return DEVICES[device].width < parent.width;
    }
    return DEVICES[device].height < parent.height;
  };

  const calculateIframeHeight = () => {
    if (isParentSizeGreater('height')) {
      return DEVICES[device].height;
    }
    if (calculatedZoom < 1) return parent.height / calculatedZoom;
    return parent.height;
  };

  return (
    <div
      className="relative mx-auto h-full origin-top-left overflow-hidden rounded-2xl bg-gradient-to-br from-slate-400/40 to-slate-400/0 backdrop-blur-2xl transition-width"
      style={{
        width: DEVICES[device].width < parent.width ? DEVICES[device].width : '100%',
      }}
    >
      {loading === true && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-400/40 backdrop-blur-lg">
          <RocketLaunchIcon
            className="h-12 w-12 animate-[spin_2s_linear_infinite] text-slate-100"
            title="Loading"
          />
        </div>
      )}
      <iframe
        className="h-full w-full origin-top-left"
        src={currentProject}
        title="Blog with Next.js"
        loading="lazy"
        onLoad={() => setLoading(false)}
        style={{
          width: DEVICES[device].width,
          height: calculateIframeHeight(),
          transform: calculatedZoom < 1 ? `scale(${calculatedZoom})` : 'unset',
        }}
      />
      {/* Bottom Navbar */}
      <div className="absolute inset-x-0 bottom-0 flex h-[50px] items-center justify-between rounded-b-2xl bg-gradient-to-br from-slate-400/40 to-slate-400/0 px-4 backdrop-blur-2xl">
        <div className="flex w-full justify-start">
          <Link
            className="rounded bg-slate-600/60 py-1 px-2 text-slate-100 hover:bg-slate-600"
            href={currentProject}
            target="_blank"
            title="Open site in new tab"
          >
            <ArrowTopRightOnSquareIcon className="h-6 w-6" />
          </Link>
        </div>
        <div className="flex w-full justify-center">
          <button
            className={clg('h-10 w-10 rounded-l p-1 text-slate-100 ', {
              'bg-slate-900': device === 'desktop',
              'bg-slate-900/50 ': device !== 'desktop',
            })}
            type="button"
            onClick={() => setDevice('desktop')}
          >
            <ComputerDesktopIcon />
          </button>
          <button
            className={clg('h-10 w-10 rounded-r p-1 text-slate-100 ', {
              'bg-slate-900': device === 'mobile',
              'bg-slate-900/50 ': device !== 'mobile',
            })}
            type="button"
            onClick={() => setDevice('mobile')}
          >
            <DevicePhoneMobileIcon />
          </button>
        </div>
        <div className="flex w-full justify-end">
          <button
            className="flex gap-2 rounded bg-slate-600/60 px-2 text-slate-100 hover:bg-slate-600"
            type="button"
            onClick={() => handleNextProject()}
          >
            <p className="stroke-red-600 stroke-2">Next</p>
            <ArrowLongRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
