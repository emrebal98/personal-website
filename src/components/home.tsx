import { type FunctionComponent } from 'react';

const Home: FunctionComponent = () => (
  <div className="container mx-auto flex flex-col items-center gap-8 py-4">
    {/* Card */}
    <div className="flex w-full flex-col items-center gap-4 rounded bg-gradient-to-br from-slate-400/40 to-slate-400/0 px-4 py-8 font-segoeui text-slate-100 md:flex-row md:items-start">
      <div className="flex flex-col gap-4">
        <h1 className="font-segoeui text-4xl font-bold text-slate-100">Hi, I am Emre BAL</h1>
        <h3 className="text-xl font-bold text-slate-100">Full Stack Developer</h3>
        <p className="text-base font-normal text-slate-100">
          I am currently improving myself on Next.js with using T3 stack. You can navigate to skills
          page to see what technologies that I used.
        </p>
      </div>
    </div>
    <div className="flex w-full flex-col items-center gap-4 rounded bg-gradient-to-br from-slate-400/40 to-slate-400/0 px-4 py-8 font-segoeui text-slate-100 md:flex-row md:items-start">
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-slate-100">Why is this site like a code editor?</h3>
        <p className="text-base font-normal text-slate-100">
          Basically, I wanted to create an unusual website to introduce myself.
        </p>
        <h3 className="text-xl font-bold text-slate-100">How do I use it?</h3>
        <ul className="list-disc pl-8 text-base font-normal text-slate-100">
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
      </div>
    </div>
  </div>
);

export default Home;
