import axios from 'axios';
import axiosRetry from 'axios-retry';

const AXIOS = axios.create({
  baseURL: `${'http://localhost:5000/api'}`,
  responseType: 'json',
  withCredentials: true,
});

// for repeat the request 3 time
axiosRetry(AXIOS, { retryDelay: axiosRetry.exponentialDelay });
axiosRetry(AXIOS, { retries: 3 });

export default AXIOS;
