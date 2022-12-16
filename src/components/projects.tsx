import {
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline/';
import { type FunctionComponent, useState } from 'react';
import { clg } from '../utils';
// TODO: add navigation for projects on bottom navbar matbe link to site to
const Projects: FunctionComponent = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  return (
    <div
      className={clg(
        'test-border relative mx-auto h-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-400/40 to-slate-400/0 backdrop-blur-2xl',
        { 'w-[414px]': device === 'mobile', 'w-full': device === 'desktop' }
      )}
    >
      {loading === true && (
        <div className="absolute inset-0 flex items-center  justify-center bg-slate-400/40 backdrop-blur-lg">
          <RocketLaunchIcon
            className="h-12 w-12 animate-[spin_2s_linear_infinite] text-slate-100"
            title="Loading"
          />
        </div>
      )}
      <iframe
        className="h-full w-full overflow-hidden"
        src="https://blog-with-nextjs-emrebal98.vercel.app/"
        title="Blog with Next.js"
        loading="lazy"
        onLoad={() => setLoading(false)}
      />
      {/* Bottom Navbar */}
      <div className="absolute inset-x-0 bottom-0 flex h-[50px] items-center justify-center rounded-b-2xl bg-gradient-to-br from-slate-400/40 to-slate-400/0 backdrop-blur-2xl">
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
    </div>
  );
};

export default Projects;
