import { AuthContext } from 'Context';
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { PagesLoader } from 'Components';
 
const SuccessComponent = () => {
  const { user, loading } = useContext(AuthContext);
  if (Object.keys(user).length > 0 && !loading) {
    if (user?.role === 'Admin') return <Redirect to='/dashboard' />;
    if (user?.role === 'User') return <Redirect to='/profile' />;
    if (user?.role === 'Seller') return <Redirect to='/shope' />;
    return <Redirect to='/login' />;
  }
 return <PagesLoader />;
};

export default SuccessComponent;
