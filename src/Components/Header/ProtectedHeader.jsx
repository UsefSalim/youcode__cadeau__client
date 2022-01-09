import React, { useContext } from 'react';
import { AuthContext } from 'Context/AuthContext';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import { Toast } from '@laazyry/sobrus-design-system';

const ProtectedHeader = () => {
  const location = useLocation();
  const { loading, error } = useContext(AuthContext);
  if (
    location.pathname === '/auth/login' ||
    location.pathname === '/' ||
    location.pathname === '/denied_access'
  )
    return null;
  if (loading === false) {
    if (!error) {
      return (
        <>
          <Toast />
          <Header />
        </>
      );
    }
    return null;
  }
  return null;
};

export default ProtectedHeader;
