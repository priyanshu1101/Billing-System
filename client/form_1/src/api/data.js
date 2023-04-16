import axios from 'axios';

const url="https://egs-project-1-backend.onrender.com/";

export const getData =  () => axios.get(url);
