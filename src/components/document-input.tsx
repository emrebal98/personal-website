import { type FunctionComponent, type RefObject, useState } from 'react';
import { type IDocument } from '../types';

interface DocumentInputProps {
  document: IDocument;
  onEditComplete?: (doc: IDocument, value: string) => void;
  onEditCancel?: (doc: IDocument) => void;
  inputRef?: RefObject<HTMLInputElement>;
  excludeBlur?: (RefObject<HTMLButtonElement> | undefined)[];
}

const DocumentInput: FunctionComponent<DocumentInputProps> = ({
  document,
  onEditComplete,
  onEditCancel,
  inputRef,
  excludeBlur,
}) => {
  const [value, setValue] = useState<string>('');

  const handleInputEditComplete = (doc: IDocument, val: string) => {
    if (!onEditComplete) return;
    onEditComplete(doc, val);
  };

  const handleInputEditCancel = (doc: IDocument) => {
    if (!onEditCancel) return;
    onEditCancel(doc);
  };

  return (
    <input
      ref={inputRef}
      className="rounded border border-slate-600 bg-transparent text-slate-600 focus-visible:outline-none dark:border-slate-400 dark:text-slate-400"
      type="text"
      name="newFile"
      autoComplete="off"
      value={value}
      autoFocus
      onBlur={(e) => {
        if (
          !excludeBlur ||
          excludeBlur.findIndex((f) => f && f.current?.contains(e.relatedTarget)) !== -1
        )
          return;

        if (value === '') handleInputEditCancel(document);
        else handleInputEditComplete(document, value);
      }}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleInputEditComplete(document, value);
        }
        if (e.key === 'Escape') {
          handleInputEditCancel(document);
        }
      }}
    />
  );
};

DocumentInput.defaultProps = {
  onEditComplete: undefined,
  onEditCancel: undefined,
  inputRef: undefined,
  excludeBlur: undefined,
};

export default DocumentInput;
