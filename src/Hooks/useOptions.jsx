import { notify } from '@laazyry/sobrus-design-system';
import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from 'Services/API';

export const useOptions = (url, selectOptions, methode, name = '') => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const getOptions = useCallback(
    async (isMounted) => {
      try {
        const { data } = await API[methode](`${url}`);
        if (isMounted) {
          setOptions(
            name
              ? data[name]?.map((d) => ({ value: d[selectOptions[0]], label: d[selectOptions[1]] }))
              : data?.map((d) => ({ value: d[selectOptions[0]], label: d[selectOptions[1]] }))
          );
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setLoading(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url, name]
  );
  useEffect(() => {
    let isMounted = true;
    getOptions(isMounted);
    return () => (isMounted = false);
  }, [getOptions]);

  return options;
};
export const useDragOptions = (url) => {
  const { id } = useParams();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const getOptions = useCallback(
    async (isMounted) => {
      if (id) {
        try {
          const { data } = await API.get(`${url}`);
          const test = data.articlesArrangement.sort((a, b) => a.disposition - b.disposition);
          if (isMounted) {
            setOptions(
              test?.map((d) => ({
                id: d?.contractArticleModel?.id,
                name: d?.contractArticleModel?.name,
              }))
            );
            setLoading(false);
          }
        } catch (error) {
          if (isMounted) {
            setLoading(false);
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url]
  );
  useEffect(() => {
    let isMounted = true;
    getOptions(isMounted);
    return () => (isMounted = false);
  }, [getOptions]);

  return options;
};
