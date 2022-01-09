import axios from 'axios';
import axiosRetry from 'axios-retry';

const AXIOS = axios.create({
  baseURL: `${'https://api.workspace.sobrus.ovh/api/'}`,
  responseType: 'json',
  withCredentials: true,
});

// for repeat the request 3 time
axiosRetry(AXIOS, { retryDelay: axiosRetry.exponentialDelay });
axiosRetry(AXIOS, { retries: 3 });

export default AXIOS;
