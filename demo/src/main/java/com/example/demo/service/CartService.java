package com.example.demo.service;

import com.example.demo.dto.CheckoutRequest;
import com.example.demo.model.Order;
import com.example.demo.model.OrderItem;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CartService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    public Order checkout(CheckoutRequest checkoutRequest) {
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItem item : checkoutRequest.getOrderItems()) {
            totalAmount = totalAmount.add(item.getTotal());
        }

        Order order = new Order();
        order.setCustomerId(checkoutRequest.getCustomerId());
        order.setOrderDate(LocalDateTime.now());
        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepository.save(order);

        for (OrderItem item : checkoutRequest.getOrderItems()) {
            item.setOrderId(savedOrder.getId()); // Liên kết OrderItem với Order
            orderItemRepository.save(item);
        }

        return savedOrder;
    }
}
