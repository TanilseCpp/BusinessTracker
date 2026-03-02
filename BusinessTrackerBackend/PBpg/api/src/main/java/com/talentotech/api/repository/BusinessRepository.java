package com.talentotech.api.repository;
import com.talentotech.api.dto.ProductionReport;
import com.talentotech.api.model.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BusinessRepository extends JpaRepository<Business, Long> {
    List<Business> findByType(String type);
    List<Business> findByUserId(Long userId);
    @Query("""
        SELECT new com.talentotech.api.dto.ProductionReport(
            b.region.name,
            b.type,
            COUNT(DISTINCT b.user.id)
        )
        FROM Business b
        GROUP BY b.region.name, b.type
    """)
    List<ProductionReport> getProductionReport();
}
