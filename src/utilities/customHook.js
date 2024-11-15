import { useNavigate } from 'react-router-dom';

import { getKeyInLocalStorage } from '../utilities/apiCall';
export const useFetchAPI = () => {
    const navigate = useNavigate();

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
            };
        } else {
            config = {
                method,
                headers,
                body: JSON.stringify(payload)
            };
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
                ...config
            });

            if (response.status === 401) {
                navigate('/signin'); // Redirect to sign-in page
                return;
            }

            const data = await response.json();
            return { status: response.status, data };

        } catch (error) {
            console.error('API call error:', error);
            return { error: true, data: null };
        }
    };

    return FetchAPI;
};