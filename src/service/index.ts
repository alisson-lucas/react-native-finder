import axios from 'axios';

export const contactSend = axios.create({
    baseURL: 'https://webhook.site/aca8b7a1-279c-4be0-aab2-61f72071223b'
});

export const getData = axios.create({
    baseURL: 'https://accenture-server-rn.herokuapp.com/'
})