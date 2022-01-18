import React, { useContext, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from 'Pages';
import { PagesLoader } from 'Components';
import Header from './../Components/Header/Header';
import { AdminRoutes, SellerRoutes, UserRoutes } from './ProtectedRoutes';
import { sellerRoutes, adminRoutes, userRoutes } from './dataRoutes';
import { AuthContext, PanierContext, PopupContext } from 'Context';
import Categories from 'Pages/Categories/Categories';
import { usePanier } from 'Hooks';
import Panier from './../Pages/Panier/Panier';

const MainNavigator = () => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  const { panier, setPanier, expedition, setExpedition, setCode, code ,adress, setAdress} = usePanier();
  const [open, setOpen] = useState(false);
  return (
    <PanierContext.Provider value={{ panier, setPanier, expedition, setExpedition, setCode, code ,adress, setAdress}}>
      <PopupContext.Provider value={{ open, setOpen }}>
        <BrowserRouter>
          <React.Suspense fallback={<PagesLoader />}>
            <Header />
            <Switch>
              <Route path='/' exact render={(props) => <Home {...props} />} />
              <Route path='/categorie/:id' exact render={(props) => <Categories {...props} />} />
              <Route path='/panier' exact render={(props) => <Panier {...props} />} />
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
      </PopupContext.Provider>
    </PanierContext.Provider>
  );
};

export default MainNavigator;
