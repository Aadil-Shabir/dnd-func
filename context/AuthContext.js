import { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';
import PulseLoader from 'react-spinners/PulseLoader';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState(currentUser?.displayName);
  const [email, setEmail] = useState(currentUser?.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [userData, setUserData] = useState(null);
  const [corporateUsers, setCorporateUsers] = useState(null);
  const [showAvatarIcons, setShowAvatarIcons] = useState(false);
  const [color, setColor] = useState('#3182CE');

  console.log('user', currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      router.replace('/login');
    });
  };

  if (loading) {
    return (
      <Flex justify='center' alignItems='center' w='100vw' h='100vh'>
        <PulseLoader color={color} loading={loading} size={10} />
      </Flex>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loading,
        handleLogout,
        displayName,
        setDisplayName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        avatar,
        setAvatar,
        photoURL,
        setPhotoURL,
        userData,
        setUserData,
        corporateUsers,
        setCorporateUsers,
        showAvatarIcons,
        setShowAvatarIcons,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
