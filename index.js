'use strict'
import React from 'react';
import ReactDom from 'react-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

import App from './src/component/app';
import Home from './src/component/home';
import Signin from './src/component/signin';
import SignUp from './src/component/singup';
import Project from './src/component/project';
import Task from './src/component/task';

const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [{
        path: "",
        element: <Home />
    },{
        path: "/signin",
        element: <Signin />
    }, {
        path: "/signup",
        element: <SignUp />
    },{
        path: "/project",
        element: <Project />
    }, {
        path: "/project/:id",
        element: <Task />
    }]
}]);

const root = ReactDom.createRoot(document.getElementById("app"));
root.render(<RouterProvider router={router} />);