/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from '@heroicons/react/outline';

const features = [
  {
    name: 'Data Dashboard',
    description:
      'Get instant notifications about submitted field reports, expired equipment and due certifications',
  },
  {
    name: 'Notifications',
    description:
      'Store the documentation and get automatic notifications about equipment status',
  },
  {
    name: 'Instant report printing',
    description:
      'Create, store and easily print the advanced field reports from anywhere',
  },
  {
    name: 'Manage inventory',
    description: 'Your complete inventory management tools in one platform',
  },
  {
    name: 'Manage personnel data',
    description:
      'Always keep your personnel certificates up-to-date with automatic reminders ',
  },
  {
    name: 'Job planning',
    description:
      'Simplified and efficient process of job planning and information sharing',
  },
  {
    name: 'Documentation Storage',
    description:
      'Keep your important information in the safe, fast and scalable cloud data storage',
  },
  {
    name: 'Worldwide access',
    description:
      'Get an instant and synchronized data with any team anywhere in the world',
  },
];

export default function Example() {
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-24 lg:px-8'>
        <div className='mx-auto max-w-3xl text-center' id='features'>
          <h2 className='text-3xl font-extrabold text-gray-900'>
            All-in-one platform
          </h2>
          <p className='mt-4 text-lg text-gray-500'>
            Advanced data analytics and simplified reporting
          </p>
        </div>
        <dl className='mt-12 space-y-10 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-4 lg:gap-x-8'>
          {features.map((feature) => (
            <div key={feature.name} className='relative'>
              <dt>
                <CheckIcon
                  className='absolute h-6 w-6 text-blue-600'
                  aria-hidden='true'
                />
                <p className='ml-9 text-lg font-medium leading-6 text-gray-900'>
                  {feature.name}
                </p>
              </dt>
              <dd className='mt-2 ml-9 text-base text-gray-500'>
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
