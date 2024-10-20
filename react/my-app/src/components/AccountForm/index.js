// src/components/AccountForm.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccountForm = () => {
  const [account, setAccount] = useState({
    username: '',
    password: '',
    email: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/accounts/getById/${id}`)
        .then(response => setAccount(response.data))
        .catch(error => console.error('Error fetching account:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount(prevAccount => ({ ...prevAccount, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id
      ? axios.put(`http://localhost:8080/accounts/update/${id}`, account)
      : axios.post('http://localhost:8080/accounts/create', account);

    request
      .then(() => {
        toast.success(id ? 'Cập nhật tài khoản thành công!' : 'Thêm tài khoản thành công!');
        navigate('/accounts');
      })
      .catch(error => {
        console.error('Error saving account:', error);
        toast.error('Đã xảy ra lỗi trong quá trình lưu tài khoản.');
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{id ? 'Chỉnh sửa tài khoản' : 'Thêm tài khoản mới'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Tên đăng nhập</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={account.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={account.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={account.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          {id ? 'Cập nhật tài khoản' : 'Thêm tài khoản'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AccountForm;
