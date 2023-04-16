import axios from 'axios';

const url="https://billing-system-backend.onrender.com";

export const getData =  () => axios.get(url);
