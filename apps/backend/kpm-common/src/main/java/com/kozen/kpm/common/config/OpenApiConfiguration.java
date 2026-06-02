package com.kozen.kpm.common.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Common Swagger/OpenAPI configuration for KPM microservices.
 */
@Configuration
public class OpenApiConfiguration {
    @Bean
    public OpenAPI kpmOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("KPM REST API")
                        .description("Kozen Project Management microservice API documentation")
                        .version("v1")
                        .license(new License().name("Kozen Internal")));
    }
}
