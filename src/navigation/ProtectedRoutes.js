import { AuthContext } from 'Context';
import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

export const UserRoutes = ({ path, component: Component, isAuthenticated,user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated && user?.role === 'User' ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { userpath: path },
            }}
          />
        )
      }
    />
  );
};
export const AdminRoutes = ({ path, component: Component,isAuthenticated,user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated && user?.role === 'Admin' ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { userpath: path },
            }}
          />
        )
      }
    />
  );
};
export const SellerRoutes = ({ path, component: Component,isAuthenticated,user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated && user?.role === 'Seller' ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { userpath: path },
            }}
          />
        )
      }
    />
  );
};
