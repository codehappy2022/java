package com.example.demo.service;

import com.example.demo.model.Order;
import com.example.demo.model.OrderItem;
import com.example.demo.dto.CheckoutRequest;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    // Lấy tất cả các đơn hàng
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Lấy đơn hàng theo ID
    public Optional<Order> getOrderById(Integer id) {
        return orderRepository.findById(id);
    }

    // Lưu đơn hàng
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    // Xóa đơn hàng
    public void deleteOrder(Integer id) {
        orderRepository.deleteById(id);
    }

    // Thanh toán và tạo đơn hàng
    public Order checkout(CheckoutRequest checkoutRequest) {
        // Tính tổng giá trị đơn hàng từ orderItems
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (var item : checkoutRequest.getOrderItems()) {
            totalAmount = totalAmount.add(item.getTotal());
        }

        Order order = new Order();
        order.setCustomerId(checkoutRequest.getCustomerId());
        order.setOrderDate(LocalDateTime.now());
        order.setTotalAmount(totalAmount);

        // Lưu order và sau đó lưu các orderItems
        Order savedOrder = orderRepository.save(order);

        for (var item : checkoutRequest.getOrderItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(savedOrder.getId());
            orderItem.setProductId(item.getProductId());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(item.getPrice());
            orderItem.setTotal(item.getTotal());

            orderItemRepository.save(orderItem); // Lưu orderItem
        }

        return savedOrder;
    }
}
