import { toHtml } from 'hast-util-to-html';
import tsx from 'refractor/lang/tsx';
import { refractor } from 'refractor/lib/core';
import refactorNode from './refactorNode';

/**
 * Converts the given code content string to an refactored HTML string.
 *
 * @param content - The code content string to convert.
 * @returns An string of HTML.
 */
const getCodeContent: (content: string) => string = (content) => {
  // Check if the refractor library supports the 'tsx' language.
  // If not, register the 'tsx' language with the refractor library.
  if (!refractor.listLanguages().includes('tsx')) refractor.register(tsx);
  // Use the refractor library to highlight the code content.
  const hast = refractor.highlight(content, 'tsx');

  // Convert the highlighted code to an array of Refractor Elements or Texts.
  const result = hast.children.map((m) => refactorNode(m));

  return toHtml(result);
};

export default getCodeContent;
