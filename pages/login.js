import { useState, useContext } from 'react';
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
  Icon,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';

export default function login() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState('');

  const {
    handleSubmit,
    register,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const watchEmail = watch('email');
  const watchPassword = watch('password');

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

  const handleLogin = ({ email, password }) => {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          router.push('/user/main');
        })
        .then(() => reset());
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  const handleSendPasswordResetEmail = () => {
    try {
      sendPasswordResetEmail(auth, email, {
        url: 'http://localhost:3000/user/dashboard',
      }).then(() => {
        toast({
          position: 'top-right',
          title: `Password reset email sent`,
          description: 'Follow the link to verify your email address.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  const formBg = useColorModeValue('gray.300', 'gray.900');

  return (
    <Flex w='100vw' h='100vh' justify='center' align='center'>
      <form onSubmit={handleSubmit(handleLogin)} autoComplete='off'>
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
            <Text fontSize='2xl'>Log in</Text>
          </Flex>
          <Flex w='full'>
            <Button mb={3} onClick={handleGoogleLogin} size='sm' w='full'>
              <Icon as={FcGoogle} w={6} h={6} />
              <Text ml={3}>Log in with Google</Text>
            </Button>
          </Flex>

          <Text mb={3} textAlign='center' fontSize='xs'>
            OR
          </Text>
          <Flex w='full' justify='start' my={1}>
            <Input
              type='email'
              placeholder='Email'
              {...register('email', {
                required: true,
                onChange: (e) => setEmail(e.target.value),
              })}
              size='sm'
              borderRadius='6px'
              variant='filled'
            />
          </Flex>
          <Flex w='full' justify='start' my={1}>
            <Input
              type='password'
              placeholder='Password'
              {...register('password', {
                required: true,
              })}
              size='sm'
              borderRadius='6px'
              variant='filled'
            />
          </Flex>
          <Flex w='full' justify='end' my={1}>
            <Flex>
              <Text fontSize='xs'>Forgot password?</Text>
            </Flex>
            <Flex ml={3} cursor='pointer'>
              <Text
                fontSize='xs'
                color='blue.500'
                onClick={handleSendPasswordResetEmail}
              >
                Click here
              </Text>
            </Flex>
          </Flex>
          <Flex w='full' mt={3}>
            <Button
              w='full'
              colorScheme='blue'
              type='submit'
              isDisabled={!watchEmail || !watchPassword}
              size='sm'
            >
              Log in
            </Button>
          </Flex>
          <Flex w='full' justify='start' my={2}>
            <Flex mr={3}>
              <Text fontSize='xs'>Not registered yet?</Text>
            </Flex>
            <Flex cursor='pointer'>
              <Text
                color='blue.500'
                fontSize='xs'
                onClick={() => router.push('/register')}
              >
                Register
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}
