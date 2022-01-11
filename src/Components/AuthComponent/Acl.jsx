import { AuthContext } from 'Context/AuthContext';
import { useContext } from 'react';
export const useAcl = () => {
  const { user, loading } = useContext(AuthContext);
  // console.log(user);
  const access = (role) => {
    if (!loading) {
      if (user?.role === role) return true;
      return false;
    }
  };
  return { access };
};
