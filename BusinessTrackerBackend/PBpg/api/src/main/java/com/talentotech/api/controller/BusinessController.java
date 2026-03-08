package com.talentotech.api.controller;
import com.talentotech.api.model.Business;
import com.talentotech.api.model.BusinessType;
import com.talentotech.api.service.BusinessService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.talentotech.api.dto.ProductionReport;
import java.util.Map;
import com.talentotech.api.dto.CountryRanking;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
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

    @GetMapping("/report")
    public List<ProductionReport> getProductionReport() {
        return businessService.getProductionReport();
    }

    @GetMapping("/report/percentage")
    public Map<String, Double> getRegionPercentages() {
        return businessService.getRegionPercentages();
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

    @GetMapping("/report/top-countries")
    public List<CountryRanking> getTop10Countries() {
        return businessService.getTop10Countries();
    }

    @GetMapping("/search")
    public List<Business> search(
        @RequestParam(required = false) BusinessType type,
        @RequestParam(required = false) Long regionId,
        @RequestParam(required = false) Long countryId,
        @RequestParam(required = false) Long userId) {

        return businessService.search(type, regionId, countryId, userId);
    }
}
