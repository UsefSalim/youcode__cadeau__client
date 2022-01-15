import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from 'Pages';
import { PagesLoader } from 'Components';
import Header from './../Components/Header/Header';
import { AdminRoutes, SellerRoutes, UserRoutes } from './ProtectedRoutes';
import { sellerRoutes, adminRoutes, userRoutes } from './dataRoutes';

const MainNavigator = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<PagesLoader />}>
        <Header />
        <Switch>
          <Route path='/' exact render={(props) => <Home {...props} />} />
          {sellerRoutes.map((route, i) => (
            <SellerRoutes {...route} component={route.component} />
          ))}
          {userRoutes.map((route, i) => (
            <UserRoutes {...route} component={route.component} />
          ))}
          {adminRoutes.map((route, i) => (
            <AdminRoutes {...route} component={route.component} />
          ))}
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default MainNavigator;
