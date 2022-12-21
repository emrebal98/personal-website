import React, { createRef, type FunctionComponent, useEffect } from 'react';
import CodeEditor from 'react-simple-code-editor';
import SimpleBar from 'simplebar-react';
import { useDocumentsStore } from '../stores';
import { contactExtensionKey, getCodeContent } from '../utils';
import Contact from './contact';

const Editor: FunctionComponent = () => {
  // Scrollable node ref
  const scrollableNodeRef = createRef<HTMLElement>();
  // Active file
  const activeFile = useDocumentsStore((state) => state.activeFile);
  // Active file code content
  const findActiveFile = useDocumentsStore((state) => state.findActiveFile);
  const updateContent = useDocumentsStore((state) => state.findAndUpdateContent);
  // Active line number
  const activeLineNumber = useDocumentsStore((state) => state.activeLineNumber);

  useEffect(() => {
    // If there is no active line number, return
    if (activeLineNumber === -1) return;
    // Get the scrollable node and the active line
    const scrollElement = scrollableNodeRef.current;
    const line = document.getElementById(`line-${activeLineNumber}`);
    // If there is no scrollable node or active line, return
    if (!line || !scrollElement) return;
    // Scroll to the active line
    const top = line.offsetTop - scrollElement.getBoundingClientRect().height / 2;
    scrollElement.scrollTo({ top, behavior: 'smooth' });
  }, [activeLineNumber, scrollableNodeRef]);

  // Handle highlight code
  const highlightWithLineNumbers = (code: string) =>
    getCodeContent(code)
      .split('\n')
      .map(
        (line, i) =>
          `<span id='line-${i + 1}' class='absolute left-0 w-[40px]${
            activeLineNumber === i + 1 ? ' text-slate-100' : ' text-slate-400'
          }'>${i + 1}</span>${line}`
      )
      .join('\n');

  //  If the active file is an extension and the active file is the contact extension
  if (findActiveFile(activeFile)?.isExtension === true && activeFile === contactExtensionKey) {
    return <Contact />;
  }

  return (
    <div className="language-tsx h-full overflow-hidden">
      <SimpleBar className="h-full" scrollableNodeProps={{ ref: scrollableNodeRef }}>
        <CodeEditor
          className="code-editor float-left min-h-[40px] min-w-full "
          value={findActiveFile(activeFile)?.content ?? ''}
          onValueChange={(newCode) => updateContent(activeFile, newCode)}
          highlight={(hCode) => highlightWithLineNumbers(hCode)}
          placeholder="Write some code..."
          preClassName="pre-code-editor"
        />
      </SimpleBar>
    </div>
  );
};

export default Editor;
