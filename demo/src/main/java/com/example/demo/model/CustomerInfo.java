package com.example.demo.model;

public class CustomerInfo {
    private Integer id; // ID của khách hàng
    private String name;
    private String phone;
    private String address;
    private String email;

    // Constructor không tham số
    public CustomerInfo() {}

    // Constructor có tham số
    public CustomerInfo(Integer id, String name, String phone, String address, String email) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.email = email;
    }

    // Getters và Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
