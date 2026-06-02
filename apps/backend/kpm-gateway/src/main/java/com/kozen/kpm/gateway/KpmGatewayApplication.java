package com.kozen.kpm.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class KpmGatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(KpmGatewayApplication.class, args);
    }
}
