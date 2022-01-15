import { notify } from '@laazyry/sobrus-design-system';
import { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import API from 'Services/API';

export const useAuth = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const register = useCallback(async (values, setOpen) => {
    try {
      const { data } = await API.post('/auth/register', values);
      setUser(data);
      setLoading(false);
      setOpen(false);
    } catch (error) {
      notify({
        type: 'danger',
        msg: error?.response?.data || 'Erreur Serveur Veiller contacter un administrateur',
        delay: 5000,
      });
    }
  }, []);
  const login = useCallback(async (values, setOpen) => {
    try {
      const { data } = await API.post('/auth/login', values);
      setUser(data);
      setLoading(false);
      setOpen(false);
    } catch (error) {
      notify({
        type: 'danger',
        msg: error?.response?.data || 'Erreur Serveur Veiller contacter un administrateur',
        delay: 5000,
      });
    }
  }, []);
  const logout = useCallback(async (values) => {
    try {
      const { data } = await API.get('/auth/logout');
      setUser(data);
      setLoading(false);
    } catch (error) {
      notify({
        type: 'danger',
        msg: error?.response?.data || 'Erreur Serveur Veiller contacter un administrateur',
        delay: 5000,
      });
    }
  }, []);
  const ifAuth = useCallback(async () => {
    try {
      const { data } = await API.get('');
      console.log(data);
      setUser(data);
      setLoading(false);
    } catch (error) {
      notify({
        type: 'danger',
        msg: error?.response?.data || 'Erreur Serveur Veiller contacter un administrateur',
        delay: 5000,
      });
    }
  }, []);
  useEffect(() => {
    ifAuth();
  }, [ifAuth]);

  return { user, register, login, error, setError, ifAuth, loading, logout };
};
