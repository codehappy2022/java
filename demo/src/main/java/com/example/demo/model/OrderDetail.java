package com.example.demo.model;

import java.math.BigDecimal;

public class OrderDetail {
    private Integer id; // Thuộc tính ID
    private Integer productId;
    private Integer quantity;
    private BigDecimal price;
    private BigDecimal total;

    // Constructors
    public OrderDetail() {}

    public OrderDetail(Integer productId, Integer quantity, BigDecimal price) {
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
        this.total = price.multiply(new BigDecimal(quantity)); // Tính tổng
    }

    // Getters và Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) { // Phương thức setId
        this.id = id;
    }

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
        this.total = price.multiply(new BigDecimal(quantity)); // Cập nhật tổng
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
        this.total = price.multiply(new BigDecimal(quantity)); // Cập nhật tổng
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }
}
