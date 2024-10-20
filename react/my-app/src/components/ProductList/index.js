import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // Hiển thị 6 sản phẩm trên mỗi trang
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/products/getAll')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm không?')) {
      axios.delete(`http://localhost:8080/products/delete/${id}`)
        .then(() => {
          setProducts(products.filter(product => product.id !== id));
          toast.success('Sản phẩm được xóa thành công!');
        })
        .catch(error => console.error('Lỗi:', error));
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Xác định các sản phẩm hiển thị cho trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Tính toán tổng số trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: '#003366' }}>Danh sách sản phẩm</h2>
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Nhập từ khóa tìm kiếm tại đây..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '33%' }} // Đặt chiều rộng của ô tìm kiếm
        />
        <div className="ms-auto">
          <button className="btn btn-primary" onClick={() => navigate('/products/new')}>
            <i className="fas fa-plus"></i> Thêm sản phẩm mới
          </button>
        </div>
      </div>

      <table className="table table-hover">
        <thead>
          <tr className="text-center">
            <th style={{ width: '150px' }}>Hình minh họa</th>
            <th>Tên sản phẩm</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th style={{ width: '200px' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product.id}>
              <td>
                <img
                  src={`/Image/${product.image}`} // Đường dẫn hình ảnh từ cơ sở dữ liệu
                  alt={product.name}
                  style={{ width: '100px', borderRadius: '8px' }}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price.toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(product.id)}>
                  <FontAwesomeIcon icon={faEdit} /> Sửa
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                  <FontAwesomeIcon icon={faTrash} /> Xóa
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

export default ProductList;
