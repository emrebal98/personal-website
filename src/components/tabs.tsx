import { CodeBracketIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { createRef, type FunctionComponent, type MouseEvent, useEffect } from 'react';
import SimpleBar from 'simplebar-react';
import { useDocumentsStore } from '../stores';
import { clg, searchByKey } from '../utils';

interface ITabsProps {
  title?: string;
}

const Tabs: FunctionComponent<ITabsProps> = ({ title }) => {
  // Scrollable node ref
  const scrollableNodeRef = createRef();
  // Documents
  const documents = useDocumentsStore((state) => state.documents);
  // Active tabs
  const activeTabs = useDocumentsStore((state) => state.activeTabs);
  const removeActiveTab = useDocumentsStore((state) => state.removeActiveTab);
  // Active file
  const activeFile = useDocumentsStore((state) => state.activeFile);
  const setActiveFile = useDocumentsStore((state) => state.setActiveFile);
  // Show menu
  const showMenu = useDocumentsStore((state) => state.showMenu);

  // Handle scroll position
  useEffect(() => {
    const activeTabElement = document.getElementById(activeFile.toString());
    activeTabElement?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }, [activeFile, showMenu]);

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

  return (
    <SimpleBar className="tabs-scroll w-full pb-2" scrollableNodeProps={{ ref: scrollableNodeRef }}>
      <div className={clg('flex gap-4', { 'justify-center': title !== undefined })}>
        {title !== undefined ? (
          <p className="font-consolas text-base italic text-slate-100">{title}</p>
        ) : (
          activeTabs.map((key) => (
            <div
              key={key}
              id={key.toString()}
              className={clg(
                'group relative rounded bg-gradient-to-br from-slate-700/40 to-slate-700/0 backdrop-blur-sm',
                {
                  'border-b border-cyan-300': activeFile === key,
                },
                {
                  'border-b border-transparent': activeFile !== key,
                }
              )}
            >
              <button
                className="flex items-center gap-2 p-2 pr-9"
                type="button"
                onClick={() => setActiveFile(key)}
              >
                <CodeBracketIcon className="h-6 w-6 text-slate-100" />
                <span className="font-consolas text-base font-normal italic text-slate-100">
                  {searchByKey(key, documents)?.title}
                </span>
              </button>
              <button
                className="invisible absolute right-2 top-1/2 -translate-y-1/2 rounded p-[2px] text-slate-100 opacity-0 hover:bg-gradient-to-br hover:from-red-700/60 hover:to-red-700/20 group-hover:visible group-hover:opacity-100"
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
