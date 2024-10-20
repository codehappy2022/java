import React from 'react';

const CartItem = ({ item }) => {
    return (
        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            
            <span>
                {item.productName} - {item.quantity} x ${item.price.toFixed(2)}
            </span>
        </li>
    );
};

export default CartItem;
