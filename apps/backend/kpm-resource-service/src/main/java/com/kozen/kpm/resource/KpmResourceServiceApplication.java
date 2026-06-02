package com.kozen.kpm.resource;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.kozen.kpm")
public class KpmResourceServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(KpmResourceServiceApplication.class, args);
    }
}
