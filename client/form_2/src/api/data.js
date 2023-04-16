import axios from 'axios';

const url="https://billing-system-backend.onrender.com";

export const postData = (formData) => axios.post(url,formData);
