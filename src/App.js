import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/Header';
import About from './pages/About';
import AddEditUser from './pages/AddEditUser';
import Home from './pages/Home';
import Login from './pages/Login';
import UserInfo from './pages/UserInfo';

function App() {
  const [page, setPage] = useState(1)
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <Header page={page} setPage={setPage} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home page={page} setPage={setPage} />} />
          <Route path="/addUser" element={<AddEditUser page={page} />} />
          <Route path="/editUser/:id" element={<AddEditUser page={page} />} />
          <Route path="/userInfo/:id" element={<UserInfo />} />
          <Route path="/about" element={<About />} />
        </Routes>

      </div>
    </BrowserRouter>

  );
}

export default App;
