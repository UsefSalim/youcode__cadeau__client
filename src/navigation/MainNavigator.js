import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, Register, Login } from 'Pages';
import SuccessComponent from './../Components/AuthComponent/SuccessComponent';
import { privateRoutes } from 'values/privateRoutes';
import { PrivatRoutes } from 'Components';

const MainNavigator = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<p>Loading ...</p>}>
        <Switch>
          <Route path='/' exact render={(props) => <Home {...props} />} />
          <Route path='/register' exact render={(props) => <Register {...props} />} />
          <Route path='/login' exact render={(props) => <Login {...props} />} />
          <Route path='/success' exact render={(props) => <SuccessComponent {...props} />} />
          {
            privateRoutes?.map(r=>(
              <PrivatRoutes  path={r?.to} component={r?.component} role={r?.role} />
            ))
          }
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default MainNavigator;
