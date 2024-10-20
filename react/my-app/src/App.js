import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from 'react-router-dom';
import './App.css'; // Hoặc tên file CSS của bạn
import Cart from './Cart'; // Import component Cart
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify'; // Nếu bạn đang sử dụng Toast




// Header Component
const Header = ({ onSearch, onFilter }) => {
  const buttonStyle = {
    margin: '0 5px',
    padding: '8px 12px',
    backgroundColor: '#0066cc',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize: '14px',
  };

  const searchStyle = {
    width: '400px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    padding: '10px 40px 10px 15px', // Thêm padding bên trái để cho biểu tượng
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    fontSize: '14px',
    position: 'relative',
  };

  const cartIconStyle = {
    fontSize: '1.2em',
    color: '#0066cc',
    border: '2px solid #0066cc',
    borderRadius: '50%',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '10px',
  };
  return (
    <div>
      <header style={{
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link to="/" style={{ marginRight: 'auto' }}>
          <img
            src="/Image/logo1.png"
            alt="Flower Shop Logo"
            style={{ width: '60px', height: '60px' }}
          />
        </Link>
        <div style={{ flexGrow: 1, textAlign: 'center' }}>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            onChange={(e) => onSearch(e.target.value)}
            className="form-control"
            style={searchStyle}
          />
          <i className="" style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#aaa',
          }}></i>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <Link to="/products" className="btn" style={buttonStyle}>Trang chủ</Link>
          <Link to="/contact" className="btn" style={buttonStyle}>Liên hệ</Link>
          <Link to="/cart" style={cartIconStyle}>
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </div>
      </header>

      {/* Slider hình ảnh */}
      <div id="flowerShopCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/Image/br3.png" className="d-block w-100" style={{ height: '400px', objectFit: 'cover' }} alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src="/Image/br2.png" className="d-block w-100" style={{ height: '400px', objectFit: 'cover' }} alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src="/Image/br1.jpg" className="d-block w-100" style={{ height: '400px', objectFit: 'cover' }} alt="Slide 3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#flowerShopCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#flowerShopCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Tiêu đề các sản phẩm */}
      <h3 style={{ textAlign: 'center', margin: '20px 0', color: 'darkblue', fontSize: '20px' }}>
        Các sản phẩm của cửa hàng
      </h3>

      {/* Danh mục sản phẩm */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={() => onFilter('Hoa sinh nhật')} style={buttonStyle}>
          Hoa Sinh Nhật
        </button>
        <button onClick={() => onFilter('Hoa khai trương')} style={buttonStyle}>
          Hoa Khai Trương
        </button>
        <button onClick={() => onFilter('Hoa giỏ')} style={buttonStyle}>
          Hoa Giỏ
        </button>
      </div>
    </div>
  );
};


const Footer = () => {
  return (
    <footer style={{
      background: '#282c34',
      color: '#ffffff',
      padding: '40px 20px',
      textAlign: 'center',
      borderTop: '5px solid #ff6f61',
      position: 'relative'
    }}>
      <p style={{ margin: 0, fontSize: '18px' }}>
        &copy; 2024 Flower Shop. All Rights Reserved.
      </p>
      <p style={{ margin: '5px 0 20px', fontSize: '14px' }}>
        Địa chỉ: 123 Phạm Hữu Lầu, Thành phố Cao Lãnh, Việt Nam
      </p>
      <div style={{ margin: '20px 0' }}>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#ffffff', textDecoration: 'none', fontSize: '24px' }}>
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#ffffff', textDecoration: 'none', fontSize: '24px' }}>
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#ffffff', textDecoration: 'none', fontSize: '24px' }}>
          <i className="fab fa-twitter"></i>
        </a>
      </div>
      <p style={{ margin: '0', fontSize: '12px', opacity: 0.7 }}>
        Designed with ❤️ by Your Name
      </p>
    </footer>
  );
};


// Product Component
const Product = ({ product, onPurchase }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
      navigate(`/products/${product.id}`);
  };

  return (
      <div style={{
          border: '1px solid rgba(255, 255, 255, 0.7)',
          margin: '10px',
          padding: '10px',
          borderRadius: '8px',
          width: '220px',
          height: '320px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          transition: 'transform 0.3s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
          <img
              src={`/Image/${product.image}`}
              alt={product.name}
              style={{
                  width: '180px',
                  height: '180px',
                  display: 'block',
                  margin: '0 auto',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.7)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onClick={handleImageClick}
          />
          <h2 style={{ fontSize: '1.2em', color: '#003366' }}>{product.name}</h2>
          <p style={{ fontWeight: 'bold', color: '#ff6600' }}>Giá: {product.price}.00</p>
          <button
              onClick={() => onPurchase(product.id)}
              style={{
                  backgroundColor: '#66b3ff', // Màu xanh
                  color: 'white',
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'} // Màu xanh đậm khi hover
              onMouseLeave={(e) => e.target.style.backgroundColor = '#66b3ff'} // Trở về màu ban đầu
          >
              Mua ngay
          </button>
      </div>
  );
};

// Các component khác như Header, Footer, Product, ProductDetail...

const ProductList = ({ products, onPurchase }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (number) => setCurrentPage(number);

  return (
      <div style={{ padding: '40px 0' }}>
          <div className="d-flex flex-wrap justify-content-center">
              {currentProducts.map((product) => (
                  <Product key={product.id} product={product} onPurchase={onPurchase} />
              ))}
          </div>

          {/* Phân trang */}
          <nav>
              <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
                  </li>
                  {[...Array(totalPages).keys()].map(number => (
                      <li key={number + 1} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
                          <button onClick={() => paginate(number + 1)} className="page-link">
                              {number + 1}
                          </button>
                      </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
                  </li>
              </ul>
          </nav>

          <ToastContainer />
      </div>
  );
};

const ProductDetail = ({ product }) => {
  return (
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <div style={{ border: '1px solid rgba(255, 255, 255, 0.7)', borderRadius: '8px', padding: '10px', marginLeft: '50px', transition: 'transform 0.3s ease' }}>
              <img
                  src={`/Image/${product.image}`}
                  alt={product.name}
                  style={{ width: '300px', height: '300px', borderRadius: '8px', transition: 'transform 0.3s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
          </div>
          <div style={{ textAlign: 'left', marginLeft: '20px', maxWidth: '400px' }}>
              <h2 style={{ color: '#003366', textAlign: 'center', fontSize: '1.8em' }}>{product.name}</h2>
              <p style={{ fontWeight: 'bold', fontSize: '1.5em', color: '#ff6600' }}>Giá: {product.price}</p>
              <label style={{ border: '1px solid #ddd', padding: '15px', display: 'block', marginTop: '10px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  {product.description}
              </label>
              <button style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '1em',
                  transition: 'background-color 0.3s ease'
                }} onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}>
                  Mua ngay
              </button>
          </div>
      </div>
  );
};





















const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2>{product.name}</h2>
        <img src={`/Image/${product.image}`} alt={product.name} style={{ width: '100%' }} />
        <p>Giá: {product.price}</p>
        <p>{product.description}</p>
        <button onClick={onClose} style={modalStyles.closeButton}>Đóng</button>
      </div>
    </div>
  );
};

// Styles cho modal
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    background: 'white',
    padding: '20px',
    borderRadius: '5px',
    width: '400px',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

// Component SimilarProducts
const SimilarProducts = ({ similarProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenDetail = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h3 style={{ color: '#003366', textAlign: 'center', fontSize: '1.5em' }}>Sản phẩm tương tự</h3>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {similarProducts.map((product) => (
          <div key={product.id} style={{
            border: '1px solid #ddd',
            margin: '10px',
            padding: '10px',
            borderRadius: '5px',
            width: '220px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img
              src={`/Image/${product.image}`}
              alt={product.name}
              style={{ width: '180px', height: '180px', borderRadius: '5px', display: 'block', margin: '0 auto', border: '1px solid rgba(255, 255, 255, 0.7)', transition: 'transform 0.3s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            <h4 style={{ fontSize: '1em', margin: '10px 0' }}>{product.name}</h4>
            <p style={{ fontWeight: 'bold', color: '#ff6600' }}>Giá: {product.price}.00</p>
            <button style={{
              padding: '5px 10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.8em',
              transition: 'background-color 0.3s ease'
            }} 
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
            onClick={() => handleOpenDetail(product)}
            >
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>
      <ProductDetailModal product={selectedProduct} onClose={handleCloseDetail} />
    </div>
  );
};
// ProductDetails Component
const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const similarProducts = products.filter(p => p.id !== parseInt(id)).slice(0, 4); // Lấy 4 sản phẩm tương tự

  if (!product) return (
      <div style={{ textAlign: 'center', color: '#003366', marginTop: '20px' }}>
          <h2>Sản phẩm không tìm thấy</h2>
      </div>
  );

  return (
      <div>
          <ProductDetail product={product} />
          <SimilarProducts similarProducts={similarProducts} />
      </div>
  );
};
const Contact = () => {
    return (
        <div style={{
            padding: '40px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            maxWidth: '800px',
            margin: '40px auto',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h2 style={{
                color: '#003366',
                fontSize: '2.5em',
                marginBottom: '30px',
                textAlign: 'center',
                fontWeight: '600'
            }}>Liên hệ với chúng tôi</h2>
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.0232398470657!2d105.64124277451312!3d10.419728765672847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a64d83b2792df%3A0x17bca5e601420f5a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyDEkOG7k25nIFRow6Fw!5e0!3m2!1svi!2s!4v1728064073323!5m2!1svi!2s" 
                title="Map showing the location of Đại học Đồng Tháp"
                width="100%" 
                height="400"
                style={{ border: '2px solid #003366', borderRadius: '10px', marginBottom: '30px' }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div style={{
                backgroundColor: '#f8f8f8',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                textAlign: 'left',
                lineHeight: '1.6'
            }}>
                <p style={{ fontSize: '1.2em', margin: '15px 0' }}>
                    <strong>📍 Vị trí:</strong> Đại học Đồng Tháp
                </p>
                <p style={{ fontSize: '1.2em', margin: '15px 0' }}>
                    <strong>🏢 Địa chỉ:</strong> 783 Nguyễn Huệ, Phường 6, TP. Cao Lãnh, Đồng Tháp
                </p>
                <p style={{ fontSize: '1.2em', margin: '15px 0' }}>
                    <strong>📞 Điện thoại:</strong> (0277) 3 868 666
                </p>
                <p style={{ fontSize: '1.2em', margin: '15px 0' }}>
                    <strong>✉️ Email:</strong> htcc.edu.vn
                </p>
            </div>
        </div>
    );
};
  

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
      const fetchProducts = async () => {
          try {
              const response = await axios.get('http://localhost:8080/products/getAll');
              setProducts(response.data);
          } catch (err) {
              console.error(err);
          }
      };

      fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === '' || product.categoryName === filter) // Thêm điều kiện lọc theo danh mục
  );

  const handlePurchase = (id) => {
      const product = products.find(p => p.id === id);
      if (product) {
          setCartItems([...cartItems, product]);
          alert(`Bạn đã thêm sản phẩm ${product.name} vào giỏ hàng.`);
      }
  };

  const handleRemoveFromCart = (id) => {
      setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleFilter = (categoryName) => {
      setFilter(categoryName); // Cập nhật filter khi người dùng chọn danh mục
  };

  return (
      <Router>
          <div>
              <Header onSearch={setSearchTerm} onFilter={handleFilter} />
              <Routes>
                  <Route path="/products/:id" element={<ProductDetails products={products} />} />
                  <Route path="/" element={<ProductList products={filteredProducts} onPurchase={handlePurchase} />} />
                  <Route path="/products" element={<ProductList products={filteredProducts} onPurchase={handlePurchase} />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route 
                      path="/cart" 
                      element={<Cart cartItems={cartItems} onRemove={handleRemoveFromCart} />} 
                  />
              </Routes>
              <Footer />
          </div>
      </Router>
  );
};

export default App;
