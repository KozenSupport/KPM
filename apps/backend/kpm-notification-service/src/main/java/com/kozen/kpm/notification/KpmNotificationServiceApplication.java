package com.kozen.kpm.notification;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(scanBasePackages = "com.kozen.kpm")
@EnableScheduling
public class KpmNotificationServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(KpmNotificationServiceApplication.class, args);
    }
}
