
'use strict'

import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { getKeyInLocalStorage, isTokenExpired, removeKeyInLocalStorage } from "../utilities/apiCall";
import AuthContext from "../context/authContext";
import ErrorBoundries from "./errorBoundries";
import Header from "./header";

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=> {
        setIsAuth(getKeyInLocalStorage('token') ? true : false);
        setIsAdmin(getKeyInLocalStorage('bhoomika')?? false);
        checkIsLogin();
    }, [isAuth])

    const checkIsLogin = () => {
        const tokenExpiry = isTokenExpired();
        if(tokenExpiry) {
            removeKeyInLocalStorage('token');
            setIsAuth(false);
            removeKeyInLocalStorage('bhoomika');
            setIsAdmin(false);
            if (location.pathname !== '/signup') {
                navigate('/signin');
            }
        }
    }
    return (
        <ErrorBoundries>
            <AuthContext.Provider value={{isAuth, setIsAuth, isAdmin, setIsAdmin}} >
                <div className="container-fluid">
                    <Header />
                    <main className="py-3">
                        <Outlet />
                    </main>
                </div>
            </AuthContext.Provider>
        </ErrorBoundries>
    )
}

export default App;
