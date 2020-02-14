import React, { useState, useContext } from 'react'
import { Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

import { UserContext } from '../index'
import useForm from './useForm'
import validate from './rules//SignInFormValidationRules'

const axios = require('axios');

function SignIn() {

    const { values, errors, handleSubmit, handleChange} = useForm(signin, validate);
    const [error, setError] = useState(false);
    const { setEmail } = useContext(UserContext);
    const history = useHistory();

    function signin() {
        setEmail(values.Email);
        axios.post('/signin', values)
        .then(res => {
            setError(false);
            localStorage.setItem('user', JSON.stringify(res.data));
            history.push("/app/profile");
        })
        .catch(err => setError(true));
    }

    return (
        <form onSubmit={handleSubmit}>
            {
                error && (
                    <Alert variant="danger">
                        Invalid User
                    </Alert>
                )
            }
            <div className="form-group">
                <label htmlFor="SignInEmail">Email address</label>
                <input type="email" name="Email" className={`form-control form-control-sm ${errors.Email && "is-invalid"}`} id="SignInEmail" value={values.Email || ""} onChange={handleChange} required/>
                {errors.Email && (<small id="SignInEmailError" className="form-text text-danger">{errors.Email}</small>)}
            </div>
            <div className="form-group">
                <label htmlFor="SignInPassword">Password</label>
                <input type="password" name="Password" className={`form-control form-control-sm ${errors.Password && "is-invalid"}`} id="SignInPassword" value={values.Password || ""} onChange={handleChange} required/>
                {errors.Password && (<small id="SignInPasswordError" className="form-text text-danger">{errors.Password}</small>)}
            </div>
            <button type="submit" className="btn btn-success">Sign In</button>
        </form>
    );
}

export default SignIn;