package com.talentotech.api.service;
import com.talentotech.api.repository.BusinessRepository;
import com.talentotech.api.repository.RegionRepository;
import com.talentotech.api.repository.UserRepository;
import com.talentotech.api.exception.ResourceNotFoundException;
import com.talentotech.api.model.Business;
import com.talentotech.api.model.BusinessType;
import com.talentotech.api.model.User;
import com.talentotech.api.model.Region;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.talentotech.api.dto.CountryRanking;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import com.talentotech.api.dto.ProductionReport;



@Service
public class BusinessService {
    
    private final BusinessRepository businessRepository;
    private final UserRepository userRepository;
    private final RegionRepository regionRepository;

    public BusinessService(BusinessRepository businessRepository,
                       UserRepository userRepository,
                       RegionRepository regionRepository) {
    this.businessRepository = businessRepository;
    this.userRepository = userRepository;
    this.regionRepository = regionRepository;
    }

    public Business createBusiness(Long userId, Business business) {

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        Long regionId = business.getRegion().getId();

        Region region = regionRepository.findById(regionId)
        .orElseThrow(() -> new ResourceNotFoundException("Región no encontrada"));

        business.setUser(user);
        business.setRegion(region);

        return businessRepository.save(business);
    }

    public List<Business> findAll() {
        return businessRepository.findAll();
    }

    public Business findById(Long id) {
        return businessRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Negocio no encontrado"));
    }

    public List<ProductionReport> getProductionReport() {
    return businessRepository.getProductionReport();
    }

    public Business update(Long id, Business businessDetails) {

        Business business = findById(id);

        if (businessDetails.getBusinessName() != null) {
            business.setBusinessName(businessDetails.getBusinessName());
        }

        if (businessDetails.getEmail() != null) {
            business.setEmail(businessDetails.getEmail());
        }

        if (businessDetails.getAnnualIncome() != null) {
            business.setAnnualIncome(businessDetails.getAnnualIncome());
        }

        return businessRepository.save(business);
    }

    public void delete(Long id) {
        Business business = findById(id);
        businessRepository.delete(business);
    }

    public Map<String, Double> getRegionPercentages() {

        List<Object[]> results = businessRepository.countBusinessesByRegion();

        long total = results.stream()
            .mapToLong(r -> (Long) r[1])
            .sum();

        Map<String, Double> percentages = new HashMap<>();

        for (Object[] row : results) {
            String region = (String) row[0];
            Long count = (Long) row[1];

            double percentage = (count * 100.0) / total;
            percentages.put(region, percentage);
        }

        return percentages;
    }

    public List<CountryRanking> getTop10Countries() {
        Pageable topTen = PageRequest.of(0, 10);
        return businessRepository.getCountryRanking(topTen);
    }

    public List<Business> search(
        BusinessType type,
        Long regionId,
        Long countryId,
        Long userId) {

    return businessRepository.search(type, regionId, countryId, userId);
}
}
