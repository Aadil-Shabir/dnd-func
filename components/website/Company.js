/* This example requires Tailwind CSS v2.0+ */
import { ExternalLinkIcon } from '@heroicons/react/solid';

export default function Company() {
  return (
    <div className='relative mx-auto max-w-6xl bg-gray-800'>
      <div
        className='h-56 bg-blue-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2'
        id='company'
      >
        <img
          className='h-full w-full object-cover'
          src='https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply'
          alt=''
        />
      </div>
      <div className='relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16'>
        <div className='md:ml-auto md:w-1/2 md:pl-10'>
          <h2 className='text-base font-semibold uppercase tracking-wider text-gray-300'>
            Software Development as a Service
          </h2>
          <div className='flex items-center'>
            <p className='mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl'>
              We’re from Ukraine
            </p>
            <img className='w-10 mt-3 ml-3' src='/flag.svg' />
          </div>

          <p className='mt-3 text-lg text-gray-300'>
            We build modern, fast and scalable web applications that transform
            businesses. Oil and gas is our main focus since some of our team
            members have many years of experience in well services
          </p>
          <div className='mt-8'>
            <div className='inline-flex rounded-md shadow'>
              <a
                href='https://abilonsoftware.com'
                target='_blank'
                className='inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-gray-900 hover:bg-gray-50'
              >
                Visit the website
                <ExternalLinkIcon
                  className='-mr-1 ml-3 h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
