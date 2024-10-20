package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title", "Trang chủ");
        model.addAttribute("message", "Chào mừng đến với cửa hàng của chúng tôi!");
        return "home"; // Trả về tên view (home.html)
    }
}
