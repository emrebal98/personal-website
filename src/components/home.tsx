import Link from 'next/link';
import { type FunctionComponent, type ReactElement } from 'react';

const Card = ({ children }: { children: ReactElement }) => (
  <div className="flex w-full flex-col items-center gap-4 rounded bg-light-gradient p-8 font-segoeui text-slate-900 dark:bg-dark-gradient dark:text-slate-100 md:flex-row md:items-start">
    <div className="flex flex-col gap-4">{children}</div>
  </div>
);

const Home: FunctionComponent = () => (
  <div className="container mx-auto flex flex-col items-center gap-8 py-4">
    {/* Card */}
    <Card>
      <>
        <h1 className="text-4xl font-bold">Hi, I am Emre BAL</h1>
        <h2 className="text-xl font-bold">Software Developer</h2>
        <p className="text-base font-normal">
          I am currently improving myself on Next.js with using
          <Link href="https://create.t3.gg/" target="_blank">
            {' T3 stack'}
          </Link>
          . You can navigate to skills page to see what technologies that I used.
        </p>
      </>
    </Card>
    <Card>
      <>
        <h2 className="text-xl font-bold">Why is this site like a code editor?</h2>
        <p className="text-base font-normal">
          Basically, I wanted to create an unusual website to introduce myself.
        </p>
        <h2 className="text-xl font-bold">How do I use it?</h2>
        <ul className="list-disc pl-8 text-base font-normal">
          <li>There are 4 pages Home, Projects, Experiences, Skills. </li>
          <li>
            You can navigate between pages without going back to code view from top navigation bar.
          </li>
          <li>
            To run one of these pages, you can open any file under the relevant directory and press
            the run button.
          </li>
          <li>I leave the rest for you to discover. 😀</li>
        </ul>
      </>
    </Card>
  </div>
);

export default Home;
