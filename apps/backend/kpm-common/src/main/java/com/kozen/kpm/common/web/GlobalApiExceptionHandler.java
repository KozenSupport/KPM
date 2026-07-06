package com.kozen.kpm.common.web;

import com.kozen.kpm.common.api.ApiResponse;
import com.kozen.kpm.common.observability.KpmErrorBurstAlertService;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Comparator;
import java.util.stream.Collectors;

/** Converts validation failures into the same API envelope used by normal endpoints. */
@RestControllerAdvice(basePackages = "com.kozen.kpm")
public class GlobalApiExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalApiExceptionHandler.class);
    private final KpmErrorBurstAlertService errorBurstAlertService;

    public GlobalApiExceptionHandler(ObjectProvider<KpmErrorBurstAlertService> errorBurstAlertServiceProvider) {
        this.errorBurstAlertService = errorBurstAlertServiceProvider.getIfAvailable();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Object>> illegalArgument(IllegalArgumentException e) {
        log.warn("Request validation failed: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error("VALIDATION_ERROR", e.getMessage()));
    }

    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<ApiResponse<Object>> security(SecurityException e) {
        log.warn("Request forbidden: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ApiResponse.error("FORBIDDEN", e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object>> methodArgumentNotValid(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldErrors().stream()
                .sorted(Comparator.comparing(FieldError::getField))
                .map(error -> error.getField() + "：" + (error.getDefaultMessage() == null ? "格式不正确" : error.getDefaultMessage()))
                .distinct()
                .collect(Collectors.joining("；"));
        log.warn("Request body validation failed: {}", message);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error("VALIDATION_ERROR", message.isBlank() ? "请求参数校验失败" : message));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiResponse<Object>> constraintViolation(ConstraintViolationException e) {
        String message = e.getConstraintViolations().stream()
                .sorted(Comparator.comparing(v -> v.getPropertyPath().toString()))
                .map(this::formatViolation)
                .distinct()
                .collect(Collectors.joining("；"));
        log.warn("Request parameter validation failed: {}", message);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error("VALIDATION_ERROR", message.isBlank() ? "请求参数校验失败" : message));
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ApiResponse<Object>> illegalState(IllegalStateException e) {
        log.warn("Service not ready: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(ApiResponse.error("SERVICE_NOT_READY", e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> internalError(Exception e, HttpServletRequest request) {
        String route = request == null ? "unknown" : request.getMethod() + " " + request.getRequestURI();
        log.error("Unhandled server error route={} message={}", route, e.getMessage(), e);
        if (errorBurstAlertService != null) {
            errorBurstAlertService.recordServerError(route, e);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.error("INTERNAL_ERROR", "系统异常，请联系管理员"));
    }

    private String formatViolation(ConstraintViolation<?> violation) {
        String path = violation.getPropertyPath() == null ? "参数" : violation.getPropertyPath().toString();
        String field = path.contains(".") ? path.substring(path.lastIndexOf('.') + 1) : path;
        return field + "：" + violation.getMessage();
    }
}
