import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OrderItemList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPrint } from '@fortawesome/free-solid-svg-icons';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

const OrderItemList = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderItems();
  }, []);

  const fetchOrderItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/order-items/getAll');
      setOrderItems(response.data);
    } catch (error) {
      console.error('Error fetching order items:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/orderItems/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn xóa mục đơn hàng không?')) {
      try {
        await axios.delete(`http://localhost:8080/order-items/delete/${id}`);
        setOrderItems(orderItems.filter(item => item.id !== id));
        toast.success('Mục đơn hàng được xóa thành công!');
      } catch (error) {
        console.error('Lỗi:', error);
      }
    }
  };

  const handlePrint = (item) => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun("C&C Shop")],
            heading: "Title",
            alignment: "center",
          }),
          new Paragraph({
            children: [new TextRun("HÓA ĐƠN THANH TOÁN")],
            heading: "Heading1",
            alignment: "center",
          }),
          new Paragraph({
            children: [new TextRun(`SỐ HÓA ĐƠN: ${item.id}`)],
            alignment: "center",
          }),
          new Paragraph({
            children: [new TextRun(`Ngày: ${formattedDate} | Giờ: ${formattedTime}`)],
            alignment: "center",
          }),
          new Paragraph(`Mã đơn hàng: ${item.orderId}`),
          new Paragraph(`Số lượng: ${item.quantity}`),
          new Paragraph(`Giá: ${item.price.toFixed(2)} VNĐ`),
          new Paragraph(`Tổng: ${item.total.toFixed(2)} VNĐ`),
        ],
      }],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'hoa_don.docx');
    });
  };

  const filteredOrderItems = orderItems.filter(item => 
    (item.orderId !== null && item.orderId.toString().includes(searchQuery)) ||
    (item.quantity !== null && item.quantity.toString().includes(searchQuery)) ||
    (item.price !== null && item.price.toString().includes(searchQuery)) ||
    (item.total !== null && item.total.toString().includes(searchQuery))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrderItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrderItems.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalRevenue = filteredOrderItems.reduce((acc, item) => acc + (item.total || 0), 0).toFixed(2);

  return (
    <div className="container mt-5">
      <h2>Đơn hàng của bạn!</h2>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Nhập từ khóa..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '250px' }}
        />
       
      </div>

      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th className="table-header">Mã hóa đơn</th>
            <th className="table-header">Số lượng</th>
            <th className="table-header">Giá</th>
            <th className="table-header">Tổng</th>
            <th className="table-header">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.id}>
              <td>{item.orderId}</td>
              <td>{item.quantity}</td>
              <td>{item.price.toFixed(2)} VNĐ</td>
              <td>{item.total.toFixed(2)} VNĐ</td>
              <td>
                
                <button className="btn btn-danger me-2" onClick={() => handleDelete(item.id)}>
                  <FontAwesomeIcon icon={faTrash} /> Xóa
                </button>
                <button className="btn btn-info" onClick={() => handlePrint(item)}>
                  <FontAwesomeIcon icon={faPrint} /> In
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-end mb-3">
        <strong>Tổng doanh thu: </strong>
        <span>{totalRevenue} VNĐ</span>
      </div>

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

export default OrderItemList;
