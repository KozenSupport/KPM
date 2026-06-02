package com.kozen.kpm.customer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.kozen.kpm")
public class KpmCustomerServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(KpmCustomerServiceApplication.class, args);
    }
}
