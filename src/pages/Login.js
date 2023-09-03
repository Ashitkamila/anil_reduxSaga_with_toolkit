import React, { useState } from 'react'
import { MDBValidation, MDBInput, MDBBtn, MDBValidationItem } from "mdb-react-ui-kit"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [formValue, setFormValue] = useState({
        name: "",
        email: "",
        phone: "",
        status: ""
    })
    const [options, setOptions] = useState([{
        label: "Admin",
        value: 'admin'
    },
    {
        label: "User",
        value: 'user'
    }
    ])
    const [editMode, setEditMode] = useState(false)
    const [statusErrMsg, setStatusErrMsg] = useState(null)
    const { name, email, phone,  status } = formValue
    const navigate = useNavigate()
    const handelSubmit = (e) => {
        if (!status) {
            setStatusErrMsg("Please provide a role")
        }
        if (name && email && phone && status) {
           console.log('formvalue',formValue);
           navigate('/home')
        }
        e.preventDefault()
    }
    const onInputChange = (e) => {
        let { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }
    const onDroupdownChange = (e) => {
        setStatusErrMsg(null)
        setFormValue({ ...formValue, status: e.target.value })
    }
    return (
        <MDBValidation className='row g-3' style={{ marginTop: '100px' }} noValidate
            onSubmit={(e) => handelSubmit(e)}>
            <p className='fs-2 fw-bold'>{!editMode ? "Add User Detail" : "Update User Detail"}</p>

            <div style={{ margin: 'auto', padding: "15px", maxWidth: "400px", alignItems: 'center' }}>
                <MDBValidationItem className='col-12' feedback='Please provide a name' invalid>
                    <MDBInput value={name || ""} name="name" type="text" onChange={onInputChange} required label="Name" />
                </MDBValidationItem>
                <br />
                <MDBValidationItem className='col-12' feedback='Please provide an email' invalid>
                    <MDBInput value={email || ""} name="email" type="email" onChange={onInputChange} required label="Email" />
                </MDBValidationItem>
                <br />
                <MDBValidationItem className='col-12' feedback='Please provide a phone number' invalid>
                    <MDBInput value={phone || ""} name="phone" type="number" onChange={onInputChange} required label="Phone" />
                </MDBValidationItem>
                <br />
                <select
                    style={{ width: '100%', borderRadius: '4px', height: "35px", borderColor: '#83cc5' }}
                    onChange={onDroupdownChange}
                    value={status}
                >
                    <option>Please Select Role</option>
                    {options.map((option, index) => {
                        return (<option value={option.label || ""} key={index}>
                            {option.label}
                        </option>
                        )
                    })}
                </select>
                {statusErrMsg && (
                    <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }}>
                        {statusErrMsg}
                    </div>
                )}
                <br />
                <br />
                <div className='col-12'>
                    <MDBBtn style={{ marginRight: "10px" }} type="submit">
                        Log In
                    </MDBBtn>
                </div>
            </div>
        </MDBValidation>
    )
}

export default Login