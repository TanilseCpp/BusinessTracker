package com.talentotech.api.controller;
import com.talentotech.api.model.Business;
import com.talentotech.api.service.BusinessService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/businesses")
public class BusinessController {

    private final BusinessService businessService;

    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<Business> createBusiness(
            @PathVariable Long userId,
            @RequestBody Business business) {

        Business created = businessService.createBusiness(userId, business);

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public List<Business> findAll() {
        return businessService.findAll();
    }

    @GetMapping("/{id}")
    public Business findById(@PathVariable Long id) {
        return businessService.findById(id);
    }

    @PutMapping("/{id}")
    public Business update(
            @PathVariable Long id,
            @RequestBody Business details) {

        return businessService.update(id, details);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        businessService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
