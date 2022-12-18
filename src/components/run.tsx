import { createRef, type FunctionComponent, type RefObject } from 'react';
import SimpleBar from 'simplebar-react';
import { type IRunComponent } from '../types';
import Experiences from './experiences';
import Projects from './projects';
import Skills from './skills';

interface RunProps {
  name: IRunComponent;
}

const handleName: (name: IRunComponent, ref: RefObject<HTMLElement>) => JSX.Element | null = (
  name,
  ref
) => {
  switch (name) {
    case 'Projects':
      return <Projects barRef={ref} />;
    case 'Skills':
      return <Skills />;
    case 'Experiences':
      return <Experiences />;
    default:
      return null;
  }
};

const Run: FunctionComponent<RunProps> = ({ name }) => {
  const ref = createRef<HTMLElement>();

  return (
    <SimpleBar className="h-full w-full overflow-auto" scrollableNodeProps={{ ref }}>
      {handleName(name, ref)}
    </SimpleBar>
  );
};
export default Run;
