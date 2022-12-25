/* eslint-disable react/jsx-props-no-spreading */
import {
  EnvelopeIcon,
  ExclamationCircleIcon,
  PencilIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import React, { type ChangeEvent, type FunctionComponent } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { type ErrorOption } from 'react-hook-form/dist/types';
import SimpleBar from 'simplebar-react';
import { FormSchema, type IFormScheme } from '../types';
import { clg } from '../utils';

const Contact: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<IFormScheme>({
    resolver: zodResolver(FormSchema),
  });

  // Handle submit
  const onSubmit: SubmitHandler<IFormScheme> = async (data) => {
    // Send data to server
    await fetch('/api/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      // Resolve response
      .then(async (res) => ({
        status: res.status,
        ok: res.ok,
        data: await res.json(),
      }))
      // Handle response
      .then((_data) => {
        if (!_data.ok) {
          const error: ErrorOption = { type: 'server', message: _data.data.error };
          setError('name', error);
          setError('email', error);
          setError('message', error);
        }
      })
      // Handle error
      .catch((err) => {
        const error: ErrorOption = {
          type: 'server',
          message: err.message || 'Something went wrong',
        };
        setError('name', error);
        setError('email', error);
        setError('message', error);
      });
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
        <AnimatePresence mode="wait">
          {!isSubmitSuccessful ? (
            <motion.form
              key="form-key"
              className="mb-4 flex flex-col gap-8 overflow-hidden"
              initial={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Name */}
              <div
                className={clg(
                  'flex min-h-[40px] w-full items-center gap-4 rounded border bg-transparent px-4 py-2 transition-colors duration-300',
                  {
                    'border-red-600 dark:border-red-400': errors.name !== undefined,
                    'border-slate-600 focus-within:border-cyan-700 dark:border-slate-400 dark:focus-within:border-cyan-300':
                      errors.name === undefined,
                  }
                )}
                title="Please enter your name"
              >
                <UserIcon className="h-4 w-4 text-slate-900 dark:text-slate-100" />
                <input
                  className="w-full bg-transparent text-sm font-normal text-slate-900 placeholder:text-slate-600 focus-visible:border-none focus-visible:outline-none dark:text-slate-100 dark:placeholder:text-slate-400"
                  type="text"
                  placeholder="Please enter your name"
                  autoComplete="off"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  {...register('name')}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <div role="alert" aria-label={errors.name.message}>
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-600 dark:text-red-400"
                      title={errors.name.message}
                    />
                  </div>
                )}
              </div>
              {/* Email */}
              <div
                className={clg(
                  'flex min-h-[40px] w-full items-center gap-4 rounded border bg-transparent px-4 py-2 transition-colors duration-300',
                  {
                    'border-red-600 dark:border-red-400': errors.email !== undefined,
                    'border-slate-600 focus-within:border-cyan-700 dark:border-slate-400 dark:focus-within:border-cyan-300':
                      errors.email === undefined,
                  }
                )}
                title="Please enter your email"
              >
                <EnvelopeIcon className="h-4 w-4 text-slate-900 dark:text-slate-100" />
                <input
                  className="w-full bg-transparent text-sm font-normal text-slate-900 placeholder:text-slate-600 focus-visible:border-none focus-visible:outline-none dark:text-slate-100 dark:placeholder:text-slate-400"
                  type="text"
                  placeholder="Please enter your email"
                  autoComplete="off"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  {...register('email')}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <div role="alert" aria-label={errors.email.message}>
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-600 dark:text-red-400"
                      title={errors.email.message}
                    />
                  </div>
                )}
              </div>
              {/* Message */}
              <div
                className={clg(
                  'flex w-full items-start gap-4 rounded border bg-transparent px-4 py-2 transition-colors duration-300',
                  {
                    'border-red-600 dark:border-red-400': errors.message !== undefined,
                    'border-slate-600 focus-within:border-cyan-700 dark:border-slate-400 dark:focus-within:border-cyan-300':
                      errors.message === undefined,
                  }
                )}
                title="Please enter your message"
              >
                <PencilIcon className="h-4 w-4 text-slate-900 dark:text-slate-100" />
                <textarea
                  className="min-h-[200px] w-full resize-none overflow-hidden bg-transparent text-sm font-normal text-slate-900 placeholder:text-slate-600 focus-visible:border-none focus-visible:outline-none dark:text-slate-100 dark:placeholder:text-slate-400"
                  placeholder="Please enter your message"
                  onInput={handleAutoResize}
                  autoComplete="off"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  {...register('message')}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <div role="alert" aria-label={errors.message.message}>
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-600 dark:text-red-400"
                      title={errors.message.message}
                    />
                  </div>
                )}
              </div>
              {/* Submit */}
              <button
                type="submit"
                className="h-[40px] w-full rounded bg-gradient-to-br from-slate-600/40 to-slate-600/0 px-4 py-2 text-sm font-normal text-slate-900 focus:outline-none enabled:hover:from-slate-600/50 enabled:hover:to-slate-600/10 dark:from-slate-400/40 dark:to-slate-400/0 dark:text-slate-100 dark:enabled:hover:from-slate-400/50 dark:enabled:hover:to-slate-400/10"
                disabled={isSubmitting}
              >
                Send
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="adsadada"
              initial={{ transform: 'scale(0)', opacity: 0 }}
              animate={{ transform: 'scale(1)', opacity: 1 }}
              exit={{ transform: 'scale(0)', opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative flex justify-center rounded bg-gradient-to-br from-green-400/60 to-green-400/20 p-4 dark:from-green-600/60 dark:to-green-600/20"
            >
              <p role="alert" className="text-slate-900 dark:text-slate-100">
                Your message successfully submitted.
              </p>
              <button
                className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 rounded-full dark:hover:bg-green-600/50"
                type="button"
                title="Back to contact form."
                onClick={() => reset()}
              >
                <XMarkIcon />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </SimpleBar>
    </div>
  );
};

export default Contact;
