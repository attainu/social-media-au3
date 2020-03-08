import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from "react-bootstrap"

function NavBar() {

    const [ name, setName ] = useState();

    return (
        <Navbar collapseOnSelect expand="xl" style={{background:"#46AFB9"}} variant="dark" sticky="top">
            <Navbar.Brand href="/app/home">socialme</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"> 
                    <div className="input-group mt-1">
                        <input type="text" size="40" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Search name" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <div className="input-group-append">
                            <Link className="btn btn-light" to={`/search/${name}`}><span className="fa fa-x fa-search"/></Link>
                        </div>
                    </div>
                </Nav>
                <Nav>
                    <NavDropdown title="Me" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="/logout">Sign Out</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/messenger">Messenger</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;