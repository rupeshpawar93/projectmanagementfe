'use strict'

import { useNavigate } from "react-router-dom";



const setKeyInLocalStorage = (key, value) => {
    localStorage.setItem(key, btoa(value));
}

const getKeyInLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    return value ? atob(value) : null;
}

const removeKeyInLocalStorage = (key) => {
    localStorage.removeItem(key);
}

const errorAPIFormat = (error) => {
    let errorMapper = {};
    if (typeof error === 'object') {
        for (let err of error) {
            errorMapper[err['path']] = err['msg'] || err['message']
        }
    }
    return errorMapper;
}

const isTokenExpired = () => {
    const encodedToken = localStorage.getItem('token');
    if (!encodedToken) return true;
    try {
        const token = atob(encodedToken);
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const payload = JSON.parse(jsonPayload);
        if (!payload.exp) {
            return true;
        }
        const expiry = payload.exp * 1000;
        return Date.now() > expiry;
    } catch (e) {
        console.error('Failed to decode token', e);
        return true;
    }
};

export {  setKeyInLocalStorage, getKeyInLocalStorage, removeKeyInLocalStorage, isTokenExpired, errorAPIFormat };
