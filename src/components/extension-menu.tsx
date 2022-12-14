import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline/';
import React, { type FunctionComponent } from 'react';
import SimpleBar from 'simplebar-react';
import { useDocumentsStore } from '../stores';
import { clg, contactExtensionKey } from '../utils';

const ExtensionMenu: FunctionComponent = () => {
  // Active file
  const activeFile = useDocumentsStore((state) => state.activeFile);
  const setActiveFile = useDocumentsStore((state) => state.setActiveFile);
  // Active tabs
  const addActiveTab = useDocumentsStore((state) => state.addActiveTab);
  // Handle extension click
  const handleExtensionClick = () => {
    if (activeFile !== contactExtensionKey) {
      // Set active file
      setActiveFile(contactExtensionKey);
      addActiveTab(contactExtensionKey);
    }
  };
  return (
    <div className="flex w-full flex-col gap-4 py-2 px-4 font-segoeui md:min-w-[300px] md:max-w-[300px]">
      {/* Topbar */}
      <div className="flex flex-col gap-4">
        {/* Text */}
        <p className="select-none font-segoeui text-base font-normal text-slate-100">EXTENSIONS</p>
      </div>
      {/* Documents */}
      <div className="h-full overflow-hidden">
        <SimpleBar className="h-full w-full">
          <div className="flex flex-col gap-4">
            <button
              className={clg(
                'flex items-center gap-2 text-left',
                { 'text-cyan-300': activeFile === contactExtensionKey },
                { 'text-slate-400 hover:text-slate-100': activeFile !== contactExtensionKey }
              )}
              type="button"
              title="Contact page that allows users to send messages to the website owner."
              onClick={() => handleExtensionClick()}
            >
              <ChatBubbleBottomCenterTextIcon className="h-8 min-h-[2rem] w-8 min-w-[2rem]" />
              <div className="flex flex-col gap-1 overflow-hidden">
                <p className="text-base font-normal">Contact</p>
                <p
                  className={clg(
                    'overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal',
                    { 'text-cyan-300': activeFile === contactExtensionKey },
                    { 'text-slate-400': activeFile !== contactExtensionKey }
                  )}
                >
                  Contact page that allows users to send messages to the website owner.
                </p>
              </div>
            </button>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default ExtensionMenu;
