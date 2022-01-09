import { useState, useCallback, useEffect } from 'react';
import API from 'Services/API';

export const useFetchAsync = (url, options, name) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState('');
  const [inputValue, setInputValue] = useState('');
  const fetch = useCallback(async (inputValue = null, callback = () => {}) => {
    try {
      setLoading(true);
      const res = await API.get(`${url}`, {
        params: { name: inputValue },
      });
      const formattedData = res?.data[name]?.map((item, index) => ({
        value: item?.[options[0]] ?? 0,
        label: item?.[options[1]] ?? '',
      }));

      callback(formattedData);
      setData(formattedData);
      setLoading(false);
    } catch (error) {
      setError(error?.response?.data);
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetch();
  }, [fetch]);
  const handleInputChange = (e) => {
    setInputValue(e);
    return e;
  };
  return [data, fetch, handleInputChange, loading, error];
};
