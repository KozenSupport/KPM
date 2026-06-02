package com.kozen.kpm.task;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.kozen.kpm")
public class KpmTaskServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(KpmTaskServiceApplication.class, args);
    }
}
