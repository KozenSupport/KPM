package com.kozen.kpm.order.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Schema(description = "订单修改记录")
public record OrderHistoryDto(
        String id,
        String orderId,
        String modifier,
        LocalDateTime modifiedAt,
        String changes,
        String reason
) {}
