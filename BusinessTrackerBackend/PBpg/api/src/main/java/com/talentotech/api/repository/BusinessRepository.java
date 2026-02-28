package com.talentotech.api.repository;
import com.talentotech.api.model.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BusinessRepository extends JpaRepository<Business, Long> {
    List<Business> findByType(String type);
    List<Business> findByUserId(Long userId);
}
