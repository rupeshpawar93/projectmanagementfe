'use strict';

import { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../context/authContext';

import { Button, Input } from "../reuseable-component/index";
import { removeKeyInLocalStorage } from '../utilities/apiCall';

const Header = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        setIsAuth(false);
        removeKeyInLocalStorage('token');
        removeKeyInLocalStorage('bhoomika');
        navigate('/signin');
    };

    if (!isAuth) {
        return (
            <header className="d-flex justify-content-center border-bottom py-2">
                <p>Please <Link to="/signin">Sign in</Link> to access the dashboard.</p>
            </header>
        );
    }

    return (
        <header className="border-bottom py-2">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Project Management</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/project">Project</Link>
                            </li>
                            <li className="nav-item d-md-none">
                                <Link className="nav-link" to="/profile">Edit Profile</Link>
                            </li>
                        </ul>
                        
                        {/* Signout button (visible as text on large screens, icon on small screens) */}
                        <div className="d-flex  align-items-center">
                           
                            <Link className="btn btn-link d-none d-lg-inline" to="/profile">Edit Profile</Link>
                            <Button
                                className="btn btn-link d-none d-lg-inline"
                                text="Signout"
                                clickHandle={logout}
                            />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
