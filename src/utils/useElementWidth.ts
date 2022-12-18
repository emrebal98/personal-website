import { type RefObject, useEffect, useState } from 'react';

const getWidthWithElement = (element: HTMLElement) => element.getBoundingClientRect().width;
const getHeightWithElement = (element: HTMLElement) => element.getBoundingClientRect().height;

const useElementWidth = (element: RefObject<HTMLElement>) => {
  // save current size in the state object
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (element.current) {
      setWidth(getWidthWithElement(element.current));
      setHeight(getHeightWithElement(element.current));
    }
    // timeoutId for debounce mechanism
    let timeoutId: NodeJS.Timeout;
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change size from the state object after 150 milliseconds
      timeoutId = setTimeout(() => {
        if (element.current) {
          setWidth(getWidthWithElement(element.current));
          setHeight(getHeightWithElement(element.current));
        }
      }, 150);
    };

    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    };
  }, [element]);

  return { width, height };
};

export default useElementWidth;
