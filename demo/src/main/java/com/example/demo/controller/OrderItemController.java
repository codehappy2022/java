package com.example.demo.controller;

import com.example.demo.model.OrderItem;
import com.example.demo.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/order-items")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @GetMapping("/getAll")
    public List<OrderItem> getAllOrderItems() {
        return orderItemService.findAll();
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<OrderItem> getOrderItemById(@PathVariable Integer id) {
        Optional<OrderItem> orderItem = orderItemService.findById(id);
        return orderItem.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public OrderItem createOrderItem(@RequestBody OrderItem orderItem) {
        return orderItemService.save(orderItem);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<OrderItem> updateOrderItem(@PathVariable Integer id, @RequestBody OrderItem orderItem) {
        if (orderItemService.findById(id).isPresent()) {
            orderItem.setId(id);
            return ResponseEntity.ok(orderItemService.save(orderItem));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteOrderItem(@PathVariable Integer id) {
        if (orderItemService.findById(id).isPresent()) {
            orderItemService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
