package com.kozen.kpm.analytics;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.kozen.kpm")
public class KpmAnalyticsServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(KpmAnalyticsServiceApplication.class, args);
    }
}
