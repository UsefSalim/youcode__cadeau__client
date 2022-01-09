import { useCallback, useState, useEffect } from 'react';
import API from 'Services/API';

export const useAuth = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const getUser = useCallback(async () => {
    try {
      const { data } = await API.post('/collaboraters/authenticated-collaborator');
      setUser(data);
      setLoading(false);
    } catch (error) {
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    getUser();
  }, [getUser]);
  return { user, getUser, error, setError, loading };
};
