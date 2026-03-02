package com.talentotech.api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "business")
public class Business {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String businessName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private double initialInvestment;

    @Column
    private Double annualIncome;

    @Enumerated(EnumType.STRING)
    private BusinessType type;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "region_id", nullable = false)
    private Region region;

    public Business() {}

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    @Transient
    public double getProfit() { // Ganancia o beneficio
        return annualIncome - initialInvestment;
    }

    @Transient
    public double getROI() { //ROI : Retorno sobre la inversion
        if (initialInvestment == 0) return 0;
        return (getProfit() / initialInvestment) * 100;
    }

    public void setAnnualIncome(double annualIncome) {
    this.annualIncome = annualIncome;
    }

    public Double getAnnualIncome() {
        return annualIncome;
    }

    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getBusinessName() {
        return businessName;
    }


    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }


    public BusinessType getType() {
    return type;
    }


    public void setType(BusinessType type) {
        this.type = type;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }

    public Region getRegion() {
    return region;
}

    public void setRegion(Region region) {
        this.region = region;
    }
    
}
