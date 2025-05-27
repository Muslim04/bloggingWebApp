import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API calls
export const register = async (userData: { username: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const login = async (userData: { email: string; password: string }) => {
    const response = await api.post('/auth/login', userData);
    return response.data;
};

// Posts API calls
export const getPosts = async () => {
    const response = await api.get('/posts');
    return response.data;
};

export const getPost = async (id: string) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
};

export const createPost = async (postData: { title: string; content: string; tags?: string[]; coverImage?: string }) => {
    const response = await api.post('/posts', postData);
    return response.data;
};

export const updatePost = async (id: string, postData: { title?: string; content?: string; tags?: string[]; coverImage?: string }) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
};

export const deletePost = async (id: string) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
}; 