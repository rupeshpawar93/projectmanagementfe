'use strict'
import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

import App from './src/component/app';
import Home from './src/component/home';
import Signin from './src/component/signin';
import SignUp from './src/component/signup';
import { Loader } from './src/reuseable-component';

const Task = lazy(() => import('./src/component/task'));
const Project = lazy(() => import('./src/component/project'));
const Dashboard = lazy(() => import('./src/component/dashboard'));
const Profile = lazy(() => import('./src/component/profile'));

const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [{
        path: "/dashboard",
        element: <Suspense fallback={<Loader />}><Dashboard /></Suspense>
    }, {
        path: "/",
        element: <Home />
    }, {
        path: "/profile",
        element: <Suspense fallback={<Loader />}><Profile /></Suspense>
    }, {
        path: "/signin",
        element: <Signin />
    }, {
        path: "/signup",
        element: <SignUp />
    }, {
        path: "/project",
        element: <Suspense fallback={<Loader />}><Project /></Suspense>
    }, {
        path: "/project/:id",
        element: <Suspense fallback={<Loader />}><Task /></Suspense>
    }]
}]);

const root = createRoot(document.getElementById("app"));
root.render(<RouterProvider router={router} />);