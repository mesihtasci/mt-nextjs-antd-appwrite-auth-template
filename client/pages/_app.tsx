import type { AppProps } from 'next/app';
import Appwrite, { AppwriteContext } from '../components/wrappers/appwrite/Appwrite';
import Authentication from '../components/wrappers/authentication/Authentication';
import 'antd/dist/antd.css';
import '../styles/vars.css';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  const AuthenticationWrapper = Authentication(Component);
  return (
    <AppwriteContext.Provider value={new Appwrite()}>
      <AuthenticationWrapper {...pageProps} />
    </AppwriteContext.Provider>
  );
}

export default MyApp;
