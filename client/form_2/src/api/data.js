import axios from 'axios';

const url="https://egs-project-1-backend.onrender.com/";

export const postData = (formData) => axios.post(url,formData);
