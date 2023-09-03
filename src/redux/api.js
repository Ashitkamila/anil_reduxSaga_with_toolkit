import axios from "axios"

export const loadUsersApi = async (page) => {
  return await axios.get(`http://localhost:5000/users?_page=${page.page}&_limit=3`)
}


export const createUsersApi = async (user) => {
   console.log('CREATE user api',user);
  return await axios.post("http://localhost:5000/users", user)
}


export const deleteUsersApi = async (userId) => {
  // console.log('userId',userId);
  return await axios.delete(`http://localhost:5000/users/${userId}`)
}


export const updateUsersApi = async (userId, userInfo) => {
  return await axios.put(`http://localhost:5000/users/${userId}`, userInfo)
}


export const searchUsersApi = async (query) => {
  return await axios.get(`http://localhost:5000/users?q=${query.searchTerm}`)
}


export const filterUsersApi = async (value) => {
  return await axios.get(`http://localhost:5000/users?status=${value.value}`)
}


export const sortUsersApi = async (value) => {
  return await axios.get(`http://localhost:5000/users?_sort=${value.sortInput}&_order=asc`)
}