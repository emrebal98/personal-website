/**
 * Generates a class name string from unconditional and conditional class names.
 * @param classNames "class1 class2 class3" or  {"class1 class2": true, "class2": false }
 * @returns string
 */
export default function classNameGenerator(
  ...classNames: (string | { [x: string]: boolean })[]
): string {
  const classes: string[] = [];
  classNames.forEach((className) => {
    if (typeof className === 'string') {
      classes.push(className);
    } else {
      Object.keys(className).forEach((key) => {
        if (className[key]) {
          classes.push(key);
        }
      });
    }
  });

  return classes.join(' ');
}
