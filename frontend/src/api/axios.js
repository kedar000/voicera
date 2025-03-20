import axios from 'axios';

const api = axios.create({
  baseURL: 'https://voicera-54e2ed3d14f5.herokuapp.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;