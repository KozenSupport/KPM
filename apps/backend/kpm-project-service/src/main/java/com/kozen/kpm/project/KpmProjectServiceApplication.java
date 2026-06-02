package com.kozen.kpm.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.kozen.kpm")
public class KpmProjectServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(KpmProjectServiceApplication.class, args);
    }
}
