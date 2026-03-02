package com.talentotech.api.dto;
import com.talentotech.api.model.BusinessType;

public class ProductionReport {

    private String region;
    private BusinessType type;
    private Long totalUsers;

    public ProductionReport(String region, BusinessType type, Long totalUsers) {
        this.region = region;
        this.type = type;
        this.totalUsers = totalUsers;
    }

    public String getRegion() {
        return region;
    }

    public BusinessType getType() {
        return type;
    }

    public Long getTotalUsers() {
        return totalUsers;
    }
}