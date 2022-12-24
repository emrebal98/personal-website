import {
  DocumentMenu,
  Editor,
  ExtensionMenu,
  IconBar,
  Layout,
  Run,
  SearchMenu,
  Tabs,
} from '../components';
import { useDocumentsStore } from '../stores';
import { clg } from '../utils';
import { type NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  // Show menu
  const showMenu = useDocumentsStore((state) => state.showMenu);
  // Run component
  const runComponent = useDocumentsStore((state) => state.runComponent);

  return (
    <main className="relative h-screen overflow-hidden bg-slate-100 dark:bg-slate-900 md:p-16">
      {/* Window */}
      <div className="flex h-full flex-col rounded-2xl bg-light-gradient p-4 dark:bg-dark-gradient md:flex-row ">
        {/* Left Icon Bar */}
        <IconBar />
        {/* For Mobile Responsive */}
        <div className="flex h-full w-full overflow-hidden">
          {/* Left Menu Bar */}
          {showMenu.documentMenu && <DocumentMenu />}
          {showMenu.searchMenu && <SearchMenu />}
          {showMenu.extensionMenu && <ExtensionMenu />}
          {/* BODY */}
          <div
            className={clg('flex w-full flex-col gap-2 overflow-hidden p-2', {
              'hidden md:flex':
                showMenu.documentMenu || showMenu.searchMenu || showMenu.extensionMenu,
            })}
          >
            {/* TABS */}
            <Tabs title={showMenu.runMenu ? runComponent : undefined} />
            {/* EDITOR & Runnable Component */}
            {showMenu.runMenu ? <Run name={runComponent} /> : <Editor />}
          </div>
        </div>
      </div>
      {/* Circles */}
      <div className="absolute right-16 top-16 h-[60px] w-[60px] rounded-full bg-cyan-700 blur-3xl dark:bg-cyan-300 md:right-32 md:top-60 md:h-[100px] md:w-[100px]" />
      <div className="absolute left-16 bottom-16 h-[60px] w-[60px] rounded-full bg-cyan-700 blur-3xl dark:bg-cyan-300 md:left-96 md:bottom-36 md:h-[100px] md:w-[100px]" />
    </main>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
