import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ProductForm.module.scss';

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: '', // Đổi thành chuỗi để chứa đường dẫn hình ảnh
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/products/getById/${id}`)
        .then(response => setProduct(response.data))
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const request = id
      ? axios.put(`http://localhost:8080/products/update/${id}`, product)
      : axios.post('http://localhost:8080/products/create', product);

    request
      .then(() => {
        toast.success(id ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!');
        navigate('/products');
      })
      .catch(error => {
        console.error('Error saving product:', error.response ? error.response.data : error.message);
        toast.error('Đã xảy ra lỗi trong quá trình lưu sản phẩm.');
      });
  };

  return (
    <div className="container mt-5">
      <h2>{id ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Tên sản phẩm</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Mô tả</label>
          <input type="text" name="description" value={product.description} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Giá</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Số lượng</label>
          <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Đường dẫn hình ảnh</label>
          <input type="text" name="image" value={product.image} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProductForm;