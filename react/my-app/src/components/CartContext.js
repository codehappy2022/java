import React, { createContext, useContext, useState } from 'react';

// Tạo context cho giỏ hàng
const CartContext = createContext();

// Provider cho CartContext
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prev) => [...prev, product]);
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook để sử dụng CartContext
export const useCart = () => {
    return useContext(CartContext);
};
