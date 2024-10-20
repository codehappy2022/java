package com.example.demo.dto;

import com.example.demo.model.OrderItem;
import java.util.List;

public class CheckoutRequest {
    private Integer customerId;
    private List<OrderItem> orderItems; // Đảm bảo kiểu dữ liệu nhất quán

    // Getters và Setters
    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public List<OrderItem> getOrderItems() { // Đổi thành OrderItem
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) { // Đổi thành OrderItem
        this.orderItems = orderItems;
    }
}
