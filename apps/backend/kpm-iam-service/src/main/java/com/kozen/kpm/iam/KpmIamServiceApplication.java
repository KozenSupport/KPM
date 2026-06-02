package com.kozen.kpm.iam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.kozen.kpm")
public class KpmIamServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(KpmIamServiceApplication.class, args);
    }
}
