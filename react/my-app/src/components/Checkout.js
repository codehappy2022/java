const confirmCheckout = async () => {
    // Tạo tóm tắt đơn hàng
    const orderSummary = cartItems.map(item => {
        const quantity = quantities[item.id] || 0;
        return {
            productId: item.id, // Giữ lại productId
            quantity,
            price: item.price,
            total: (item.price * quantity).toFixed(2), // Tính toán tổng cho từng sản phẩm
        };
    });

    setOrderDetails(orderSummary);
    setOrderDate(new Date().toLocaleString());
    setIsCheckedOut(true);

    try {
        const orderData = {
            customerId: customerInfo.id || null, // ID của khách hàng (có thể là null nếu không có)
            customerName: customerInfo.name,
            customerPhone: customerInfo.phone,
            customerAddress: customerInfo.address,
            customerEmail: customerInfo.email,
            orderItems: orderSummary.map(item => ({
                productId: item.productId, // ID sản phẩm
                quantity: item.quantity,
                price: item.price,
                total: item.total, // Tổng tiền cho sản phẩm
            })),
        };

        // Gửi yêu cầu tạo đơn hàng
        const response = await axios.post('http://localhost:8080/api/checkout', orderData);

        // Thông báo thành công
        setSuccessMessage('Đơn hàng đã được đặt thành công!');
        console.log('Đơn hàng thành công:', response.data);

        // Gọi API để lấy tất cả các mục đơn hàng
        const orderItemsResponse = await axios.get('http://localhost:8080/order-items/getAll');
        console.log('Danh sách các mục đơn hàng:', orderItemsResponse.data);

        // Xóa sản phẩm khỏi giỏ hàng
        orderSummary.forEach(item => onRemove(item.productId));
    } catch (error) {
        // Thông báo thất bại
        setErrorMessage('Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.');
        console.error('Lỗi trong quá trình thanh toán:', error);
    }
};
