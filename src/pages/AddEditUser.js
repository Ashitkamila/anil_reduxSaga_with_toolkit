import React, { useEffect, useState } from 'react'
import { MDBValidation, MDBInput, MDBBtn, MDBValidationItem } from "mdb-react-ui-kit"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify"
import * as sagaActions from '../redux/sagaActions'

const options = [{
  label: "Active",
  value: 'active'
},
{
  label: "Inactive",
  value: 'inactive'
}
]
const AddEditUser = ({page}) => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    address: "",
    status: ""
  }
  const [formValue, setFormValue] = useState(initialState)
  const [editMode, setEditMode] = useState(false)
  const [statusErrMsg, setStatusErrMsg] = useState(null)
  const { name, email, phone, address, status } = formValue
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.userData)
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      setEditMode(true)
      const singleUsers = users.find(item => item.id === Number(id))
      console.log("users anil",singleUsers);
      setFormValue({ ...singleUsers })
    } else {
      setEditMode(false)
      setFormValue({ ...initialState })
    }
  }, [id])
  const handelSubmit = (e) => {
    if (!status) {
      setStatusErrMsg("Please provide a status")
    }
    if (name && email && phone && address && status) {
      if (!editMode) {
        dispatch({ type: sagaActions.CREATE_USER_START,formValue })
        setTimeout(() => navigate("/"), 1000)
        toast.success("User Added Successfully")
      } else {
        dispatch({type: sagaActions.UPDATE_USER_START, id, formValue })
        setEditMode(false)
        toast.success("User Updated Successfully")
        setTimeout(() => navigate("/"), 500)
      }
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
        <MDBValidationItem className='col-12' feedback='Please provide an address' invalid>
          <MDBInput value={address || ""} name="address" type="text" onChange={onInputChange} required label="Address" />
        </MDBValidationItem>
        <br />
        <select
          style={{ width: '100%', borderRadius: '4px', height: "35px", borderColor: '#83cc5' }}
          onChange={onDroupdownChange}
          value={status}
        >
          <option>Please Select Status</option>
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
            {!editMode ? "Add" : "Update"}
          </MDBBtn>
          <MDBBtn color="danger"
            onClick={() => {
              dispatch({ type: sagaActions.LOAD_USERS_START,page })
              navigate("/home")
            }}
          >
            Go back
          </MDBBtn>
        </div>
      </div>
    </MDBValidation>
  )
}

export default AddEditUser