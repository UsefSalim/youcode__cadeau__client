import { notify } from '@laazyry/sobrus-design-system';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import API from 'Services/API';

export const useAuth = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const register = useCallback(async (values) => {
    try {
      const { data } = await API.post('/auth/register', values);
      setLoading(false);
      setUser(data?.user);
      history.push({ pathname: '/success' });
    } catch (error) {
      notify({
        type: 'danger',
        msg: error?.response?.data || 'Erreur Serveur Veiller contacter un administrateur',
        delay: 5000,
      });
    }
  }, [history]);
  const login = useCallback(async (values) => {
    try {
      const { data } = await API.post('/auth/login', values);
      setLoading(false);
      setUser(data?.user);
      history.push({ pathname: '/success' });
    } catch (error) {
      notify({
        type: 'danger',
        msg: error?.response?.data || 'Erreur Serveur Veiller contacter un administrateur',
        delay: 5000,
      });
    }
  }, [history]);
  const ifAuth = useCallback(async () => {
    try {
      const { data } = await API.get('');
      setLoading(false);
      setUser(data?.user);
    } catch (error) {
      notify({
        type: 'danger',
        msg: error?.response?.data || 'Erreur Serveur Veiller contacter un administrateur',
        delay: 5000,
      });
    }
  }, []);

  return { user, register, login, error, setError, ifAuth, loading };
};
