import { AuthContext } from 'Context';
import { useContext } from 'react';

export const useAcl = () => {
  const { user } = useContext(AuthContext);
  const acl_actions = user?.role?.allowedActions;
  const can = (action) => {
    if (user) {
      if (user?.isAdmin) return true;
      const can = acl_actions?.some((object) => object.name === action);
      if (can) {
        return true;
      }
      return false;
    }
    return false;
  };
  return { can };
};
