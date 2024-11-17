'use strict'

import { useEffect , useState } from "react";
import { useFetchAPI } from "../utilities/customHook";
import { Label, Input, Button, Loader } from "../reuseable-component";

const Profile = () => {
    const FetchAPI = useFetchAPI();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchUserDetail = async () => {
            const result  = await FetchAPI('user', 'GET', {}, true);
            const response = result.data.data;
            setName(response.name);
            setUsername(response.username);
            setEmail(response.email);
        }
        fetchUserDetail();
    
      return () => {
      }
    }, [])

    const handleUpdate = async (e) => {
        setLoading(true);
        e.preventDefault();
        const error = {}
        if (password !== confirmPassword) {
            error['confirmPassword'] = 'Confirm Password must be equal to password';
        }
        if (Object.keys(error).length > 0) {
            setErrors(error);
        } else {
            const response   = await FetchAPI('user', 'PATCH', {password, confirmPassword}, true);
            const { status, data } = response;
            console.log("------data", data);
            if (status !== 200) {
                const errorResponse = errorAPIFormat(data.data.errors);
                setErrors(errorResponse);
            } else {
                setPassword('');
                setConfirmPassword('');
                setSuccess('')
            }
        }
        setLoading(false);
    }
    
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-sm-4 mb-4">
                    <div className="form-group my-4">
                        <Label forId="name" text="Name" />
                        <Input type="text" class="form-control" value={name} name="name" id="name" required="true" maxlength="200" readonly="true"/>
                    </div>
                    <div className="form-group my-4">
                        <Label forId="username" text="Username" />
                        <Input type="text" class="form-control" value={username} name="username" id="username" required="true" maxlength="200"  readonly="true"/>
                    </div>
                    <div className="form-group my-4">
                        <Label forId="email" text="Email" />
                        <Input type="text" class="form-control" value={email} name="email" id="email" required="true" maxlength="200" readonly="true"/>
                    </div>
                    <form onSubmit={handleUpdate} >
                        <div className="form-group  my-4">
                            <Label forId="password" text="New Password" />
                            <Input type="password" class="form-control" set={setPassword} value={password} name="password" id="password" required="true" />
                            {errors && errors.password && <span className="text-danger">{errors.password}</span>}
                        </div>
                        <div className="form-group  my-4">
                            <Label forId="confirmPassword" text="Confirm New Password" />
                            <Input type="password" class="form-control" set={setConfirmPassword} value={confirmPassword} name="confirmPassword" id="confirmPassword" required="true" />
                            {errors && errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
                        </div>

                        <Button name="update" type="submit" class="btn btn-primary" text="Update" />

                    </form>
                </div>
            </div>
            {loading && <Loader />}
        </div>
    )
}

export default Profile;