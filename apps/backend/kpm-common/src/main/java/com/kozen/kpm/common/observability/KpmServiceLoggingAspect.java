package com.kozen.kpm.common.observability;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Logs service-layer business boundaries and latency. */
@Aspect
@Component
public class KpmServiceLoggingAspect {
    private static final Logger log = LoggerFactory.getLogger(KpmServiceLoggingAspect.class);
    private final KpmLoggingProperties properties;
    private final KpmLogSanitizer sanitizer;

    public KpmServiceLoggingAspect(KpmLoggingProperties properties, KpmLogSanitizer sanitizer) {
        this.properties = properties;
        this.sanitizer = sanitizer;
    }

    @Around("execution(public * com.kozen.kpm..service.impl..*(..))")
    public Object logService(ProceedingJoinPoint joinPoint) throws Throwable {
        if (!properties.isEnabled() || !properties.isServiceLogEnabled()) return joinPoint.proceed();
        long start = System.currentTimeMillis();
        if (log.isDebugEnabled()) {
            log.debug("Service enter method={} args={}", joinPoint.getSignature().toShortString(), sanitizer.safeArgs(joinPoint.getArgs()));
        }
        try {
            Object result = joinPoint.proceed();
            log.info("Service success method={} durationMs={}", joinPoint.getSignature().toShortString(), System.currentTimeMillis() - start);
            if (log.isDebugEnabled()) {
                log.debug("Service result method={} result={}", joinPoint.getSignature().toShortString(), sanitizer.safeResult(result));
            }
            return result;
        } catch (Throwable throwable) {
            log.warn("Service failed method={} durationMs={} error={}", joinPoint.getSignature().toShortString(), System.currentTimeMillis() - start, throwable.getMessage());
            throw throwable;
        }
    }
}
