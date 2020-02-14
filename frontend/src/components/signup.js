import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap'

import { UserContext } from '../index'
import useForm from './useForm'
import validate from './rules/SignUpFormValidationRules'

const axios = require('axios');

function SignUp() {

    const { values, errors, handleSubmit, handleChange} = useForm(signup, validate);
    const [location, setLocation] = useState({
        country: "",
        state: ""
    });
    const history = useHistory();

    const { setEmail } = useContext(UserContext);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get('https://freegeoip.app/json/')
        .then(res => {
            setLocation({...location, country: res.data.country_name, state: res.data.region_name});
        })
        .catch(err => console.log(err));
    }, []);

    function signup() {
        setEmail(values.Email);
        const data = {...values, Country: location.country, State: location.state};
        axios.post('/signup', data)
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
                        Registration Failed
                    </Alert>
                )
            }
            <div className="form-group">
                <label htmlFor="SignUpName">Full Name</label>
                <input type="text" name="Name" className={`form-control form-control-sm ${errors.Name && "is-invalid"}`} id="SignUpName" value={values.Name || ""} onChange={handleChange} required/>
                {errors.Name && (<small id="SignUpNameError" className="form-text text-danger">{errors.Name}</small>)}
            </div>
            <div className="form-group">
                <label htmlFor="SignUpEmail">Email address</label>
                <input type="email" name="Email" className={`form-control form-control-sm ${errors.Email && "is-invalid"}`} id="SignUpEmail" value={values.Email || ""} onChange={handleChange} required/>
                {errors.Email && (<small id="SignUpEmailError" className="form-text text-danger">{errors.Email}</small>)}
            </div>
            <div className="form-group">
                <label htmlFor="SignUpUsername">Username</label>
                <input type="text" name="Username" className={`form-control form-control-sm ${errors.Username && "is-invalid"}`} id="SignUpUsername" value={values.Username || ""} onChange={handleChange} required/>
                {errors.Username && (<small id="SignUpUsernameError" className="form-text text-danger">{errors.Username}</small>)}
            </div>
            <div className="form-group">
                <label htmlFor="SignUpPassword">Password</label>
                <input type="password" name="Password" className={`form-control form-control-sm ${errors.Password && "is-invalid"}`} id="SignUpPassword" value={values.Password || ""} onChange={handleChange} required/>
                {errors.Password && (<small id="SignUpPasswordError" className="form-text text-danger">{errors.Password}</small>)}
            </div>
            <div className="form-group">
                <label htmlFor="SignUpDOB">Date of Birth</label>
                <input type="date" name="DOB" className={`form-control form-control-sm ${errors.DOB && "is-invalid"}`} id="SignUpDOB" value={values.DOB || ""} onChange={handleChange} required/>
                {errors.DOB && (<small id="SignUpDateofBirthError" className="form-text text-danger">{errors.DOB}</small>)}
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="SignUpCountry">Country</label>
                    <input type="text" name="Country" className="form-control form-control-sm" id="SignUpCountry" value={location.country || ""} onChange={handleChange} required/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="SignUpState">State</label>
                    <input type="text" name="State" className="form-control form-control-sm" id="SignUpState" value={location.state || ""} onChange={handleChange} required/>
                </div>
            </div>
            <div className="form-group">
                <label className="mr-3">Gender</label>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="Gender" id="SignUpMale" value="Male" onChange={handleChange}/>
                    <label className="form-check-label" htmlFor="SignUpMale">Male</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="Gender" id="SignUpFemale" value="Female" onChange={handleChange}/>
                    <label className="form-check-label" htmlFor="SignUpFemale">Female</label>
                </div>
                {errors.Gender && (<small id="SignUpGenderError" className="form-text text-danger">{errors.Gender}</small>)}
            </div>
            <button type="submit" className="btn btn-success">Sign Up</button>
        </form>
    );
}

export default SignUp;