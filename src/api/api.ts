import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '42a9bba6-f409-4ac7-8ae5-0a7a3c454b3e',
  },
});
