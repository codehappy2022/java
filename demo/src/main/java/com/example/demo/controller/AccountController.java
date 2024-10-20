package com.example.demo.controller;

import com.example.demo.model.Account;
import com.example.demo.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/accounts")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/getAll")
    public List<Account> getAllAccounts() {
        return accountService.findAll();
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable Long id) {  // Thay đổi từ Integer sang Long
        Optional<Account> account = accountService.findById(id);
        return account.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public Account createAccount(@RequestBody Account account) {
        return accountService.save(account);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable Long id, @RequestBody Account account) {  // Thay đổi từ Integer sang Long
        if (accountService.findById(id).isPresent()) {
            account.setId(id);
            return ResponseEntity.ok(accountService.save(account));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {  // Thay đổi từ Integer sang Long
        if (accountService.findById(id).isPresent()) {
            accountService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
