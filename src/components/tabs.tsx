import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CodeBracketIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { createRef, type FunctionComponent, type MouseEvent, useEffect } from 'react';
import SimpleBar from 'simplebar-react';
import { useDocumentsStore } from '../stores';
import { type IRunComponent } from '../types';
import { clg, findFile, RUNCOMPONENT_ORDER } from '../utils';

interface ITabsProps {
  title?: string;
}

const Tabs: FunctionComponent<ITabsProps> = ({ title }) => {
  // Scrollable node ref
  const scrollableNodeRef = createRef<HTMLElement>();
  // Documents
  const documents = useDocumentsStore((state) => state.documents);
  // Active tabs
  const activeTabs = useDocumentsStore((state) => state.activeTabs);
  const removeActiveTab = useDocumentsStore((state) => state.removeActiveTab);
  // Active file
  const activeFile = useDocumentsStore((state) => state.activeFile);
  // const findActiveFile = useDocumentsStore((state) => state.findActiveFile);
  const setActiveFile = useDocumentsStore((state) => state.setActiveFile);
  // Run component
  const runComponent = useDocumentsStore((state) => state.runComponent);
  const setRunComponent = useDocumentsStore((state) => state.setRunComponent);

  // Handle scroll position
  useEffect(() => {
    // Get the scrollable node and the active tab
    const scrollElement = scrollableNodeRef.current;
    const activeTabElement = document.getElementById(activeFile.toString());
    // If there is no scrollable node or active tab, return
    if (!activeTabElement || !scrollElement) return;
    // Scroll to the active tab
    const left = activeTabElement.offsetLeft;
    scrollElement.scrollTo({ left, behavior: 'smooth' });
  }, [activeFile, scrollableNodeRef]);

  // Handle tab close
  const handleTabClose = (e: MouseEvent<HTMLButtonElement>, key: number) => {
    e.stopPropagation();
    if (activeFile === key) {
      const index = activeTabs.findIndex((tab) => tab === key);
      const newActiveFile = activeTabs[index + 1] || activeTabs[index - 1];
      if (newActiveFile) setActiveFile(newActiveFile);
      else setActiveFile(-1);
    }
    // Remove the tab from the activeTabs list
    removeActiveTab(key);
  };

  // Get the prev or next run component name
  const getRunComponent = (type: 'prev' | 'next') => {
    if (type === 'next') {
      const index = RUNCOMPONENT_ORDER.findIndex((item) => item === runComponent);
      if (index === RUNCOMPONENT_ORDER.length - 1) return RUNCOMPONENT_ORDER[0] as IRunComponent;
      return RUNCOMPONENT_ORDER[index + 1] as IRunComponent;
    }
    const index = RUNCOMPONENT_ORDER.findIndex((item) => item === runComponent);
    if (index === 0) return RUNCOMPONENT_ORDER[RUNCOMPONENT_ORDER.length - 1] as IRunComponent;
    return RUNCOMPONENT_ORDER[index - 1] as IRunComponent;
  };

  return (
    <SimpleBar className="tabs-scroll w-full pb-2" scrollableNodeProps={{ ref: scrollableNodeRef }}>
      <div className={clg('flex gap-4', { 'justify-center': title !== undefined })}>
        {title !== undefined ? (
          <div className="flex w-full justify-between">
            <div className="flex w-full justify-start overflow-hidden">
              <button
                className="flex items-center gap-2 overflow-hidden text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                type="button"
                onClick={() => setRunComponent(getRunComponent('prev'))}
                title={getRunComponent('prev')}
              >
                <ArrowLeftIcon className="h-6 w-6" />{' '}
                <span className="overflow-hidden text-ellipsis"> {getRunComponent('prev')}</span>
              </button>
            </div>
            <div className="flex w-full min-w-[96px] justify-center overflow-hidden">
              <p className="font-consolas text-base italic text-slate-900 dark:text-slate-100">
                {title}
              </p>
            </div>
            <div className="flex w-full justify-end overflow-hidden">
              <button
                className="flex items-center gap-2 overflow-hidden text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                type="button"
                onClick={() => setRunComponent(getRunComponent('next'))}
                title={getRunComponent('next')}
              >
                <span className="overflow-hidden text-ellipsis">{getRunComponent('next')}</span>
                <ArrowRightIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        ) : (
          activeTabs.map((key) => (
            <div
              key={key}
              id={key.toString()}
              className={clg(
                'group relative rounded bg-gradient-to-br from-slate-300/40 to-slate-300/0 backdrop-blur-sm dark:from-slate-700/40 dark:to-slate-700/0',
                { 'border-b border-cyan-700 dark:border-cyan-300': activeFile === key },
                { 'border-b border-transparent': activeFile !== key }
              )}
            >
              <button
                className="flex items-center gap-2 p-2 pr-9"
                type="button"
                onClick={() => setActiveFile(key)}
              >
                {/* If the file is an extension, show the extension icon */}
                {findFile(key, documents)?.isExtension === true ? (
                  <SquaresPlusIcon className="h-6 w-6 text-slate-900 dark:text-slate-100" />
                ) : (
                  <CodeBracketIcon className="h-6 w-6 text-slate-900 dark:text-slate-100" />
                )}

                <span className="whitespace-nowrap font-consolas text-base font-normal italic text-slate-900 dark:text-slate-100">
                  {findFile(key, documents)?.title}
                </span>
              </button>
              <button
                className="invisible absolute right-2 top-1/2 -translate-y-1/2 rounded p-[2px] text-slate-900 opacity-0 hover:bg-gradient-to-br hover:from-red-300/60 hover:to-red-300/20 group-hover:visible group-hover:opacity-100 dark:text-slate-100 dark:hover:from-red-700/60 dark:hover:to-red-700/20"
                onClick={(e) => handleTabClose(e, key)}
                type="button"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </SimpleBar>
  );
};

Tabs.defaultProps = {
  title: undefined,
};

export default Tabs;
