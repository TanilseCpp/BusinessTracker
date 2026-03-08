package com.talentotech.api.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/users/{id}").permitAll()
                .requestMatchers("/api/users").permitAll()
                .requestMatchers("/api/country").permitAll()
                .requestMatchers("/api/country/*").permitAll()
                .requestMatchers("/api/region").permitAll()
                .requestMatchers("/api/region/*").permitAll()
                .requestMatchers("/api/region/country/*").permitAll()
                .requestMatchers("/api/businesses/user/*").permitAll()
                .requestMatchers("/api/businesses/*").permitAll()
                .requestMatchers("/api/businesses/report/percentage").permitAll()
                .requestMatchers("/api/businesses/report/top-countries").permitAll()
                .requestMatchers("/api/businesses/report").permitAll()
                .requestMatchers("/api/businesses").permitAll()
                .requestMatchers("/api/businesses/search").permitAll()
                .requestMatchers("/api/users/login").permitAll()
                .anyRequest().authenticated())
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable());
        return http.build();
    }
}
