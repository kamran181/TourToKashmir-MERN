import axios from 'axios';

const API = axios.create({ baseURL: " http://localhost:3030" });

API.interceptors.request.use((req) => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (profile && profile.token) {
        const token = profile.token;
        req.headers.Authorization = `Bearer ${token}`;
    }
    else if (profile && profile.credential) {
        const credential = profile.credential;
        req.headers.Authorization = `Bearer ${credential}`

    }
    return req;
})

export const signIn = (formData) => API.post('/users/signin', formData);

export const signUp = (formData) => API.post('/users/signup', formData);

export const googleSignIn = (result) => API.post('/users/googleSignIn', result);

export const createTour = (tourData) => API.post('/tour', tourData);

export const getTours = (page) => API.get(`/tour?page=${page}`);

export const getTour = (id) => API.get(`/tour/${id}`);

export const deleteTour = (id) => API.delete(`/tour/${id}`);

export const updateTour = (updatedTourData, id) => API.patch(`/tour/${id}`, updatedTourData);

export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`);  //id here is user id

export const getToursBySearch = (searchQuery)=>   API.get(`tour/search?searchQuery=${searchQuery}`);

export const getToursByTag = (tag)=> API.get(`/tour/tag/${tag}`);

export const getRelatedTours = (tags)=> API.post(`/tour/relatedTours`,tags);

export const likingTour = (id) => API.patch(`/tour/like/${id}`)
