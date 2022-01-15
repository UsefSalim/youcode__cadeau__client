/* eslint-disable no-restricted-globals */
import { useState, useCallback } from 'react';
import API from 'Services/API';
import { useHistory, useParams } from 'react-router-dom';
import { notify } from '@laazyry/sobrus-design-system';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from 'Context/AuthContext';

export const useCrud = (url = '', name = '', queryState = {}, formData = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pages, setPages] = useState(0);
  const history = useHistory();
  const { setError: setAuthError } = useContext(AuthContext);
  const FetchPost = useCallback(
    async (initialPage, storageSearch) => {
      const { page, limit, orderBy, order } = queryState;
      try {
        setData([]);
        setLoading(true);
        const res = await API.post(`${url}`, storageSearch || formData, {
          params: { page: initialPage || page, limit, orderBy, order },
        });
        setData(res?.data[name] || res?.data);
        setPages(Math.ceil(res?.data?.total / queryState?.limit));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error?.response?.data?.message?.startsWith('code')) {
          setAuthError(error?.response?.data?.message);
          return 0;
        } else {
          notify({
            type: 'danger',
            msg:
              error?.response?.data?.message ||
              'Erreur Serveur Veiller contacter un administrateur',
            delay: 5000,
          });
        }
      }
    },
    [name, queryState, url, formData, setAuthError]
  );
  const FetchGet = useCallback(async () => {
    try {
      setData([]);
      setLoading(true);
      const res = await API.get(`${url}`, { params: queryState });
      setData(res?.data[name] || res?.data);
      setPages(Math.ceil(res?.data?.total / queryState?.limit));
      setLoading(false);
    } catch (error) {
      if (error?.response?.data?.message?.startsWith('code')) {
        setAuthError(error?.response?.data?.message);
        return 0;
      } else {
        notify({
          type: 'danger',
          msg:
            error?.response?.data?.message || 'Erreur Serveur Veiller contacter un administrateur',
          delay: 5000,
        });
      }
    }
  }, [name, queryState, url, setAuthError]);
  const Add = async (url, formData, redirrectUrl = '', redirrect = false) => {
    try {
      setLoading(true);
      const { data } = await API.post(`${url}`, formData);
      setLoading(false);
      history.push({
        pathname: redirrect || `${redirrectUrl}/${data?.id}`,
        state: { detail: 'success', action: 'ajouter' },
      });
    } catch (error) {
      if (error?.response?.data?.message?.startsWith('code')) {
        setAuthError(error?.response?.data?.message);
        return 0;
      } else {
        notify({
          type: 'danger',
          msg:
            error?.response?.data?.message || 'Erreur Serveur Veiller contacter un administrateur',
          delay: 5000,
        });
      }
    }
  };
  const Update = async (url, formData, redirrectUrl = '', redirrect = false) => {
    try {
      setLoading(true);
      const { data } = await API.patch(`${url}`, formData);
      setLoading(false);
      history.push({
        pathname: redirrect || `${redirrectUrl}/${data?.id}`,
        state: { detail: 'success', action: 'modiffier' },
      });
    } catch (error) {
      if (error?.response?.data?.message?.startsWith('code')) {
        setAuthError(error?.response?.data?.message);
        return 0;
      } else {
        notify({
          type: 'danger',
          msg:
            error?.response?.data?.message || 'Erreur Serveur Veiller contacter un administrateur',
          delay: 5000,
        });
      }
    }
  };
  const PutUpdate = async (url, formData, redirrectUrl = '', redirrect = false) => {
    try {
      setLoading(true);
      const { data } = await API.put(`${url}`, formData);
      setLoading(false);
      history.push({
        pathname: redirrect || `${redirrectUrl}/${data?.id}`,
        state: { detail: 'success', action: 'modiffier' },
      });
    } catch (error) {
      if (error?.response?.data?.message?.startsWith('code')) {
        setAuthError(error?.response?.data?.message);
        return 0;
      } else {
        notify({
          type: 'danger',
          msg:
            error?.response?.data?.message || 'Erreur Serveur Veiller contacter un administrateur',
          delay: 5000,
        });
      }
    }
  };
  const Delete = async (url, id, msgData) => {
    const result = confirm('Voulez-vous vraiment supprimer ce poste');
    if (result) {
      try {
        await API.delete(`${url}/${id}`);
        const newData = data.filter((d) => d._id !== id);
        setData(newData);
        notify({
          type: 'success',
          msg: `${msgData} supprimer avec succes`,
          delay: 5000,
        });
      } catch (error) {
        if (error?.response?.data?.message?.startsWith('code')) {
          setAuthError(error?.response?.data?.message);
          return 0;
        } else {
          notify({
            type: 'danger',
            msg:
              error?.response?.data?.message ||
              'Erreur Serveur Veiller contacter un administrateur',
            delay: 5000,
          });
        }
      }
    }
  };
  return {
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    pages,
    setPages,
    FetchGet,
    FetchPost,
    Delete,
    Update,
    Add,
    PutUpdate,
  };
};

export const useGetOne = (url, propsId = null) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { setError: setAuthError } = useContext(AuthContext);
  useEffect(() => {
    const fetch = async () => {
      try {
        if (propsId || id) {
          const res = await API.get(`${url}`);
          setData(res?.data);
        }
        setLoading(false);
      } catch (error) {
        if (error?.response?.data?.message?.startsWith('code')) {
          setAuthError(error?.response?.data?.message);
          return 0;
        } else {
          notify({
            type: 'danger',
            msg:
              error?.response?.data?.message ||
              'Erreur Serveur Veiller contacter un administrateur',
            delay: 5000,
          });
        }
      }
    };

    fetch();
  }, [url, id, propsId, setAuthError]);
  return { data, loading, setLoading, setData };
};
export const usePostOne = (url, formData) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { setError: setAuthError } = useContext(AuthContext);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.post(`${url}`, formData);
        setData(res?.data);
        setLoading(false);
      } catch (error) {
        if (error?.response?.data?.message?.startsWith('code')) {
          setAuthError(error?.response?.data?.message);
          return 0;
        } else {
          notify({
            type: 'danger',
            msg:
              error?.response?.data?.message ||
              'Erreur Serveur Veiller contacter un administrateur',
            delay: 5000,
          });
        }
      }
    };

    fetch();
  }, [url, setAuthError]);
  return { data, loading, setData };
};
