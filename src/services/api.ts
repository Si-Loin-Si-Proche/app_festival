import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const PROJECT_ID = process.env.EXPO_PUBLIC_PROJECT_ID;
const TOKEN = process.env.EXPO_PUBLIC_PROJECT_TOKEN;
if (__DEV__) {
  if (!BASE_URL || !PROJECT_ID || !TOKEN) {
    // eslint-disable-next-line no-console
    console.error(
      '🚨 ERREUR ENV : Il manque une variable (URL, ID ou TOKEN) dans le .env'
    );
  }
}

const FULL_URL = `${BASE_URL}/${PROJECT_ID}/v1`;

const api = axios.create({
  baseURL: FULL_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: TOKEN,
  },
});

export default api;
