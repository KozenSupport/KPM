package com.kozen.kpm.customer.dto;

import java.time.LocalDateTime;

public record CustomerFollowupDto(String id, String customerId, String author, String content, Object attachments, LocalDateTime createdAt) {}
