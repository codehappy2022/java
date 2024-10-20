import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomerList.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(5); // Số lượng khách hàng hiển thị trên mỗi trang
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/customers/getAll')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  const handleEdit = (id) => {
    navigate(`/customers/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn xóa khách hàng không?')) {
      axios.delete(`http://localhost:8080/customers/delete/${id}`)
        .then(() => {
          setCustomers(customers.filter(customer => customer.id !== id));
          toast.success('Khách hàng được xóa thành công!');
        })
        .catch(error => console.error('Lỗi:', error));
    }
  };

  const handleExportExcel = () => {
    const exportData = customers.map(customer => ({
      Họ_tên: customer.name,
      Số_điện_thoại: customer.phone,
      Ngày_sinh: new Date(customer.birthday).toLocaleDateString(),
      Địa_chỉ: customer.address,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Khách Hàng');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'khach_hang.xlsx');
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.birthday.includes(searchQuery) ||
    customer.address.toLowerCase().includes(searchQuery)
  );

  // Logic phân trang
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h2>Danh sách khách hàng</h2>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Nhập từ khóa..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '250px' }}
        />
        <button className="btn btn-primary" onClick={() => navigate('/customers/new')} style={{ width: '200px' }}>
          <i className="fas fa-plus"></i> Thêm khách hàng
        </button>
      </div>

      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th className="table-header">Họ tên</th>
            <th className="table-header">Số điện thoại</th>
            <th className="table-header">Ngày sinh</th>
            <th className="table-header">Địa chỉ</th>
            <th className="table-header">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{new Date(customer.birthday).toLocaleDateString()}</td>
              <td>{customer.address}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(customer.id)}>
                  <FontAwesomeIcon icon={faEdit} /> Sửa
                </button>
                <button className="btn btn-danger me-2" onClick={() => handleDelete(customer.id)}>
                  <FontAwesomeIcon icon={faTrash} /> Xóa
                </button>
                <button className="btn btn-success" onClick={handleExportExcel}>
                  <FontAwesomeIcon icon={faFileExcel} /> Xuất Excel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages).keys()].map(number => (
            <li key={number + 1} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
              <button onClick={() => paginate(number + 1)} className="page-link">
                {number + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <ToastContainer />
    </div>
  );
};

export default CustomerList;
