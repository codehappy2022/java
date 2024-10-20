import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [accountsPerPage] = useState(6); // Hiển thị 6 tài khoản trên mỗi trang
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/accounts/getAll')
      .then(response => setAccounts(response.data))
      .catch(error => console.error('Error fetching accounts:', error));
  }, []);

  const handleEdit = (id) => {
    navigate(`/accounts/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản không?')) {
      axios.delete(`http://localhost:8080/accounts/delete/${id}`)
        .then(() => {
          setAccounts(accounts.filter(account => account.id !== id));
          toast.success('Tài khoản được xóa thành công!');
        })
        .catch(error => console.error('Lỗi:', error));
    }
  };

  const filteredAccounts = accounts.filter(account =>
    account.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Xác định các tài khoản hiển thị cho trang hiện tại
  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = filteredAccounts.slice(indexOfFirstAccount, indexOfLastAccount);

  // Chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Tính toán tổng số trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredAccounts.length / accountsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Danh sách tài khoản</h2>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập từ khóa tìm kiếm tại đây..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-primary" onClick={() => navigate('/accounts/new')}>
            <i className="fas fa-plus"></i> Thêm tài khoản mới
          </button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="text-center">Tên đăng nhập</th>
            <th className="text-center">Email</th>
            <th className="text-center" style={{ width: '200px' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentAccounts.map(account => (
            <tr key={account.id}>
              <td className="text-center">{account.username}</td>
              <td className="text-center">{account.email}</td>
              <td className="text-center">
                <button className="btn btn-warning me-2" onClick={() => handleEdit(account.id)} style={{ fontSize: '0.7rem' }}>
                  <FontAwesomeIcon icon={faEdit} style={{ fontSize: '0.6rem' }} /> Sửa
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(account.id)} style={{ fontSize: '0.7rem' }}>
                  <FontAwesomeIcon icon={faTrash} style={{ fontSize: '0.6rem' }} /> Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <nav>
        <ul className="pagination justify-content-center">
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <ToastContainer />
    </div>
  );
};

export default AccountList;
