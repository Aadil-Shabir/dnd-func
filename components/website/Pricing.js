/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from '@heroicons/react/outline';

const tiers = [
  {
    name: 'Basic',
    href: '#',
    priceMonthly: 'Free',
    description:
      'Great for fishing specialists, consultants, and training purposes',
    features: [
      'Up to 5 users',
      'Unlimited reports',
      'Shared cloud database and storage',
      'One click print functionality',
      'Default PCE and downhole tools libraries ',
    ],
  },
  {
    name: 'Pro',
    href: '#',
    priceMonthly: 'Customized',
    description: 'All features included in FREE plan, plus many more',
    features: [
      'Unlimited users',
      'Unlimited reports',
      'Dashboard and notification center',
      'Dedicated cloud database and storage',
      'Integration with an existing corporate website',
      'Job planning tools',
      'PCE and toolstring builder',
      'Add custom inventory items',
      'Advanced reminders and notifications',
      'Data backup',
      'Inventory management and documentation storage',
      'Personnel data management',
    ],
  },
];

export default function Example() {
  return (
    <div className='bg-gray-900'>
      <div className='pt-12 sm:pt-16 lg:pt-24'>
        <div className='mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl space-y-2 lg:max-w-none'>
            <h2 className='text-lg font-semibold uppercase leading-6 tracking-wider text-gray-300'>
              Pricing
            </h2>
            {/* <p className='text-2xl font-extrabold text-white sm:text-4xl lg:text-3xl'>
              The right price for organization of any size
            </p> */}
            {/* <p className="text-xl text-gray-300">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum
              sequi unde repudiandae natus.
            </p> */}
          </div>
        </div>
      </div>
      <div
        className='mt-8 bg-gray-50 pb-12 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24'
        id='pricing'
      >
        <div className='relative'>
          <div className='absolute inset-0 h-3/4 bg-gray-900' />
          <div className='relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-md space-y-4 lg:grid lg:max-w-5xl lg:grid-cols-2 lg:gap-5 lg:space-y-0'>
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className='flex flex-col overflow-hidden rounded-lg shadow-lg'
                >
                  <div className='bg-white px-6 py-8 sm:p-10 sm:pb-6'>
                    <div>
                      <h3
                        className='inline-flex rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-gray-100'
                        id='tier-standard'
                      >
                        {tier.name}
                      </h3>
                    </div>
                    <div className='mt-4 flex items-baseline text-3xl font-extrabold text-gray-900'>
                      {tier.priceMonthly}
                    </div>
                    <p className='mt-5 text-lg text-gray-500'>
                      {tier.description}
                    </p>
                  </div>
                  <div className='flex flex-1 flex-col justify-between space-y-6 bg-gray-50 px-6 pt-6 pb-8 sm:p-10 sm:pt-6'>
                    <ul role='list' className='space-y-4'>
                      {tier.features.map((feature) => (
                        <li key={feature} className='flex items-start'>
                          <div className='flex-shrink-0'>
                            <CheckIcon
                              className='h-6 w-6 text-blue-600'
                              aria-hidden='true'
                            />
                          </div>
                          <p className='ml-3 text-base text-gray-700'>
                            {feature}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <div className='rounded-md shadow'>
                      {tier.name === 'Basic' && (
                        <a
                          href={tier.href}
                          className='flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-700'
                          aria-describedby='tier-standard'
                        >
                          Get started
                        </a>
                      )}
                      {tier.name === 'Pro' && (
                        <a
                          href={tier.href}
                          className='flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-700'
                          aria-describedby='tier-standard'
                        >
                          Contact sales
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
