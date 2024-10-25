'use strict'

import { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../context/authContext';

import { Button } from "../reuseable-component/index";
import { removeKeyInLocalStorage } from '../utilities/apiCall';

const Header = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext)
    const navigate = useNavigate();

    const logout = () => {
        setIsAuth(!isAuth);
        removeKeyInLocalStorage('token');
        removeKeyInLocalStorage('bhoomika');
        navigate('/signin');
    }

    if (isAuth) {
        return (
            <header className="d-flex justify-content-between border-bottom py-2">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">Project Management</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="d-none d-md-block">
                    <Button class="btn btn-link" text="Signout" clickHandle={logout} />
                </div>

            </header>)
    }

}

export default Header;