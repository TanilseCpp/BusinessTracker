package com.talentotech.api.dto;

public class CountryRanking {
    private String country;
    private Long totalBusinesses;

    public CountryRanking(String country, Long totalBusinesses) {
        this.country = country;
        this.totalBusinesses = totalBusinesses;
    }

    public String getCountry() {
        return country;
    }

    public Long getTotalBusinesses() {
        return totalBusinesses;
    }
}
