package com.kozen.kpm.common.observability;

import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/** Logs controller input, output and latency without polluting each controller method. */
@Aspect
@Component
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
public class KpmControllerLoggingAspect {
    private static final Logger log = LoggerFactory.getLogger(KpmControllerLoggingAspect.class);
    private final KpmLoggingProperties properties;
    private final KpmLogSanitizer sanitizer;

    public KpmControllerLoggingAspect(KpmLoggingProperties properties, KpmLogSanitizer sanitizer) {
        this.properties = properties;
        this.sanitizer = sanitizer;
    }

    @Around("within(@org.springframework.web.bind.annotation.RestController *) && execution(public * com.kozen.kpm..controller..*(..))")
    public Object logController(ProceedingJoinPoint joinPoint) throws Throwable {
        if (!properties.isEnabled() || !properties.isControllerLogEnabled()) return joinPoint.proceed();
        long start = System.currentTimeMillis();
        HttpServletRequest request = currentRequest();
        String route = request == null ? joinPoint.getSignature().toShortString() : request.getMethod() + " " + request.getRequestURI();
        log.info("API request route={} method={} params={}", route, joinPoint.getSignature().toShortString(), sanitizer.safeArgs(joinPoint.getArgs()));
        try {
            Object result = joinPoint.proceed();
            long duration = System.currentTimeMillis() - start;
            if (properties.isResponseLogEnabled()) {
                log.info("API response route={} durationMs={} result={}", route, duration, sanitizer.safeResult(result));
            } else {
                log.info("API response route={} durationMs={}", route, duration);
            }
            return result;
        } catch (Throwable throwable) {
            long duration = System.currentTimeMillis() - start;
            log.warn("API failed route={} durationMs={} error={}", route, duration, throwable.getMessage());
            throw throwable;
        }
    }

    private HttpServletRequest currentRequest() {
        if (RequestContextHolder.getRequestAttributes() instanceof ServletRequestAttributes attributes) {
            return attributes.getRequest();
        }
        return null;
    }
}
