import { useState, useContext, useRef, useEffect } from 'react';
import {
  Flex,
  Text,
  Button,
  IconButton,
  CloseButton,
  Input,
  Checkbox,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';

export default function register() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState('inside');
  const btnRef = useRef(null);
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    try {
      const user = auth.currentUser;
      return signInWithPopup(auth, provider).then(({ user }) => {
        setCurrentUser(user);
        router.push(`/user/main`);
      });
    } catch (error) {
      const errorCode = error.code;
      toast({
        title: errorCode,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEmailRegister = async ({ email, password }) => {
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          console.log('user', user);
        })
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser, {
            url: 'http://localhost:3000/',
          });
        })
        .then(() => {
          toast({
            position: 'top-right',
            title: `Verification link sent`,
            description: 'Please verify your email address.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        })
        .then(() => reset());
    } catch (error) {
      const errorCode = error.code;
      toast({
        title: errorCode,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const watchAccept = watch('acceptedTerms');
  const formBg = useColorModeValue('gray.300', 'gray.900');

  useEffect(() => {
    setShowTermsAndConditions(watchAccept);
    console.log(watchAccept);
  }, [watchAccept]);

  return (
    <Flex w='100vw' h='100vh' justify='center' align='center'>
      <form onSubmit={handleSubmit(handleEmailRegister)} autoComplete='off'>
        <Flex
          w='300px'
          h='360px'
          bg={formBg}
          align='center'
          p={3}
          flexDirection='column'
          borderRadius='6px'
        >
          <Flex w='full' justify='end'>
            <CloseButton size='sm' onClick={() => router.replace('/')} />
          </Flex>
          <Flex w='full' justify='start' mb={3}>
            <Text fontSize='2xl'>Register</Text>
          </Flex>
          <Flex w='full'>
            <Button mb={3} onClick={handleGoogleLogin} size='sm' w='full'>
              <Icon as={FcGoogle} w={6} h={6} />
              <Text ml={3}>Register with Google</Text>
            </Button>
          </Flex>

          <Text mb={3} textAlign='center' fontSize='xs'>
            OR
          </Text>

          <Flex w='full' justify='start' my={1}>
            <Input
              variant='filled'
              type='email'
              placeholder='Email'
              {...register('email', {
                required: true,
                onChange: (e) => setEmail(e.target.value),
              })}
              size='sm'
              borderRadius='6px'
            />
          </Flex>
          <Flex w='full' justify='start' my={1}>
            <Input
              variant='filled'
              type='password'
              placeholder='Password'
              {...register('password', {
                required: true,
              })}
              size='sm'
              borderRadius='6px'
            />
          </Flex>
          <Flex w='full' justify='start' my={1}>
            <Flex mr={3}>
              <Checkbox
                isChecked={showTermsAndConditions || acceptedTerms}
                onChange={() => setShowTermsAndConditions(true)}
              />
            </Flex>
            <Flex>
              <Text fontSize='xs'>Accept terms and conditions</Text>
            </Flex>
          </Flex>
          <Flex w='full' mt={3}>
            <Button
              w='full'
              colorScheme='blue'
              type='submit'
              isDisabled={!acceptedTerms}
              size='sm'
            >
              Register
            </Button>
          </Flex>
          <Flex w='full' justify='start' my={2}>
            <Flex mr={3}>
              <Text fontSize='xs'>Already registered?</Text>
            </Flex>
            <Flex cursor='pointer'>
              <Text
                fontSize='xs'
                color='blue.500'
                onClick={() => router.push('/login')}
              >
                Log in
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Modal
          finalFocusRef={btnRef}
          isOpen={showTermsAndConditions}
          scrollBehavior={scrollBehavior}
        >
          <ModalOverlay />
          <ModalContent>
            <Flex w='full' align='center' justify='space-between' p={5}>
              <Text>Terms and Conditions</Text>
              <CloseButton
                size='sm'
                onClick={() => setShowTermsAndConditions(false)}
              />
            </Flex>
            <ModalBody>text</ModalBody>
            <ModalFooter>
              <Flex w='full' justify='space-between'>
                <Button
                  size='sm'
                  onClick={() => {
                    setAcceptedTerms(false);
                    setShowTermsAndConditions(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size='sm'
                  colorScheme='blue'
                  onClick={() => {
                    setAcceptedTerms(true);
                    setShowTermsAndConditions(false);
                  }}
                >
                  I accept
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </Flex>
  );
}
