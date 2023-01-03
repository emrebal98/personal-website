import {
  Cog8ToothIcon,
  DocumentDuplicateIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  PlayIcon,
  SquaresPlusIcon,
  StopIcon,
  SunIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline/';
import { useTheme } from 'next-themes';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { type FunctionComponent, useEffect, useRef, useState } from 'react';
import { GitHub, LinkedIn } from '../assets/icons';
import { useDocumentsStore } from '../stores';
import { type IRunComponent } from '../types';
import { clg, findParents } from '../utils';

type Social =
  | {
      name: string;
      href: string;
      icon: React.FC<React.SVGProps<SVGSVGElement>>;
      isStaticImage?: false;
    }
  | {
      name: string;
      href: string;
      icon: StaticImageData;
      isStaticImage: true;
    };

const SOCIALS: Social[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/emrebal98',
    icon: GitHub,
  },
  {
    name: 'Linkedin',
    href: 'https://www.linkedin.com/in/emrebal98/',
    icon: LinkedIn,
    isStaticImage: true,
  },
];

const IconBar: FunctionComponent = () => {
  // Theme
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  // Documents
  const documents = useDocumentsStore((state) => state.documents);
  // Active file
  const activeFile = useDocumentsStore((state) => state.activeFile);
  // Show menu
  const showMenu = useDocumentsStore((state) => state.showMenu);
  const toggleMenu = useDocumentsStore((state) => state.toggleMenu);
  // Run component
  const setRunComponent = useDocumentsStore((state) => state.setRunComponent);
  // State for settings
  const [showSettings, setShowSettings] = useState(false);
  // State for about
  const [showAbout, setShowAbout] = useState(false);
  // Ref for settings
  const settingsRef = useRef<HTMLDivElement>(null);
  // Ref for about
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mouseDownListener = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setShowSettings(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setShowAbout(false);
      }
    };
    window.addEventListener('mousedown', mouseDownListener);
    return () => {
      window.removeEventListener('mousedown', mouseDownListener);
    };
  }, [aboutRef, settingsRef]);

  // Handle run code
  const handleRunCode = () => {
    // Get active parent
    const parents = findParents(activeFile, documents);
    const activeTopParent = parents[parents.length - 1];
    // Check if active top parent is runnable
    if (activeTopParent?.type === 'FOLDER' && activeTopParent.isRunnable) {
      toggleMenu('runMenu');
      setRunComponent(activeTopParent.title as IRunComponent);
    }
  };

  return (
    <div className="order-1 flex justify-between p-2 md:order-none md:flex-col">
      {/* Explorer Menu */}
      <button
        className={clg(
          'h-6 w-6 md:mb-8 md:h-8 md:w-8',
          { 'text-slate-900 dark:text-slate-100': showMenu.documentMenu },
          { 'text-slate-600 dark:text-slate-400': !showMenu.documentMenu }
        )}
        onClick={() => toggleMenu('documentMenu')}
        title="Explorer"
        type="button"
      >
        <DocumentDuplicateIcon />
      </button>
      {/* Search Menu */}
      <button
        className={clg(
          'h-6 w-6 cursor-pointer md:mb-8 md:h-8 md:w-8',
          { 'text-slate-900 dark:text-slate-100': showMenu.searchMenu },
          { 'text-slate-600 dark:text-slate-400': !showMenu.searchMenu }
        )}
        onClick={() => toggleMenu('searchMenu')}
        title="Search"
        type="button"
      >
        <MagnifyingGlassIcon />
      </button>
      {/* Extensions Menu */}
      <button
        className={clg(
          'h-6 w-6 cursor-pointer md:mb-8 md:h-8 md:w-8',
          { 'text-slate-900 dark:text-slate-100': showMenu.extensionMenu },
          { 'text-slate-600 dark:text-slate-400': !showMenu.extensionMenu }
        )}
        onClick={() => toggleMenu('extensionMenu')}
        title="Extensions"
        type="button"
      >
        <SquaresPlusIcon />
      </button>
      {/* Run Button */}
      {showMenu.runMenu ? (
        <button
          className="h-6 w-6 cursor-pointer text-slate-900 dark:text-slate-100 md:mb-auto md:h-8 md:w-8"
          onClick={handleRunCode}
          title="Stop"
          type="button"
        >
          <StopIcon />
        </button>
      ) : (
        <button
          className="h-6 w-6 cursor-pointer text-slate-600 dark:text-slate-400 md:mb-auto md:h-8 md:w-8"
          onClick={handleRunCode}
          title="Run"
          type="button"
        >
          <PlayIcon />
        </button>
      )}
      {/* About */}
      <div className="relative" ref={aboutRef}>
        <button
          className="h-6 w-6 text-slate-600 dark:text-slate-400 md:mb-4 md:h-8 md:w-8"
          type="button"
          onClick={() => setShowAbout((prev) => !prev)}
          title="About"
        >
          <UserCircleIcon />
        </button>
        {showAbout && (
          <div className="absolute bottom-full right-0 z-50 mb-2 flex w-fit flex-col gap-2 rounded bg-slate-400/80 p-2 dark:bg-slate-600/80 md:bottom-4 md:left-full md:mb-0 md:ml-2">
            {SOCIALS.map((social) => (
              <Link
                className="flex w-max items-center gap-2 whitespace-nowrap rounded px-2 py-1 text-slate-900 hover:bg-slate-600/20 dark:text-slate-100 dark:hover:bg-slate-400/20"
                href={social.href}
                target="_blank"
              >
                {social.isStaticImage === true ? (
                  <Image
                    className="brightness-[0.16] dark:brightness-100"
                    src={social.icon}
                    alt={social.name}
                    width={24}
                    height={24}
                  />
                ) : (
                  <social.icon className="h-6 w-6 text-[#24292f] dark:text-white" />
                )}

                {social.name}
              </Link>
            ))}
          </div>
        )}
      </div>
      {/* Settings */}
      <div className="relative" ref={settingsRef}>
        <button
          className="h-6 w-6 text-slate-600 dark:text-slate-400 md:h-8 md:w-8"
          type="button"
          onClick={() => setShowSettings((prev) => !prev)}
          title="Settings"
        >
          <Cog8ToothIcon />
        </button>
        {showSettings && (
          <div className="absolute bottom-full right-0 z-50 mb-2 w-fit rounded bg-slate-400/80 p-2 dark:bg-slate-600/80 md:bottom-0 md:left-full md:mb-0 md:ml-2">
            <button
              className="flex items-center gap-2 whitespace-nowrap rounded px-2 py-1 text-slate-900 hover:bg-slate-600/20 dark:text-slate-100 dark:hover:bg-slate-400/20"
              type="button"
              onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            >
              {currentTheme === 'dark' ? (
                <>
                  <SunIcon className="h-6 w-6" />
                  Light Theme
                </>
              ) : (
                <>
                  <MoonIcon className="h-6 w-6" /> Dark Theme
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IconBar;
