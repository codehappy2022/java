package com.example.demo.model;

import java.util.ArrayList;
import java.util.List;

public class Cart {
    private List<OrderItem> items; // Danh sách các mặt hàng trong giỏ

    public Cart() {
        this.items = new ArrayList<>();
    }

    // Thêm mặt hàng vào giỏ hàng
    public void addItem(OrderItem item) {
        items.add(item);
    }

    // Xóa mặt hàng khỏi giỏ hàng
    public void removeItem(OrderItem item) {
        items.remove(item);
    }

    // Lấy danh sách mặt hàng
    public List<OrderItem> getItems() {
        return items;
    }

    // Xóa tất cả mặt hàng trong giỏ hàng
    public void clear() {
        items.clear();
    }
}
