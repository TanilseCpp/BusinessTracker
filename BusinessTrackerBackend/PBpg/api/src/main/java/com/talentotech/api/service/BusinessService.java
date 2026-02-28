package com.talentotech.api.service;
import com.talentotech.api.repository.BusinessRepository;
import com.talentotech.api.repository.UserRepository;
import com.talentotech.api.exception.ResourceNotFoundException;
import com.talentotech.api.model.Business;
import com.talentotech.api.model.User;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class BusinessService {

    private final BusinessRepository businessRepository;
    private final UserRepository userRepository;

    public BusinessService(BusinessRepository businessRepository,
                           UserRepository userRepository) {
        this.businessRepository = businessRepository;
        this.userRepository = userRepository;
    }

    public Business createBusiness(Long userId, Business business) {

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        business.setUser(user);

        return businessRepository.save(business);
    }

    public List<Business> findAll() {
        return businessRepository.findAll();
    }

    public Business findById(Long id) {
        return businessRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Negocio no encontrado"));
    }

    public Business update(Long id, Business businessDetails) {

        Business business = findById(id);

        if (businessDetails.getBusinessName() != null) {
            business.setBusinessName(businessDetails.getBusinessName());
        }

        return businessRepository.save(business);
    }

    public void delete(Long id) {
        Business business = findById(id);
        businessRepository.delete(business);
    }
}
