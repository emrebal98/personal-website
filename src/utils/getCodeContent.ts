import type React from 'react';
import tsx from 'refractor/lang/tsx';
import { refractor } from 'refractor/lib/core';
import convertToReactNodes from './convertToReactNodes';

/**
 * Converts the given code content string to an array of React elements.
 *
 * @param content - The code content string to convert.
 * @returns An array of React elements.
 */
const getCodeContent: (content: string) => (React.ReactElement | string)[] = (content) => {
  // Check if the refractor library supports the 'tsx' language.
  // If not, register the 'tsx' language with the refractor library.
  if (!refractor.listLanguages().includes('tsx')) refractor.register(tsx);
  // Use the refractor library to highlight the code content.
  const hast = refractor.highlight(content, 'tsx');
  // Convert the highlighted code to an array of React elements.
  return hast.children.map(convertToReactNodes);
};

export default getCodeContent;
