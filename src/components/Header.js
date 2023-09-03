import { MDBBtn, MDBCollapse, MDBContainer, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarLink, MDBNavbarNav, MDBNavbarToggler } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom"
import * as sagaActions from '../redux/sagaActions'
const Header = ({page,setPage}) => {
    const [showBasic, setShowBasic] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const dispatch = useDispatch()
    const handelSubmit = (e) => {
        dispatch({ type: sagaActions.SEARCH_USER_START, searchTerm })
        setSearchTerm("")
        e.preventDefault()
    }
    return (
        <>
            <MDBNavbar expand="lg" light bgColor='primary'>
                <MDBContainer fluid>
                    <MDBNavbarBrand className='text-white'>
                        <span style={{ marginRight: '10px' }}>
                            <MDBIcon fas icon="book-open" />
                        </span>
                        Contact
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        aria-controls='navbar'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        className='text-white'
                        onClick={() => { setShowBasic(!showBasic) }}
                    >
                        <MDBIcon fas icon='bars' />
                    </MDBNavbarToggler>
                    <MDBCollapse navbar show={showBasic}>
                        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                            <MDBNavbarItem>
                                <MDBNavbarLink className='nav-link'>
                                    <NavLink to="/" className='text-white'>
                                        Home
                                    </NavLink>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink className='nav-link'>
                                    <NavLink to="/addUser" className='text-white'>
                                        Add User
                                    </NavLink>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink className='nav-link'>
                                    <NavLink to="/about" className='text-white'>
                                        About
                                    </NavLink>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                        <form className='d-flex input-group w-auto' onSubmit={handelSubmit}>
                            <input className='form-control' type='text' placeholder='Search Name...'
                                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            <MDBBtn color='dark' type="submit">Search</MDBBtn>

                        </form>
                        <MDBBtn color='info' style={{marginLeft:'4px'}} 
                                onClick={() => {
                                    dispatch({ type: sagaActions.LOAD_USERS_START ,page})
                                    setPage(1)
                                    }}>
                                Reset
                            </MDBBtn>

                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    )
}

export default Header