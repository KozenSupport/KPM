package com.kozen.kpm.integration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.kozen.kpm")
public class KpmIntegrationServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(KpmIntegrationServiceApplication.class, args);
    }
}
