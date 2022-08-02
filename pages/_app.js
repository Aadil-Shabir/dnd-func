import { useState, useEffect } from 'react';
import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../context/AuthContext';
import { ToolstringProvider } from '../context/ToolstringContext';

function MyApp({ Component, pageProps }) {
  const [showing, setShowing] = useState(false);
  useEffect(() => {
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <AuthProvider>
        <ToolstringProvider>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </ToolstringProvider>
      </AuthProvider>
    );
  }
}

export default MyApp;
