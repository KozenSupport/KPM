package com.kozen.kpm.file;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.kozen.kpm")
public class KpmFileServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(KpmFileServiceApplication.class, args);
    }
}
