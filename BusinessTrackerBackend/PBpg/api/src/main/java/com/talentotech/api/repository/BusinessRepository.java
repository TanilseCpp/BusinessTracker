package com.talentotech.api.repository;
import com.talentotech.api.dto.ProductionReport;
import com.talentotech.api.dto.CountryRanking;
import com.talentotech.api.model.Business;
import com.talentotech.api.model.BusinessType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;

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

    @Query("""
        SELECT b.region.name, COUNT(b)
        FROM Business b
        GROUP BY b.region.name
    """)
    List<Object[]> countBusinessesByRegion();

    @Query("""
        SELECT new com.talentotech.api.dto.CountryRanking(
            b.region.country.name,
            COUNT(b)
        )
        FROM Business b
        GROUP BY b.region.country.name
        ORDER BY COUNT(b) DESC
    """)
    List<CountryRanking> getCountryRanking(Pageable pageable);

    @Query("""
        SELECT b FROM Business b
        WHERE (:type IS NULL OR b.type = :type)
        AND (:regionId IS NULL OR b.region.id = :regionId)
        AND (:countryId IS NULL OR b.region.country.id = :countryId)
        AND (:userId IS NULL OR b.user.id = :userId)
    """)
    List<Business> search(
            @Param("type") BusinessType type,
            @Param("regionId") Long regionId,
            @Param("countryId") Long countryId,
            @Param("userId") Long userId);
}
