import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleImageClick = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <div style={{ /* styling here */ }}>
            <img
                src={`/Image/${product.image}`}
                alt={product.name}
                onClick={handleImageClick}
                style={{ cursor: 'pointer' }}
            />
            <h2>{product.name}</h2>
            <p>Giá: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Thêm vào giỏ hàng</button>
        </div>
    );
};

export default Product;
