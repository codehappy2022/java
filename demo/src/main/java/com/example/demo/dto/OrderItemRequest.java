package com.example.demo.dto;

import java.math.BigDecimal;

public class OrderItemRequest {
    private Integer productId;
    private Integer quantity;
    private BigDecimal price; // Chỉ cần lưu giá, tổng có thể tính toán ở backend

    // Getters và Setters
    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    // Tính toán tổng giá trị từ giá và số lượng
    public BigDecimal getTotal() {
        return price.multiply(BigDecimal.valueOf(quantity));
    }
}
