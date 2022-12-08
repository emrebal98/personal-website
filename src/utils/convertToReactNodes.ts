import { createElement } from 'react';
import { type RefractorElement, type Text } from 'refractor/lib/core';
import { v4 as uid } from 'uuid';

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
 * Converts the given node to a React element or string.
 *
 * @param node - The node to convert.
 * @returns A React element or string.
 */
const convertToReactNodes: (node: RefractorElement | Text) => React.ReactElement | string = (
  node
) => {
  // If the node is a text node, return its value.
  if (node.type === 'text') {
    return node.value;
  }

  // If the node is an element node, return a React element.
  if (node.type === 'element') {
    // Destructure node properties.
    const { tagName, properties, children } = node;
    // Create an object to hold the props for the React element.
    const props = {
      className: '',
      key: uid(),
    };
    // If the node has a className property, add it to the props object.
    if (properties && properties.className) {
      props.className = (properties.className as string[]).join(' ');
    }

    // If the node has a paranthesis character as a child, add the 'paranthesis' class to the props object.
    if (isChildrenIncludesValue(children, 'value', paranthesis)) {
      props.className = `${props.className} paranthesis`;
    }
    // If the node has an operator that should be highlighted different as a child, add the 'operator-exception' class to the props object.
    if (isChildrenIncludesValue(children, 'value', operatorsException)) {
      props.className = `${props.className} operator-exception`;
    }
    // If the node has a keyword that should be highlighted different as a child, add the 'keyword-exception' class to the props object.
    if (isChildrenIncludesValue(children, 'value', keywordsException)) {
      props.className = `${props.className} keyword-exception`;
    }

    // Use the React.createElement method to create a new React element using the
    // tagName, props, and children of the node.
    return createElement(tagName, props, children.map(convertToReactNodes));
  }
  // If the node is not a text or element node, return an empty string.
  return '';
};

export default convertToReactNodes;
