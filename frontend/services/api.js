import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

const instance = axios.create({});

export default instance;
