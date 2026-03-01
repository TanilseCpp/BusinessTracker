package com.talentotech.api.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.talentotech.api.model.Country;
import java.util.Optional;

public interface CountryRepository extends JpaRepository<Country, Long> {

    Optional<Country> findByName(String name);

    boolean existsByName(String name);
}
