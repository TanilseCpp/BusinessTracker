package com.talentotech.api.model;
import jakarta.persistence.*;

@Entity
@Table (name = "users")
public class User {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    @Column (nullable = false, unique = true)
    private String username;
    @Column (nullable = false, unique = true)
    private String email;
}
