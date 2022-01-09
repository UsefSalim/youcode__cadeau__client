import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAcl } from 'Hooks';
import { AuthContext } from 'Context';
import { PagesLoader } from 'Components';
import { Toast } from '@laazyry/sobrus-design-system';

export const PrivateRoutes = ({ Component, to, does, ...rest }) => {
  const { error, loading } = useContext(AuthContext);
  const { can } = useAcl();

  return (
    <Route
      {...rest}
      path={to}
      render={(props) => {
        if (loading === false) {
          if (error) {
            return <Redirect to={{ pathname: '/error' }} />;
          }
          if (does !== undefined) {
            if (can(does)) return <Component {...props} />;
            return <Redirect to={{ pathname: '/denied_access' }} />;
          }
          return <Component {...props} />;
        }
        return <PagesLoader />;
      }}
    />
  );
};
