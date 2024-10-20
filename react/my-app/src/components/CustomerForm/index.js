import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/customers/getById/${id}`)
        .then(response => {
          const customer = response.data;
          setValue('name', customer.name);
          setValue('phone', customer.phone);
          setValue('birthDay', new Date(customer.birthday).toISOString().split('T')[0]);
          setValue('address', customer.address);
          setValue('identificationNumber', customer.identificationnumber);
        })
        .catch(error => console.error('Error fetching customer:', error));
    }
  }, [id, setValue]);

  const onSubmit = (data) => {
    const customer = {
      ...data,
      birthday: data.birthDay,
      identificationnumber: data.identificationNumber
    };

    const request = id 
      ? axios.put(`http://localhost:8080/customers/update/${id}`, customer)
      : axios.post('http://localhost:8080/customers/create', customer);

    request
      .then(() => {
        toast.success(`Customer ${id ? 'updated' : 'created'} successfully!`);
        setTimeout(() => navigate('/'), 2000);
      })
      .catch(error => console.error(`Error ${id ? 'updating' : 'creating'} customer:`, error));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-info">{id ? 'Cập nhật thông tin khách hàng' : 'Thêm khách hàng'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="shadow p-4 bg-light rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label text-secondary">Họ tên</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label text-secondary">Số điện thoại</label>
          <input
            type="text"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            id="phone"
            {...register('phone', { required: 'Phone is required' })}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="birthDay" className="form-label text-secondary">Ngày sinh</label>
          <input
            type="date"
            className={`form-control ${errors.birthDay ? 'is-invalid' : ''}`}
            id="birthDay"
            {...register('birthDay', { required: 'Birth Date is required' })}
          />
          {errors.birthDay && <div className="invalid-feedback">{errors.birthDay.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label text-secondary">Địa chỉ</label>
          <input
            type="text"
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            id="address"
            {...register('address', { required: 'Address is required' })}
          />
          {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="identificationNumber" className="form-label text-secondary">Identification Number</label>
          <input
            type="text"
            className={`form-control ${errors.identificationNumber ? 'is-invalid' : ''}`}
            id="identificationNumber"
            {...register('identificationNumber', { required: 'Identification Number is required' })}
          />
          {errors.identificationNumber && <div className="invalid-feedback">{errors.identificationNumber.message}</div>}
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary me-2">Save</button>
          <button type="button" className="btn btn-danger" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CustomerForm;
