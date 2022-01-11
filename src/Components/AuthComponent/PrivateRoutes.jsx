import { useContext } from 'react';
import { AuthContext } from 'Context';
import { Redirect, Route } from 'react-router-dom';
import { PagesLoader } from 'Components';
import { useAcl } from 'Components/AuthComponent/Acl';

export const PrivatRoutes = ({ path, component: Component, role, ...rest }) => {
  const { loading, user } = useContext(AuthContext);
  const { access } = useAcl();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!loading && Object.keys(user).length > 0) {
          if (access(role)) return <Component {...props} />;
          return <Redirect to={{ pathname: '/denied_access' }} />;
        }
        return <PagesLoader />;
      }}
    ></Route>
  );
};
