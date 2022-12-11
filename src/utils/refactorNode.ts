import { type RefractorElement, type Text } from 'refractor/lib/core';

// Check if the given node is a RefractorElement.
const isRefractorElement = (node: RefractorElement | Text): node is Text =>
  Object.keys(node).includes('value');

// Check if the given node includes a value in the given comparator.
const isChildrenIncludesValue = (
  children: (RefractorElement | Text)[],
  value: string,
  comparator: string[]
) =>
  children.findIndex((child) => isRefractorElement(child) && comparator.includes(child.value)) !==
  -1;

// List of paranthesis characters.
const paranthesis = ['(', ')', '{', '}', '[', ']'];

// List of operators that should be highlighted different.
const operatorsException = ['=>'];

// List of keywords that should be highlighted different.
const keywordsException = ['const', 'let', 'var', 'function', 'class'];

/**
 * Refactor a given node to a Refractor Element or Text.
 *
 * @param {RefractorElement | Text} node The node to convert.
 * @returns {RefractorElement | Text} The resulting Refractor Element or Text.
 */
const refactorNode: (node: RefractorElement | Text) => RefractorElement | Text = (node) => {
  if (node.type === 'element') {
    // Destructure the node to get its tagName, properties, and children
    const { tagName, properties, children } = node;
    // Initialize the props object with an empty className
    const props = {
      className: '',
    };
    // If the node has a className property, add it to the props object
    if (properties && properties.className) {
      props.className = (properties.className as string[]).join(' ');
    }
    // If the children array includes a value from the paranthesis array,
    // add the "paranthesis" class to the props object
    if (isChildrenIncludesValue(children, 'value', paranthesis)) {
      props.className = `${props.className} paranthesis`;
    }
    // If the children array includes a value from the operatorsException array,
    // add the "operator-exception" class to the props object
    if (isChildrenIncludesValue(children, 'value', operatorsException)) {
      props.className = `${props.className} operator-exception`;
    }
    // If the children array includes a value from the keywordsException array,
    // add the "keyword-exception" class to the props object
    if (isChildrenIncludesValue(children, 'value', keywordsException)) {
      props.className = `${props.className} keyword-exception`;
    }
    // Create a new RefractorElement with the updated props and children
    const hast: RefractorElement = {
      type: 'element',
      tagName,
      properties: {
        className: props.className.split(' '),
      },
      children: children.map(refactorNode),
    };
    return hast;
  }
  // If the node is a text node, create a new Text node with the same value
  const hastText: Text = {
    type: 'text',
    value: node.value,
  };
  return hastText;
};

export default refactorNode;
