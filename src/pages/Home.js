import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBTooltip, MDBSpinner, MDBIcon,
  MDBContainer, MDBRow, MDBCol, MDBBtnGroup
} from "mdb-react-ui-kit"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import * as sagaActions from '../redux/sagaActions'
import { Pagination } from '@mui/material'


const Home = ({page, setPage}) => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.userData)
  const users = useSelector(state => state.userData.users)
  const sortOption = ["Name", "Email", "Phone", "Address", "Status"]
  const [sortValue, setSortValue] = useState("")
  const onSortChange = (e) => {
    let sortValue = e.target.value.toLowerCase().split(" ").map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(" ")
    if (sortOption.includes(sortValue)) {
      setSortValue(e.target.value)
      const sortInput = e.target.value
      dispatch({ type: sagaActions.SORT_USER_START, sortInput })
    } else {
      dispatch({ type: sagaActions.LOAD_USERS_START ,page })
      setSortValue("")
    }

  }
  // const pageValue=page+1
  useEffect(() => {
    dispatch({ type: sagaActions.LOAD_USERS_START,page  })
  }, [page])

  useEffect(() => {
    error && toast.error(error)
  }, [error])
  if (loading) {
    return (
      <MDBSpinner style={{ marginTop: '150px' }} role="status">
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  const handelDelete = (id) => {
    if (window.confirm('Are you sure that you want to delete the user ?')) {
      dispatch({ type: sagaActions.DELETE_USER_START, id })
      toast.success('User Delete Successfully ')
    }
  };
  const onFilterChange = (value) => {
    dispatch({ type: sagaActions.FILTER_USER_START, value })
  }

  return (
    <MDBContainer className='mb-8'>
      <div className='container mt-5' >
        <MDBTable>
          <MDBTableHead dark>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
              <th scope="col">Status</th>
            </tr>
          </MDBTableHead>
          {

            users.length === 0 ? (
              <MDBTableBody className='align-center mb-0'>
                <tr>
                  <td colSpan={8} className='text-center mb-0'>No Data Found</td>
                </tr>
              </MDBTableBody>
            ) : (users.map((item, index) => {
              return (
                <MDBTableBody key={index}>
                  <tr>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{item.status}</td>
                    <td>
                      <MDBBtn className='m-1' tag="a" color="none" onClick={() => { handelDelete(item.id) }}>
                        <MDBTooltip title="Delete" tag="a">
                          <MDBIcon fas icon='trash' style={{ color: "#dd4b39" }} size="lg" />
                        </MDBTooltip>
                      </MDBBtn>{"  "}

                      <Link to={`/editUser/${item.id}`}>
                        <MDBTooltip title="Edit" tag="a">
                          <MDBIcon fas icon='pen' style={{ color: "#55acee", marginBottom: '10px' }} size="lg" />
                        </MDBTooltip>
                      </Link>{"  "}{"  "}

                    </td>
                  </tr>
                </MDBTableBody>
              )
            }))
          }
        </MDBTable>
      </div>

      <Pagination
        count={10}
        color='secondary'
        variant='outlined'
        page={page}
        onChange={(e, v) => {
          setPage(v)
          dispatch({ type: sagaActions.LOAD_USERS_START, page })
        }}
      />

      {users.length > 0 && (
        <MDBRow>
          <MDBCol size="8">
            <h5>Sort By:</h5>
            <select style={{ width: "50%", borderRadius: '2px', height: '35px' }}
              value={sortValue} onChange={onSortChange}>
              <option>Please Select Value</option>
              {sortOption.map((item, index) => {
                return (
                  <option value={item.toLowerCase()} key={index}>
                    {item}
                  </option>
                )
              })}
            </select>
          </MDBCol>
          <MDBCol size="4">
            <h5>Sort By Status:</h5>
            <MDBBtnGroup>
              <MDBBtn color="success" onClick={() => { onFilterChange("Active") }}>Active</MDBBtn>
              <MDBBtn color="danger" onClick={() => { onFilterChange("Inactive") }} style={{ marginLeft: "2px" }}>Inactive</MDBBtn>
            </MDBBtnGroup>
          </MDBCol>
        </MDBRow>
      )}
    </MDBContainer>


  )
}

export default Home