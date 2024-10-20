package com.example.demo.service;

import com.example.demo.model.Account;
import com.example.demo.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    public Optional<Account> findById(Long id) {  // Thay đổi từ Integer sang Long
        return accountRepository.findById(id);
    }

    public Account save(Account account) {
        return accountRepository.save(account);
    }

    public void deleteById(Long id) {  // Thay đổi từ Integer sang Long
        accountRepository.deleteById(id);
    }
}
