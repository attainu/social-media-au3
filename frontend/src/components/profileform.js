import React, { useState, useEffect, useContext } from 'react'
import { Alert, Button } from 'react-bootstrap'

import useForm from './useForm'
import validate from './rules/UpdateFormValidationRules'
import { EditContext } from './profile'

const axios = require('axios')

function ProfileForm(props) {

    const { values, errors, handleSubmit, handleChange} = useForm(update, validate);

    const [location, setLocation] = useState({
        country: "",
        state: ""
    });

    const [ fields, setFields ] = useState({
        Name: "",
        Email: "",
        Username: "",
        DOB: "",
        Country: "",
        State: "",
        Gender: ""
    })

    const { allowEdit, setallowEdit } = useContext(EditContext);
    const [error, setError] = useState(false);

    useEffect(() => {
        setFields({
            ...fields,
            Name: props.userdata.Name,
            Email: props.userdata.Email,
            Username: props.userdata.Username,
            DOB: props.userdata.DOB,
            Country: props.userdata.Country,
            State: props.userdata.State,
            Gender: props.userdata.Gender
        })
    }, [])

    function updateLocation() {
        axios.get('https://freegeoip.app/json/')
        .then(res => {
            setLocation({...fields, Country: res.data.country_name, State: res.data.region_name});
        })
        .catch(err => console.log(err));
    }

    function update() {
        setallowEdit(true);
        const data = {...values, Country: location.country, State: location.state};
        axios.put(`/api/profile/update/info/${JSON.parse(localStorage.getItem('user')).Email}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
            }
        })
        .then(res => setError(false))
        .catch(err => setError(true));
    }

    return (
        <form onSubmit={handleSubmit}>
            {
                error && (
                    <Alert variant="danger">
                        Failed to update: Try relogin
                    </Alert>
                )
            }
            <div className="form-group">
                <label htmlFor="ProfileName">Full Name</label>
                <input type="text" name="Name" className={`form-control form-control-sm ${errors.Name && "is-invalid"}`} id="ProfileName" value={values.Name || (values.Name = fields.Name)} onChange={handleChange} required readOnly={allowEdit}/>
                {errors.Name && (<small id="ProfileNameError" className="form-text text-danger">{errors.Name}</small>)}
            </div>
            <div className="form-group">
                <label htmlFor="ProfileEmail">Email address</label>
                <input type="email" name="Email" className={`form-control form-control-sm ${errors.Email && "is-invalid"}`} id="ProfileEmail" value={values.Email || (values.Email = fields.Email)} onChange={handleChange} required readOnly/>
                {errors.Email && (<small id="ProfileEmailError" className="form-text text-danger">{errors.Email}</small>)}
            </div>
            <div className="form-group">
                <label htmlFor="ProfileUsername">Username</label>
                <input type="text" name="Username" className={`form-control form-control-sm ${errors.Username && "is-invalid"}`} id="ProfileUsername" value={values.Username || (values.Username = fields.Username)} onChange={handleChange} required readOnly={allowEdit}/>
                {errors.Username && (<small id="ProfileUsernameError" className="form-text text-danger">{errors.Username}</small>)}
            </div>
            <div className="form-group">
                <label htmlFor="ProfilePassword">Password</label>
                <input type="password" name="Password" className={`form-control form-control-sm ${errors.Password && "is-invalid"}`} id="ProfilePassword" value={values.Password || ""} onChange={handleChange} readOnly={allowEdit}/>
                {errors.Password && (<small id="ProfilePasswordError" className="form-text text-danger">{errors.Password}</small>)}
            </div>
            <div className="form-group">
                <label htmlFor="ProfileDOB">Date of Birth</label>
                <input type="date" name="DOB" className={`form-control form-control-sm ${errors.DOB && "is-invalid"}`} id="ProfileDOB" value={values.DOB || (values.DOB = fields.DOB)} onChange={handleChange} required readOnly={allowEdit}/>
                {errors.DOB && (<small id="ProfileDOB" className="form-text text-danger">{errors.DOB}</small>)}
            </div>
            <div className="form-row align-items-end">
                <div className={allowEdit ? "form-group col-md-6 col-sm-6" : "form-group col-md-5 col-sm-5"}>
                    <label htmlFor="ProfileCountry">Country</label>
                    <input type="text" name="Country" className="form-control form-control-sm" id="ProfileCountry" value={location.country || (location.country = fields.Country)} readOnly/>
                </div>
                <div className="form-group col-md-6 col-sm-6">
                    <label htmlFor="ProfileState">State</label>
                    <input type="text" name="State" className="form-control form-control-sm" id="ProfileState" value={location.state || (location.state = fields.State)} readOnly/>
                </div>
                {
                    allowEdit ? ("") : (
                        <div className="form-group col-md-1 col-sm-1">
                            <Button variant='warning' size='sm' onClick={() => updateLocation()}><i style={{pointerEvents: "none"}} className="fas fa-angle-up"/></Button>
                        </div>
                    )
                }
            </div>
            <div className="form-group">
                <label className="mr-3">Gender</label>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="Gender" id="ProfileMale" value="Male" onChange={(e) => setFields({...fields, Gender: e.target.value})} checked={(fields.Gender === "Male") && (values.Gender = fields.Gender)} disabled={allowEdit}/>
                    <label className="form-check-label" htmlFor="ProfileMale">Male</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="Gender" id="ProfileFemale" value="Female" onChange={(e) => setFields({...fields, Gender: e.target.value})} checked={(fields.Gender === "Female") && (values.Gender = fields.Gender)} disabled={allowEdit}/>
                    <label className="form-check-label" htmlFor="ProfileFemale">Female</label>
                </div>
                {errors.Gender && (<small id="ProfileGenderError" className="form-text text-danger">{errors.Gender}</small>)}
            </div>
            {
                allowEdit ? ("") : (<Button type='submit' variant='success' size='sm' block>Save</Button>)
            }
        </form>
    )
}

export default ProfileForm;