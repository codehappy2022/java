import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const Cart = ({ cartItems, onRemove }) => {
    const [quantities, setQuantities] = useState({});
    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        address: '',
        email: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [orderDetails, setOrderDetails] = useState([]);
    const [orderDate, setOrderDate] = useState('');

    useEffect(() => {
        try {
            const storedCustomerInfo = JSON.parse(localStorage.getItem('customerInfo'));
            if (storedCustomerInfo) {
                setCustomerInfo(storedCustomerInfo);
            }
        } catch (error) {
            console.error("Không thể phân tích thông tin khách hàng từ localStorage:", error);
        }

        if (!isCheckedOut) {
            const initialQuantities = {};
            cartItems.forEach(item => {
                initialQuantities[item.id] = (initialQuantities[item.id] || 0) + 1;
            });
            setQuantities(initialQuantities);
        }
    }, [cartItems, isCheckedOut]);

    const totalAmount = useMemo(() => {
        return cartItems.reduce((total, item) => {
            const quantity = quantities[item.id] || 0;
            return total + item.price * quantity;
        }, 0);
    }, [quantities, cartItems]);

    const handleIncrease = (id) => {
        const confirmAdd = window.confirm("Bạn có muốn thêm sản phẩm này vào giỏ không?");
        if (confirmAdd) {
            setQuantities({ ...quantities, [id]: (quantities[id] || 0) + 1 });
        }
    };

    const handleDecrease = (id) => {
        if ((quantities[id] || 1) > 1) {
            setQuantities({ ...quantities, [id]: quantities[id] - 1 });
        }
    };

    const handleCheckout = () => {
        if (Object.values(customerInfo).some(field => field.trim() === '')) {
            setErrorMessage('Vui lòng điền đầy đủ thông tin giao hàng.');
            return;
        }
        confirmCheckout();
    };

    const confirmCheckout = async () => {
        const orderSummary = cartItems.map(item => {
            const quantity = quantities[item.id] || 0;
            return {
                ...item,
                quantity,
                total: (item.price * quantity).toFixed(2),
            };
        });

        setOrderDetails(orderSummary);
        setOrderDate(new Date().toLocaleString());
        setIsCheckedOut(true);

        // Gửi yêu cầu thanh toán đến backend
        try {
            const orderData = {
                customerName: customerInfo.name,
                customerPhone: customerInfo.phone,
                customerAddress: customerInfo.address,
                customerEmail: customerInfo.email,
                orderDetails: orderSummary.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
price: item.price,
                })),
            };

            await axios.post('http://localhost:8080/api/checkout', orderData); // Cập nhật đường dẫn API phù hợp
            orderSummary.forEach(item => onRemove(item.id)); // Xóa sản phẩm khỏi giỏ hàng
        } catch (error) {
            setErrorMessage('Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo({ ...customerInfo, [name]: value });
    };

    const handleSave = () => {
        if (Object.values(customerInfo).some(field => field.trim() === '')) {
            setErrorMessage('Vui lòng điền đầy đủ thông tin trước khi lưu.');
            return;
        }
        localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
        setIsEditing(false);
        setErrorMessage('');
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    if (isCheckedOut) {
        return (
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                    <h2>Cảm ơn bạn đã mua hàng!</h2>
                    <h3>Chi tiết đơn hàng:</h3>
                    <p><strong>Ngày đặt hàng:</strong> {orderDate}</p>
                    <table className="table table-striped" style={{ width: '100%', margin: '20px 0' }}>
                        <thead>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3>Tổng cộng: {totalAmount.toFixed(2)}</h3>
                </div>

                <div style={{ marginLeft: '20px', width: '300px' }}>
                    <div style={{ border: '2px solid blue', padding: '10px', borderRadius: '5px' }}>
                        <h3>Thông tin khách hàng</h3>
                        <label>
                            <strong>Tên: </strong> {customerInfo.name || 'Chưa có tên'}
                        </label><br />
                        <label>
                            <strong>Số điện thoại: </strong> {customerInfo.phone || 'Chưa có số điện thoại'}
</label><br />
                        <label>
                            <strong>Địa chỉ: </strong> {customerInfo.address || 'Chưa có địa chỉ'}
                        </label><br />
                        <label>
                            <strong>Email: </strong> {customerInfo.email || 'Chưa có email'}
                        </label>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', padding: '20px' }}>
            <div style={{ flex: 1 }}>
                <h2>Giỏ hàng của bạn</h2>
                {cartItems.length === 0 ? (
                    <p>Giỏ hàng của bạn đang trống.</p>
                ) : (
                    <div>
                        <table className="table table-striped" style={{ width: '100%', margin: '20px 0' }}>
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.price}.00</td>
                                        <td>
                                            <button onClick={() => handleDecrease(item.id)}>-</button>
                                            {quantities[item.id] || 0}
                                            <button onClick={() => handleIncrease(item.id)}>+</button>
                                        </td>
                                        <td>{(item.price * (quantities[item.id] || 0)).toFixed(2)}</td>
                                        <td>
                                            <button 
                                                onClick={() => {
                                                    const confirmRemove = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
                                                    if (confirmRemove) {
                                                        onRemove(item.id);
                                                    }
                                                }} 
                                                style={{ 
                                                    background: 'transparent', 
                                                    border: 'none', 
                                                    cursor: 'pointer', 
                                                    color: 'red', 
                                                    fontSize: '20px', 
                                                    lineHeight: '1' 
                                                }}
                                                aria-label="Xóa sản phẩm"
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h3>Tổng cộng: {totalAmount.toFixed(2)}.00</h3>
                        <button 
                            onClick={handleCheckout} 
                            className="btn btn-primary"
                            disabled={cartItems.length === 0} // Disable if cart is empty
                        >
                            Thanh toán
                        </button>
                    </div>
                )}
            </div>

            <div style={{ marginLeft: '20px', width: '300px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '12px' }}>Giao hàng đến</h3>
                    <button 
                        onClick={toggleEdit} 
                        className="btn btn-secondary" 
                        style={{ 
                            display: 'flex',
                            fontSize: '12px', 
                            padding: '5px 10px', 
                            backgroundColor: 'transparent', 
                            border: 'none', 
                            color: 'blue',
                            cursor: 'pointer' 
                        }}
                    >
                        Thay đổi
                    </button>
                </div>

                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="name"
                            placeholder="Họ và tên"
                            value={customerInfo.name}
                            onChange={handleInputChange}
                            style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Số điện thoại"
                            value={customerInfo.phone}
                            onChange={handleInputChange}
                            style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Địa chỉ giao hàng"
                            value={customerInfo.address}
                            onChange={handleInputChange}
                            style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
                        />
                        <input
                            type="email"
                            name="email"
placeholder="Email"
                            value={customerInfo.email}
                            onChange={handleInputChange}
                            style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
                        />
                        <button onClick={handleSave} className="btn btn-success">
                            Lưu
                        </button>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </>
                ) : (
                    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                        <p><strong>Tên: </strong>{customerInfo.name || 'Chưa có tên'}</p>
                        <p><strong>Số điện thoại: </strong>{customerInfo.phone || 'Chưa có số điện thoại'}</p>
                        <p><strong>Địa chỉ: </strong>{customerInfo.address || 'Chưa có địa chỉ'}</p>
                        <p><strong>Email: </strong>{customerInfo.email || 'Chưa có email'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;