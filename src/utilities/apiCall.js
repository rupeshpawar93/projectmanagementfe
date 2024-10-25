'use strict'

const FetchAPI = async (url, method, payload, authRequired = false) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    let config = {};
    if (authRequired) {
        const token = getKeyInLocalStorage('token');
        headers['authorization'] = `Bearer ${token}`;
    }
    if (method === 'GET') {
        config = {
            method,
            headers
        }
    } else {
        config = {
            method,
            headers,
            body: JSON.stringify(payload)
        }
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
        ...config
    });
    return response;
}

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

export { FetchAPI, setKeyInLocalStorage, getKeyInLocalStorage, removeKeyInLocalStorage, isTokenExpired, errorAPIFormat };
