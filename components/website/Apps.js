/* This example requires Tailwind CSS v2.0+ */
import {
  CloudUploadIcon,
  CogIcon,
  LockClosedIcon,
  RefreshIcon,
  ServerIcon,
  ShieldCheckIcon,
} from '@heroicons/react/outline';
import {
  FaMapMarkerAlt,
  FaHardHat,
  FaTools,
  FaCloudUploadAlt,
  FaChartBar,
} from 'react-icons/fa';
import { BsFillFileEarmarkPlusFill } from 'react-icons/bs';
import { Icon } from '@chakra-ui/react';
import { MdDashboard } from 'react-icons/md';

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
const ToolstringIcon = (props) => (
  <Icon viewBox='0 0 200 200' {...props} boxSize={8}>
    <svg
      width='100%'
      height='100%'
      viewBox='0 0 30 100'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.53978 88.7206L8.58359 81.4131C8.58359 81.4131 6.67848 87.6641 2.53978 92.5505V88.7206Z'
        fill='white'
      />
      <path
        d='M27.4596 91.7973V95.6271C23.3209 90.7408 21.4158 84.4897 21.4158 84.4897L27.4596 91.7973Z'
        fill='white'
      />
      <path
        d='M27.4596 73.1862V77.016C23.3209 72.1297 21.4158 65.8787 21.4158 65.8787L27.4596 73.1862Z'
        fill='white'
      />
      <path
        d='M2.53978 70.1046L8.58359 62.7971C8.58359 62.7971 6.67848 69.0481 2.53978 73.9345V70.1046Z'
        fill='white'
      />
      <path
        d='M2.53978 51.4936L8.58359 44.186C8.58359 44.186 6.67848 50.437 2.53978 55.3234V51.4936Z'
        fill='white'
      />
      <path
        d='M27.4596 54.5702V58.4001C23.3209 53.5137 21.4158 47.2627 21.4158 47.2627L27.4596 54.5702Z'
        fill='white'
      />
      <path
        d='M30 42.8948V100L27.4599 97.2756V95.6272V91.7974V77.0161V73.1862V58.4V54.5701V42.8948H27.5255H30Z'
        fill='white'
      />
      <path
        d='M2.54015 92.5507V97.2756L0 100V42.8948H2.47446H2.54015V51.4935V55.3234V70.1047V73.9346V88.7208V92.5507Z'
        fill='white'
      />
      <path
        d='M18.1971 42.9534V97.5397L16.073 99.8288H15.1168H14.8832H13.927L11.8029 97.5397V42.9534H14.8832H15.1168H18.1971Z'
        fill='white'
      />
      <path
        d='M25.489 36.908L30 42.8948H27.5255L23.4525 38.3753L20.6934 36.908H25.489Z'
        fill='white'
      />
      <path
        d='M9.3066 36.908L6.54747 38.3753L2.47446 42.8948H0L4.51096 36.908H9.3066Z'
        fill='white'
      />
      <path
        d='M20.6935 36.908L18.1971 38.2873V42.9535H15.1168H14.8833H11.803V38.2873L9.30659 36.908H20.6935Z'
        fill='white'
      />
      <path
        d='M25.4891 28.1624V36.9079H20.6934H9.30655H4.51091V28.1624H25.4891Z'
        fill='white'
      />
      <path
        d='M25.4891 28.1621H4.51091L10.1606 24.4644H19.8394L25.4891 28.1621Z'
        fill='white'
      />
      <path
        d='M20.1051 7.24683H9.88612V24.3662H20.1051V7.24683Z'
        fill='white'
      />
      <path
        d='M11.6934 6.03418H18.3066L19.8394 7.26677H10.1606L11.6934 6.03418Z'
        fill='white'
      />
      <path
        d='M18.3063 4.30298H11.6931V6.03448H18.3063V4.30298Z'
        fill='white'
      />
      <path
        d='M11.8723 3.80835H15.0001H18.1271H18.1307H18.3066V4.28916V4.30286H18.192H11.8074H11.6935V4.28916V3.80835H11.8687H11.8723Z'
        fill='white'
      />
      <path
        d='M15 3.80823H11.8722V3.21834L12.2065 3.02954H15H17.7927L18.127 3.21834V3.80823H15Z'
        fill='white'
      />
      <path
        d='M17.8008 2.42065L18.2248 2.72636L17.8008 3.02961H17.7927H15H12.2066H12.1985L11.7788 2.72636L12.1985 2.42065H15H17.8008Z'
        fill='white'
      />
      <path
        d='M17.8007 1.81665L18.2248 2.11746L17.8007 2.42072H14.9999H12.1985L11.7744 2.11746L12.1985 1.81665H14.9999H17.8007Z'
        fill='white'
      />
      <path
        d='M18.2248 1.51347L17.8007 1.81672H14.9999H12.1985L11.7744 1.51347L12.1985 1.20776H14.9999H17.8007L18.2248 1.51347Z'
        fill='white'
      />
      <path
        d='M17.8007 0.601074L18.2248 0.906777L17.8007 1.20759H14.9999H12.1985L11.7744 0.906777L12.1985 0.601074H14.9999H17.8007Z'
        fill='white'
      />
      <path
        d='M17.8007 0L18.2248 0.300323L17.8007 0.601134H14.9999H12.1985L11.7744 0.300323L12.1985 0H14.9999H17.8007Z'
        fill='white'
      />
      <path
        d='M20.8351 5.77954H9.15619V7.73604H20.8351V5.77954Z'
        fill='white'
      />
    </svg>
  </Icon>
);

const features = [
  {
    name: 'Inventory Manager',
    description: 'Managing wireline inventory and documentation made easier',
    icon: FaTools,
  },
  {
    name: 'Toolstring Builder',
    description:
      'Save time building toolstring diagrams with an easy drag and drop functionality',
    icon: ToolstringIcon,
  },
  {
    name: 'PCE Builder',
    description: 'Configure, store and print your PCE stack in less time',
    icon: BopIcon,
  },
  {
    name: 'Field Report Builder',
    description:
      'Create, store, share and print wireline field reports with ease',
    icon: BsFillFileEarmarkPlusFill,
  },
  {
    name: 'Dashboard',
    description: 'All important data and notifications in a single dashboard',
    icon: MdDashboard,
  },
  {
    name: 'Personnel Manager',
    description: 'Get reminded about due certification and expiry dates',
    icon: FaHardHat,
  },
];

export default function Example() {
  return (
    <div className='relative bg-white py-16 sm:py-24 lg:py-24'>
      <div
        className='mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8'
        id='apps'
      >
        <h2 className='text-base font-semibold uppercase tracking-wider text-blue-600'>
          Well Intervention Apps
        </h2>
        <p className='mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
          Smart apps for progressive wireline companies
        </p>
        <p className='mx-auto mt-5 max-w-prose text-xl text-gray-500'></p>
        <div className='mt-12'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {features.map((feature) => (
              <div key={feature.name} className='pt-6'>
                <div className='flow-root rounded-lg bg-gray-50 px-6 pb-8'>
                  <div className='-mt-6'>
                    <div>
                      <span className='inline-flex items-center justify-center rounded-md bg-blue-500 p-3 shadow-lg'>
                        <feature.icon
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </span>
                    </div>
                    <h3 className='mt-8 text-lg font-medium tracking-tight text-gray-900'>
                      {feature.name}
                    </h3>
                    <p className='mt-5 text-base text-gray-500'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
