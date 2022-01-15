import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from 'Pages';
import { PagesLoader } from 'Components';
import Header from './../Components/Header/Header';
import { AdminRoutes, SellerRoutes, UserRoutes } from './ProtectedRoutes';
import { sellerRoutes, adminRoutes, userRoutes } from './dataRoutes';
import { AuthContext } from 'Context';

const MainNavigator = () => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <React.Suspense fallback={<PagesLoader />}>
        <Header />
        <Switch>
          <Route path='/' exact render={(props) => <Home {...props} />} />
          {sellerRoutes.map(
            (route, i) =>
              !loading && (
                <SellerRoutes
                  {...route}
                  exact
                  user={user}
                  isAuthenticated={isAuthenticated}
                  component={route.component}
                />
              )
          )}
          {userRoutes.map(
            (route, i) =>
              !loading && (
                <UserRoutes
                  exact
                  {...route}
                  user={user}
                  isAuthenticated={isAuthenticated}
                  component={route.component}
                />
              )
          )}
          {adminRoutes.map(
            (route, i) =>
              !loading && (
                <AdminRoutes
                  exact
                  {...route}
                  user={user}
                  isAuthenticated={isAuthenticated}
                  component={route.component}
                />
              )
          )}
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default MainNavigator;
