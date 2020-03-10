import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Spinner } from 'react-bootstrap'

import Authorize from '../authorize'

const axios = require('axios')

function Search() {

    const { name } = useParams();
    const [error, setError] = useState(true);
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get(`/api/search/username/${name}`)
        .then(res => {
            setError(false);
            setUser(res.data);
        })
        .catch(err => setError(true))
    }, [])
    
    return (
        <Container>
            <Authorize/>
            <Row className="justify-content-around pt-3">
                {
                    error ? "No friend found" : (
                        user.length ? (
                            user.map((item, indx) => (
                                <div className="card mb-3" key={indx}>
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img src={item.Picture} className="card-img rounded-sm p-3" alt="Profile Picture"/>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{item.Name}</h5>
                                                <p className="card-text">{item.State}, {item.Country}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Spinner animation="border" variant="primary"/>
                        )
                    )
                }
            </Row>
        </Container>
    )
}

export default Search;