import { Models } from 'appwrite';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { notification } from 'antd';
import AuthUserContext from '../../../context/authentication/AuthUserContext';
import { AppwriteContext } from '../appwrite/Appwrite';
import SliderLayout from '../../slider-layout/SliderLayout';
import { useRouter } from 'next/router';

const Authentication = (Component: any) =>
  function WithAuthentication(props: JSX.IntrinsicAttributes) {
    const [authUser, setAuthUser] = useState<Models.Preferences | null>(null);
    const [userUpdated, setUserUpdated] = useState(false);
    const router = useRouter();

    const appwrite = useContext(AppwriteContext);

    const getCurrentUser = useCallback(async () => {
      try {
        const user = await appwrite?.account.get();

        if (user) {
          setAuthUser(user);
          setUserUpdated(true);
        }
      } catch (e) {
        setAuthUser(null);
        setUserUpdated(true);
        if (!(router.pathname.includes('sign-in') || router.pathname.includes('sign-up') || router.pathname.includes('forgot-password')))
          router.push('/sign-in');
      }
    }, [appwrite]);

    useEffect(() => {
      getCurrentUser();
    }, [getCurrentUser]);

    useEffect(() => {
      const verifyUser = async () => {
        if (authUser) {
          const { secret, userId } = router.query;
          if (!authUser.emailVerification && secret && userId) {
            try {
              await appwrite?.account.updateVerification(userId.toString(), secret.toString());
            } catch (e) {
              notification.error({
                message: `Verification error`,
                description: 'Invalid tokens were passed. Please request a new verification E-Mail.',
                placement: 'top',
                duration: 7,
              });
            }

            router.replace(
              {
                pathname: router.pathname,
                query: null,
              },
              undefined,
              { shallow: true },
            );
            getCurrentUser();
          }
        }
      };

      verifyUser();
    }, [authUser]);

    return (
      <AuthUserContext.Provider value={{ authUser, userUpdated, getCurrentUser, setAuthUser }}>
        <SliderLayout>
          <Component {...props} />
        </SliderLayout>
      </AuthUserContext.Provider>
    );
  };

export default Authentication;
