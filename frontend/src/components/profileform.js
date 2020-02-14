import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

import useForm from './useForm'
import validate from './rules//UpdateFormValidationRules'

function ProfileForm(props) {

    const { values, errors, handleSubmit, handleChange} = useForm(update, validate);
    const [location, setLocation] = useState({
        country: "",
        state: ""
    });
    
    //check this function
    useEffect(() => {
        console.log(props.data);
    })

    function update() {
        console.log(values);
    }
    const [allowEdit, setallowEdit] = useState(false);

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="ProfileName">Full Name</label>
                <input type="text" name="Name" className={`form-control form-control-sm ${errors.Name && "is-invalid"}`} id="ProfileName" value={values.Name || ""} onChange={handleChange} required/>
                {errors.Name && (<small id="ProfileNameError" className="form-text text-danger">{errors.Name}</small>)}
            </div>
            <div className="form-group">
                <label htmlFor="ProfileEmail">Email address</label>
                <input type="email" name="Email" className={`form-control form-control-sm ${errors.Email && "is-invalid"}`} id="ProfileEmail" value={values.Email || ""} onChange={handleChange} required/>
                {errors.Email && (<small id="ProfileEmailError" className="form-text text-danger">{errors.Email}</small>)}
            </div>
            <div className="form-group">
                <label htmlFor="ProfileUsername">Username</label>
                <input type="text" name="Username" className={`form-control form-control-sm ${errors.Username && "is-invalid"}`} id="ProfileUsername" value={values.Username || ""} onChange={handleChange} required/>
                {errors.Username && (<small id="ProfileUsernameError" className="form-text text-danger">{errors.Username}</small>)}
            </div>
            <div className="form-group">
                <label htmlFor="ProfilePassword">Password</label>
                <input type="password" name="Password" className={`form-control form-control-sm ${errors.Password && "is-invalid"}`} id="ProfilePassword" value={values.Password || ""} onChange={handleChange} required/>
                {errors.Password && (<small id="ProfilePasswordError" className="form-text text-danger">{errors.Password}</small>)}
            </div>
            <div className="form-group">
                <label htmlFor="ProfileDOB">Date of Birth</label>
                <input type="date" name="DOB" className={`form-control form-control-sm ${errors.DOB && "is-invalid"}`} id="ProfileDOB" value={values.DOB || ""} onChange={handleChange} required/>
                {errors.DOB && (<small id="ProfileDOB" className="form-text text-danger">{errors.DOB}</small>)}
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="ProfileCountry">Country</label>
                    <input type="text" name="Country" className="form-control form-control-sm" id="ProfileCountry" value={location.country || ""} onChange={handleChange} required/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="ProfileState">State</label>
                    <input type="text" name="State" className="form-control form-control-sm" id="ProfileState" value={location.state || ""} onChange={handleChange} required/>
                </div>
            </div>
            <div className="form-group">
                <label className="mr-3">Gender</label>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="Gender" id="ProfileMale" value="Male" onChange={handleChange}/>
                    <label className="form-check-label" htmlFor="ProfileMale">Male</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="Gender" id="ProfileFemale" value="Female" onChange={handleChange}/>
                    <label className="form-check-label" htmlFor="ProfileFemale">Female</label>
                </div>
                {errors.Gender && (<small id="ProfileGenderError" className="form-text text-danger">{errors.Gender}</small>)}
            </div>
            <Button type="submit" variant="success" size="sm" block>Save</Button>
        </form>
    )
}

export default ProfileForm;