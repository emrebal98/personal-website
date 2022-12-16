import { type FunctionComponent } from 'react';
import SimpleBar from 'simplebar-react';
import { type IRunComponent } from '../types';
import Experiences from './experiences';
import Projects from './projects';
import Skills from './skills';

interface RunProps {
  name: IRunComponent;
}

const handleName = (name: IRunComponent) => {
  switch (name) {
    case 'Projects':
      return <Projects />;
    case 'Skills':
      return <Skills />;
    case 'Experiences':
      return <Experiences />;
    default:
      return null;
  }
};

const Run: FunctionComponent<RunProps> = ({ name }) => (
  <SimpleBar className="h-full w-full overflow-auto">{handleName(name)}</SimpleBar>
);

export default Run;
