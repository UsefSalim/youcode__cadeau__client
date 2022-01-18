import { useEffect, useState } from 'react';

export const usePanier = () => {
  const [panier, setPanier] = useState(JSON.parse(localStorage.getItem('panier')) || []);
  const [expedition, setExpedition] = useState(
    JSON.parse(localStorage.getItem('expedition')) || ''
  );
  const [code, setCode] = useState(JSON.parse(localStorage.getItem('code')) || '');
  const [adress, setAdress] = useState(JSON.parse(localStorage.getItem('adress')) || {});
  useEffect(() => {
    localStorage.removeItem('panier');
    localStorage.setItem('panier', JSON.stringify(panier));
  }, [panier]);
  useEffect(() => {
    localStorage.removeItem('expedition');
    localStorage.setItem('expedition', JSON.stringify(expedition));
  }, [expedition]);
  useEffect(() => {
    localStorage.removeItem('code');
    localStorage.setItem('code', JSON.stringify(code));
  }, [code]);
  useEffect(() => {
    localStorage.removeItem('adress');
    localStorage.setItem('adress', JSON.stringify(adress));
  }, [adress]);
  return { panier, setPanier, expedition, setExpedition, setCode, code, adress, setAdress };
};
