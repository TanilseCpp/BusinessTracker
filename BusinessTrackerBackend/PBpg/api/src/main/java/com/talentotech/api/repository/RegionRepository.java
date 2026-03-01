package com.talentotech.api.repository;
import com.talentotech.api.model.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface RegionRepository extends JpaRepository<Region, Long> {

    List<Region> findByCountryId(Long countryId);

    Optional<Region> findByNameAndCountryId(String name, Long countryId);

    boolean existsByNameAndCountryId(String name, Long countryId);
}
