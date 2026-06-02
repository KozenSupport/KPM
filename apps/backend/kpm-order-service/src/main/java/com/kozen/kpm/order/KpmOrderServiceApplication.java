package com.kozen.kpm.order;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.kozen.kpm")
public class KpmOrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(KpmOrderServiceApplication.class, args);
    }
}
