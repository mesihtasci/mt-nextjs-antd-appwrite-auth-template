import React from 'react';
import { Models } from 'appwrite';

interface AppContextInterface {
  getCurrentUser: Function;
  authUser: Models.Preferences | null;
  setAuthUser: Function;
  userUpdated: Boolean;
}

const AuthUserContext = React.createContext<AppContextInterface | null>(null);

export default AuthUserContext;
