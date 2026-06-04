package com.kozen.kpm.order.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "订单创建/修改时保存的 SKU 快照")
public record OrderSkuSnapshotDto(
        String id,
        String wholeMachinePartNumber,
        String configurationName,
        String memoryType
) {}
