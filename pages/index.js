import Head from 'next/head';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
  AnnotationIcon,
  ChatAlt2Icon,
  InboxIcon,
  MenuIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Icon } from '@chakra-ui/react';
import Apps from '../components/website/Apps';
import Pricing from '../components/website/Pricing';
import Features from '../components/website/Features';
import Company from '../components/website/Company';
import Footer from '../components/website/Footer';
import NextLink from 'next/link';
import {
  FaMapMarkerAlt,
  FaHardHat,
  FaTools,
  FaCloudUploadAlt,
  FaChartBar,
} from 'react-icons/fa';
import { BsCloudCheck } from 'react-icons/bs';
import { Link } from 'react-scroll';
import { animateScroll as scroll } from 'react-scroll';

const BopIcon = (props) => (
  <Icon viewBox='0 0 200 200' {...props} boxSize={8}>
    <svg
      width='100%'
      height='100%'
      viewBox='0 0 186 132'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M178.486 86.4689H150.479V89.4611H178.486V86.4689Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M178.486 64.1402H150.479V67.1315H178.486V64.1402Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M178.486 41.8115H150.479V44.8019H178.486V41.8106V41.8115Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M185 67.1315V86.4689H183.733V67.1315H185Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M185 44.8019V64.1402H183.733V44.8019H185Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M183.733 74.6601H179.143V78.9412H183.733V74.6601Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M183.733 52.3315H179.143V56.6116H183.733V52.3315Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M179.143 78.9412V79.5508C178.355 80.264 177.914 80.6682 177.135 81.3908H162.023V72.2106H177.135C177.914 72.9332 178.355 73.3364 179.143 74.0591V78.9403V78.9412Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M179.143 56.6116V57.2212C178.355 57.9353 177.914 58.3385 177.135 59.0612H162.023V49.8819H177.135C177.914 50.6036 178.355 51.0078 179.143 51.7285V56.6126V56.6116Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M162.024 81.3908V82.722H149.353V70.8793H162.024V81.3898V81.3908Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M162.024 59.0602V60.3924H149.353V48.5497H162.024V59.0602Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M150.479 89.4611V91.0081H149.353V84.9219H150.479V89.4611Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M150.479 67.1315V68.6785H149.353V62.5923H150.479V67.1315Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M150.479 44.8019V46.3489H149.353V40.2636H150.479V44.8019V44.8019Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M149.353 91.0081V92.2706H143.355V39.0012H149.353V91.0091V91.0081Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M143.355 84.9229V91.0081H133.81V84.9219H143.355V84.9229Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M143.355 70.8793H142.032V82.722H143.355V70.8793Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M143.355 62.5932V68.6785H133.81V62.5923H143.355V62.5932Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M143.355 48.5488H142.032V60.3933H143.355V48.5478V48.5488Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M143.355 40.2636V46.3489H133.81V40.2636H143.355V40.2636Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M142.032 82.723V82.8087L139.723 84.9229H133.81V68.6785H139.723L142.032 70.7927V82.723Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M142.032 60.3933V60.4791L139.723 62.5932H133.81V46.3489H139.723L142.032 48.463V60.3933Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M133.81 84.9229V94.4978C133.81 95.6369 133.315 96.7307 132.436 97.5362C131.555 98.3417 130.361 98.7949 129.117 98.7949H56.8834C55.6388 98.7949 54.4449 98.3417 53.5655 97.5362C52.6851 96.7307 52.1904 95.6369 52.1904 94.4978V36.7739C52.1904 35.634 52.6851 34.5411 53.5655 33.7355C54.4449 32.9291 55.6388 32.4769 56.8834 32.4769H129.117C130.361 32.4769 131.555 32.9291 132.436 33.7355C133.315 34.5411 133.81 35.634 133.81 36.7739V84.9238V84.9229Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M104.864 98.7949H81.1926V112.091H104.864V98.7949Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M104.864 19.8503H81.1926V32.4768H104.864V19.8503Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M52.1904 84.9229V91.0081H42.645V84.9219H52.1904V84.9229Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M52.1903 68.6785V84.9238H46.2772L43.9683 82.8096V70.7927L46.2772 68.6785H52.1903Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M52.1904 62.5932V68.6785H42.645V62.5923H52.1904V62.5932Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M52.1903 46.3489V62.5932H46.2772L43.9683 60.4791V48.463L46.2772 46.3489H52.1903Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M52.1904 40.2636V46.3489H42.645V40.2636H52.1904V40.2636Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M43.9684 70.8793H42.645V82.722H43.9684V70.8793Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M43.9684 48.5488H42.645V60.3933H43.9684V48.5478V48.5488Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M42.6449 91.0081V92.2706H36.6473V39.0012H42.6449V91.0091V91.0081Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M36.6474 84.9229V91.0081H35.5211V84.9229H36.6474Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M36.6475 70.8784V82.723H23.9766V70.8774H36.6475V70.8784Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M36.6474 62.5932V68.6785H35.5211V62.5932H36.6474Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M36.6475 48.5488V60.3924H23.9766V48.5488H36.6475Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M36.6474 40.2636V46.3489H35.5211V40.2636H36.6474V40.2636Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M35.5211 86.4689H7.51379V89.4611H35.5211V86.4689Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M35.5211 64.1402H7.51379V67.1315H35.5211V64.1402Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M35.5211 41.8115H7.51379V44.8019H35.5211V41.8106V41.8115Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M23.9766 72.2106V81.3908H8.86538C8.08636 80.6691 7.64522 80.2649 6.85681 79.5517V74.0591C7.64522 73.3374 8.08636 72.9341 8.86538 72.2125H23.9766V72.2106Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M23.9766 49.881V59.0621H8.86538C8.08636 58.3395 7.64522 57.9362 6.85681 57.2221V51.7294C7.64522 51.0087 8.08636 50.6045 8.86538 49.8828H23.9766V49.881Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.85677 74.6601H2.26709V78.9412H6.85677V74.6601Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.85677 52.3315H2.26709V56.6116H6.85677V52.3315Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.26709 74.6601V86.4699H1V67.1315H2.26709V74.6601Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.26709 52.3305V64.1402H1V44.8019H2.26709V52.3305Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M105.994 13.538V15.0511H80.0691V13.5389L80.3413 13.2035H105.722L105.994 13.5389V13.538Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M105.991 15.0548L104.864 19.8503H81.1925L80.0671 15.0548H105.991Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M106.632 9.42084L105.722 9.96351H80.3413L79.4187 9.42178L80.3413 8.88005H105.722L106.632 9.42178V9.42084Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M106.632 10.5043L105.722 11.0375H80.3413L79.4187 10.5043L80.3413 9.9635H105.722L106.632 10.5043Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M106.632 11.5783L105.722 12.1201H80.3413L79.4187 11.5793L80.3413 11.0376H105.722L106.632 11.5793V11.5783Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M106.632 12.6618L105.722 13.2035H80.3413L79.4187 12.6618L80.3413 12.1201H105.722L106.632 12.6618Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M106.638 6.17234L105.721 6.70936H80.3413L79.4243 6.17234L80.3413 5.63344H105.721L106.638 6.17234V6.17234Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M106.638 7.25391L105.721 7.80977H80.3413L79.4243 7.25391L80.3413 6.70935H105.721L106.638 7.25391V7.25391Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M106.632 8.33831L105.722 8.88004H80.3413L79.4187 8.33831L80.3413 7.806H105.722L106.632 8.33831Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M106.638 5.09454L105.721 5.63344H80.3413L79.4243 5.09454L80.3413 4.55563H105.721L106.638 5.09454V5.09454Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M104.322 2.91254H81.7399L82.135 1H103.926L104.322 2.91254Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M105.721 4.55563H80.3413L81.7398 2.91254H104.322L105.721 4.55563V4.55563Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M108.046 112.091H78.0109V131H108.046V112.091Z'
        fill='#FDFDFD'
        stroke='black'
        strokeWidth='0.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  </Icon>
);

const solutions = [
  {
    name: 'PCE & Toolstring Diagrams',
    description: 'Vast pool of conventional tools ready for drag and drop',
    href: 'apps',
    icon: BopIcon,
  },
  {
    name: 'Asset Management & HR Tools ',
    description: 'Advanced reminders and expiry date notifications',
    href: 'apps',
    icon: FaTools,
  },
  {
    name: 'Advanced Reporting',
    description: 'Complete data management with one click print functionality',
    href: 'apps',
    icon: FaChartBar,
  },
  {
    name: 'Cloud Database & Storage',
    description: 'Modern, fast, and secure cloud solutions',
    href: 'apps',
    icon: FaCloudUploadAlt,
  },
];
const navigation = [
  { name: 'Pricing', href: 'pricing' },
  { name: 'Features', href: 'features' },
  { name: 'Company', href: 'company' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const Home = () => {
  return (
    <div className='bg-white'>
      <header>
        <Popover className='relative bg-white'>
          <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8'>
            <div className='flex justify-start lg:w-0 lg:flex-1'>
              <a href='#'>
                <span className='sr-only'>Workflow</span>
                <img className='h-8 w-auto sm:h-10' src='/logo.svg' alt='' />
              </a>
            </div>
            <div className='-my-2 -mr-2 md:hidden'>
              <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'>
                <span className='sr-only'>Open menu</span>
                <MenuIcon className='h-6 w-6' aria-hidden='true' />
              </Popover.Button>
            </div>
            menu here
            <div className='hidden items-center justify-end md:flex md:flex-1 lg:w-0'>
              <NextLink href='/login'>
                <a className='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900'>
                  Log in
                </a>
              </NextLink>
              <NextLink href='/register'>
                <a className='ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700'>
                  Register
                </a>
              </NextLink>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter='duration-200 ease-out'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='duration-100 ease-in'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Popover.Panel
              focus
              className='absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition md:hidden'
            >
              <div className='divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
                <div className='px-5 pt-5 pb-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <img
                        className='h-8 w-auto'
                        src='logo.svg'
                        alt='wireline master logo'
                      />
                    </div>
                    <div className='-mr-2'>
                      <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'>
                        <span className='sr-only'>Close menu</span>
                        <XIcon className='h-6 w-6' aria-hidden='true' />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className='mt-6'>
                    <nav className='grid grid-cols-1 gap-7'>
                      {solutions.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className='-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50'
                        >
                          <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-blue-600 text-white'>
                            <item.icon className='h-6 w-6' aria-hidden='true' />
                          </div>
                          <div className='ml-4 text-base font-medium text-gray-900'>
                            {item.name}
                          </div>
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className='py-6 px-5'>
                  <div className='grid grid-cols-2 gap-4'>
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className='text-base font-medium text-gray-900 hover:text-gray-700'
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className='mt-6'>
                    <NextLink href='/register'>
                      <a className='flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700'>
                        Register
                      </a>
                    </NextLink>
                    <p className='mt-6 text-center text-base font-medium text-gray-500'>
                      Existing customer?{' '}
                      <NextLink href='/login'>
                        <a className='text-gray-900'>Log in</a>
                      </NextLink>
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </header>

      <main></main>
    </div>
  );
};

export default Home;
