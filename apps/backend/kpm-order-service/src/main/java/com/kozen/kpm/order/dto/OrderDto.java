package com.kozen.kpm.order.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Schema(description = "订单列表/详情数据")
public record OrderDto(
        String id,
        LocalDate orderDate,
        String customerId,
        String customerName,
        String region,
        String projectId,
        String projectName,
        String skuId,
        Object skuSnapshot,
        String orderType,
        String type,
        String status,
        Integer quantity,
        String specification,
        LocalDate expectedShipDate,
        LocalDate plannedShipDate,
        LocalDate actualShipDate,
        String softwareVersion,
        String currency,
        BigDecimal unitPrice,
        BigDecimal amount,
        String creatorUserId,
        String creator,
        String wholeMachinePartNumber,
        String configurationName,
        String memoryType,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        List<OrderHistoryDto> histories
) {}
