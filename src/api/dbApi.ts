import axios from 'axios'

const dbApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export { dbApi }