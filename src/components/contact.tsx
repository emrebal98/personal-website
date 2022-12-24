import { EnvelopeIcon, PencilIcon, UserIcon } from '@heroicons/react/24/outline';
import React, { type ChangeEvent, type FormEvent, type FunctionComponent } from 'react';
import SimpleBar from 'simplebar-react';

const Contact: FunctionComponent = () => {
  // Handle submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data); // TODO: Form validation then connect to sendmail service
  };

  // Handle auto resize
  const handleAutoResize = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="overflow-auto py-4">
      <SimpleBar className="h-full md:px-8">
        <h1 className="mb-8 text-center text-2xl text-slate-900 dark:text-slate-100">
          Contact Form
        </h1>
        {/* Contact form */}
        <form className="mb-4 flex flex-col gap-8" onSubmit={handleSubmit}>
          {/* Name */}
          <div
            className="flex min-h-[40px] w-full items-center gap-4 rounded border border-slate-600 bg-transparent px-4 py-2 focus-within:border-cyan-700 dark:border-slate-400 dark:focus-within:border-cyan-300"
            title="Please enter your name"
          >
            <UserIcon className="h-4 w-4 text-slate-900 dark:text-slate-100" />
            <input
              className="w-full bg-transparent text-sm font-normal text-slate-900 placeholder:text-slate-600 focus-visible:border-none focus-visible:outline-none dark:text-slate-100 dark:placeholder:text-slate-400"
              type="text"
              placeholder="Please enter your name"
              name="name"
              autoComplete="off"
            />
          </div>
          {/* Email */}
          <div
            className="flex min-h-[40px] w-full items-center gap-4 rounded border border-slate-600 bg-transparent px-4 py-2 focus-within:border-cyan-700 dark:border-slate-400 dark:focus-within:border-cyan-300"
            title="Please enter your email"
          >
            <EnvelopeIcon className="h-4 w-4 text-slate-900 dark:text-slate-100" />
            <input
              className="auto-complete-color w-full bg-transparent text-sm font-normal text-slate-900 placeholder:text-slate-600 focus-visible:border-none focus-visible:outline-none dark:text-slate-100 dark:placeholder:text-slate-400"
              type="email"
              placeholder="Please enter your email"
              name="email"
              autoComplete="off"
            />
          </div>
          {/* Message */}
          <div
            className="flex w-full items-start gap-4 rounded border border-slate-600 bg-transparent px-4 py-2 focus-within:border-cyan-700 dark:border-slate-400 dark:focus-within:border-cyan-300"
            title="Please enter your message"
          >
            <PencilIcon className="h-4 w-4 text-slate-900 dark:text-slate-100" />
            <textarea
              className="min-h-[200px] w-full resize-none overflow-hidden bg-transparent text-sm font-normal text-slate-900 placeholder:text-slate-600 focus-visible:border-none focus-visible:outline-none dark:text-slate-100 dark:placeholder:text-slate-400"
              placeholder="Please enter your message"
              name="message"
              onInput={handleAutoResize}
              autoComplete="off"
            />
          </div>
          {/* Submit */}
          <button
            type="submit"
            className="h-[40px] w-full rounded bg-gradient-to-br from-slate-600/40 to-slate-600/0 px-4 py-2 text-sm font-normal text-slate-900 hover:from-slate-600/50 hover:to-slate-600/10 focus:outline-none dark:from-slate-400/40 dark:to-slate-400/0 dark:text-slate-100 dark:hover:from-slate-400/50 dark:hover:to-slate-400/10"
          >
            Send
          </button>
        </form>
      </SimpleBar>
    </div>
  );
};

export default Contact;
