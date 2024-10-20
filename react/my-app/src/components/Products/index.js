import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Header Component
const Header = () => {
    return (
        <header style={{ background: '#f5f5f5', padding: '10px', textAlign: 'center' }}>
            <h1>Flower Shop</h1>
        </header>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer style={{ background: '#f5f5f5', padding: '10px', textAlign: 'center' }}>
            <p>&copy; 2024 Flower Shop. All Rights Reserved.</p>
        </footer>
    );
};

// Product Component
const Product = ({ product, onPurchase }) => {
    return (
        <div style={{ border: '1px solid #ddd', margin: '10px', padding: '10px', borderRadius: '5px', width: '200px' }}>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: 'auto' }} />
            <h2>{product.name}</h2>
            <p>Price: {product.price}</p>
            <button onClick={() => onPurchase(product.id)}>Buy Now</button>
        </div>
    );
};

// ProductList Component
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/products/getAll');
                setProducts(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handlePurchase = (id) => {
        alert(`You have purchased product with ID: ${id}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {products.map(product => (
                <Product key={product.id} product={product} onPurchase={handlePurchase} />
            ))}
        </div>
    );
};

// Main App Component
const App = () => {
    return (
        <div>
            <Header />
            <ProductList />
            <Footer />
        </div>
    );
};

export default Products;
