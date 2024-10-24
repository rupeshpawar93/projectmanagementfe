'use strict'

import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

import { Button, Label, Select } from "../reuseable-component/index";


import { FetchAPI, errorAPIFormat } from "../utilities/apiCall";
import { roleList } from "../utilities/constants";

const SignUp = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSingup = async (e) => {
        e.preventDefault();
        const error = {}
        if(password !== confirmPassword) {
            error['confirmPassword'] = 'Confirm Password must be equal to password';
        }
        if(Object.keys(error).length>0) {
            setErrors(error);
        } else {
            const response = await FetchAPI('user/signup', 'POST', { name, username, password, confirmPassword, role}, false);
            const data = await response.json();
            if(response.status === 200) {
                navigate('/signin');
            } else {
                const errorResponse = errorAPIFormat(data.data.errors);
                setErrors(errorResponse);
            }
        }
    };

    return (
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
                    <div className="card-body p-5 text-center">
                        <h3 className="mb-5">Sign Up</h3>
                        <form onSubmit={handleSingup}>
                            <div className="form-outline mb-4">
                                <Label class="form-label" forId="name" text="Name" />
                                <Input type="text" name="name" value={name} id="name" set={setName} class="form-control form-control-md" required="true"/>
                                { errors && errors.name && <span className="text-danger">{errors.name}</span> }
                            </div>
                            <div className="form-outline mb-4">
                                <Label class="form-label" forId="username" text="Username" />
                                <Input type="text" name="username" value={username} id="username" set={setUsername} class="form-control form-control-md" required="true"/>
                                { errors && errors.username && <span className="text-danger">{errors.username}</span> }
                            </div>
                            <div className="form-outline mb-4">
                                <Label class="form-label" forId="role" text="Role" />
                                <Select type="text" name="role" value={role} id="role" set={setRole} options={roleList} class="form-control form-control-md" />
                                { errors && errors.role && <span className="text-danger">{errors.role}</span> }
                            </div>
                            <div className="form-outline mb-4">
                                <Label class="form-label" forId="password" text="Password" />
                                <Input type="password" value={password} name="password" set={setPassword} id="password" class="form-control form-control-md" required="true" />
                                { errors && errors.password && <span className="text-danger">{errors.password}</span> }
                            </div>
                            <div className="form-outline mb-4">
                                <Label class="form-label" forId="confirm-password" text="Confirm Password" />
                                <Input type="password" value={confirmPassword} name="confirm-password" set={setConfirmPassword} id="confirm-password" class="form-control form-control-md" required="true"/>
                                { errors && errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span> }
                            </div> 
                            <div className="d-flex flex-column justify-content-between">
                                <Button class="btn btn-primary btn-lg" type="submit" text="Signup" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
