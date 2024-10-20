import React from 'react';
import './CartButton.css'; // Import file CSS cho nút giỏ hàng

const CartButton = ({ itemCount, onClick }) => {
    return (
        <div className="cart-button" onClick={onClick}>
            <i className="fas fa-shopping-cart"></i>
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
        </div>
    );
};

export default CartButton;
