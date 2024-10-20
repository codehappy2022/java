import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Header Component
const Header = () => {
    const buttonStyle = {
        margin: '0 15px',
        padding: '10px 15px',
        backgroundColor: '#00BFFF',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease'
    };

    const handleMouseEnter = (e) => {
        e.target.style.backgroundColor = '#008CBA';
    };

    const handleMouseLeave = (e) => {
        e.target.style.backgroundColor = '#00BFFF';
    };

    return (
        <header style={{ background: '#f5f5f5', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: 0 }}>Flower Shop</h1>
            <nav style={{ display: 'flex', alignItems: 'center' }}>
                <Link 
                    to="/products" 
                    style={buttonStyle} 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Danh mục sản phẩm
                </Link>
                <Link 
                    to="/contact" 
                    style={buttonStyle} 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Liên hệ
                </Link>
                <Link 
                    to="/cart" 
                    style={{ margin: '0 15px', color: 'black', fontSize: '1.5em' }} 
                >
                    <i className="fas fa-shopping-cart"></i>
                </Link>
            </nav>
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
        <div style={{
            border: '1px solid #ddd',
            margin: '10px',
            padding: '10px',
            borderRadius: '5px',
            width: '220px',
            height: '300px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <img 
                src={`/Image/${product.image}`}
                alt={product.name}
                style={{ 
                    width: '180px', 
                    height: '180px', 
                    display: 'block', 
                    margin: '0 auto',
                    transition: 'transform 0.3s ease'
                }}
                className="product-image"
            />
            <h2 style={{ fontSize: '1.2em' }}>{product.name}</h2>
            <p style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Price: ${product.price}
                <button 
                    onClick={() => onPurchase(product.id)} 
                    style={{
                        backgroundColor: 'orange',
                        color: 'white',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'blue'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'orange'}
                >
                    Buy Now
                </button>
            </p>
        </div>
    );
};

// ProductList Component
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

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

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ padding: '40px 0' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {currentProducts.map((product) => (
                    <Product key={product.id} product={product} onPurchase={handlePurchase} />
                ))}
            </div>
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <button 
                    disabled={currentPage === 1} 
                    onClick={() => setCurrentPage(currentPage - 1)}
                    style={{ margin: '0 10px' }}
                >
                    Previous
                </button>
                <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
                <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    style={{ margin: '0 10px' }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

// Contact Component
const Contact = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Liên hệ với chúng tôi</h2>
            <p>Vị trí: Đại học Đồng Tháp</p>
            <p>Địa chỉ: 783 Nguyễn Huệ, Phường 6, TP. Cao Lãnh, Đồng Tháp</p>
            <p>Điện thoại: (0277) 3 868 666</p>
            <p>Email: info@duythap.edu.vn</p>
        </div>
    );
};

// Main App Component
const Page = () => {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<div>Giỏ hàng của bạn</div>} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default Page;
