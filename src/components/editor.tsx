import React, { type FunctionComponent } from 'react';
import CodeEditor from 'react-simple-code-editor';
import SimpleBar from 'simplebar-react';
import { useDocumentsStore } from '../stores';
import { getCodeContent } from '../utils';

const Editor: FunctionComponent = () => {
  // Active file
  const activeFile = useDocumentsStore((state) => state.activeFile);
  // Active file code content
  const findActiveFile = useDocumentsStore((state) => state.findActiveFile);
  const updateContent = useDocumentsStore((state) => state.findAndUpdateContent);
  // Active line number
  const activeLineNumber = useDocumentsStore((state) => state.activeLineNumber);

  // Handle highlight code
  const highlightWithLineNumbers = (code: string) =>
    getCodeContent(code)
      .split('\n')
      .map(
        (line, i) =>
          `<span id='line-${i + 1}' class='absolute left-0 w-[40px] text-slate-400${
            activeLineNumber === i + 1 ? 'text-slate-100' : ''
          }'>${i + 1}</span>${line}`
      )
      .join('\n');

  return (
    <div className="language-tsx h-full overflow-hidden">
      <SimpleBar className="h-full">
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
