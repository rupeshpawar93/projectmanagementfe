

'use strict'

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import AuthContext from "../context/authContext";
import { Input, Button, Label } from "../reuseable-component/index";
import { setKeyInLocalStorage, errorAPIFormat } from "../utilities/apiCall";
import { useFetchAPI } from "../utilities/customHook";


const Signin = () => {
    const FetchAPI = useFetchAPI();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { setIsAuth, setIsAdmin } = useContext(AuthContext)

    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        const errorObj = {};
        if (username.length === 0) {
            errorObj.username = 'username is required';
        }
        if (password.length === 0) {
            errorObj.password = 'password is required';
        }
        if (Object.keys(errorObj).length === 0) {
            const response = await FetchAPI('user/signin', 'POST', { username, password }, false);
            const { status, data } = response;
            if (status === 200) {
                setIsAuth(true);
                setKeyInLocalStorage('token', data.data.token)
                setIsAdmin(data.data.isAdmin)
                setKeyInLocalStorage('bhoomika', data.data.isAdmin)
                navigate('/')
            } else {
                const errorResponse = errorAPIFormat(data.error);
                setErrors(errorResponse);
            }
        } else {
            setErrors(errorObj);
        }

    }


    return (
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                    <div className="card-body p-5 text-center">
                        <h3 className="mb-5">Sign in</h3>
                        <form onSubmit={handleSignin}>
                            <div className="form-outline mb-4">
                                <Label class="form-label" forId="username" text="Username" />
                                <Input type="text" name="username" value={username} id="username" class="form-control form-control-md" set={setUsername} />
                                {errors && errors['username'] && <span className="text-danger">{errors['username']}</span>}
                            </div>
                            <div className="form-outline mb-4">
                                <Label class="form-label" forId="password" text="Password" />
                                <Input type="password" name="password" value={password} id="password" class="form-control form-control-md" set={setPassword} />
                                {errors && errors['password'] && <span className="text-danger">{errors['password']}</span>}
                            </div>
                            <div className="d-flex flex-column justify-content-between">
                                <Button class="btn btn-primary btn-lg mb-2" type="submit" text="Signin" />
                                <span className="mb-2">OR</span>

                            </div>
                        </form>
                        <Link to="/signup" className="btn btn-primary btn-lg mb-5">Signup</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin;
