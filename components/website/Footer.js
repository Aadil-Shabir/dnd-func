import NextLink from 'next/link';

const navigation = {
  main: [
    { name: 'Term and Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Accessibility', href: '#' },
  ],
  social: [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/abilonsoftware/',
      icon: (props) => (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='48'
          height='48'
          viewBox='0 0 24 24'
          className='dark:text-gray-100 fill-current text-gray-500'
        >
          <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
        </svg>
      ),
    },

    {
      name: 'Twitter',
      href: 'https://twitter.com/AbilonSoftware',
      icon: (props) => (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='48'
          height='48'
          viewBox='0 0 24 24'
          className='dark:text-gray-100 fill-current text-gray-500'
        >
          <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-.139 9.237c.209 4.617-3.234 9.765-9.33 9.765-1.854 0-3.579-.543-5.032-1.475 1.742.205 3.48-.278 4.86-1.359-1.437-.027-2.649-.976-3.066-2.28.515.098 1.021.069 1.482-.056-1.579-.317-2.668-1.739-2.633-3.26.442.246.949.394 1.486.411-1.461-.977-1.875-2.907-1.016-4.383 1.619 1.986 4.038 3.293 6.766 3.43-.479-2.053 1.08-4.03 3.199-4.03.943 0 1.797.398 2.395 1.037.748-.147 1.451-.42 2.086-.796-.246.767-.766 1.41-1.443 1.816.664-.08 1.297-.256 1.885-.517-.439.656-.996 1.234-1.639 1.697z' />
        </svg>
      ),
    },
  ],
};

export default function Example() {
  return (
    <footer className='bg-white'>
      <div className='mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8'>
        <nav
          className='-mx-5 -my-2 flex flex-wrap justify-center'
          aria-label='Footer'
        >
          {navigation.main.map((item) => (
            <div key={item.name} className='px-5 py-2'>
              <a
                target='_blank'
                href={item.href}
                className='text-base text-gray-500 hover:text-gray-900'
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className='mt-8 flex justify-center space-x-6'>
          {navigation.social.map((item) => (
            <a
              target='_blank'
              key={item.name}
              href={item.href}
              className='text-gray-400 hover:text-gray-500'
            >
              <span className='sr-only'>{item.name}</span>
              <item.icon className='h-6 w-6' aria-hidden='true' />
            </a>
          ))}
        </div>
        <a href='https://abilonsoftware.com' target='_blank'>
          <p className='mt-8 text-center text-base text-gray-400'>
            &copy; 2022 Abilon Software, LLC. All rights reserved.
          </p>
        </a>
      </div>
    </footer>
  );
}
