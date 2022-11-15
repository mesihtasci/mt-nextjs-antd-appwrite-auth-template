import React from 'react';
import Appwrite from '../../components/wrappers/appwrite/Appwrite';

const AppwriteContext = React.createContext<Appwrite | null>(null);

export default AppwriteContext;
