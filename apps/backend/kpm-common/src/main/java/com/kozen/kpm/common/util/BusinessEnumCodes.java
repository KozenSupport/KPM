package com.kozen.kpm.common.util;

import java.util.Set;

/**
 * Stable machine-readable codes used by KPM business fields.
 *
 * <p>Database columns and API payloads must store these codes, never localized display text.
 * Configurable enum labels live in {@code kpm_enum_items.name} (Chinese) and
 * {@code kpm_enum_items.label_en} (English). A configurable enum may contain additional codes,
 * while the constants below identify values that have system-level behavior.</p>
 */
public final class BusinessEnumCodes {
    /** Validation pattern shared by DTOs that accept a business enum code. */
    public static final String CODE_PATTERN = "^[A-Z][A-Z0-9_]{0,63}$";

    private BusinessEnumCodes() {
    }

    public static final String ACTIVE = "ACTIVE";
    public static final String INACTIVE = "INACTIVE";

    public static final String ROLE_TYPE_GLOBAL = "GLOBAL";
    public static final String ROLE_TYPE_PROJECT = "PROJECT";

    public static final String PERMISSION_TYPE_MENU = "MENU";
    public static final String PERMISSION_TYPE_BUTTON = "BUTTON";

    public static final String STAGE_STATUS_NOT_STARTED = "NOT_STARTED";
    public static final String STAGE_STATUS_IN_PROGRESS = "IN_PROGRESS";
    public static final String STAGE_STATUS_COMPLETED = "COMPLETED";

    public static final String CUSTOMER_STATUS_PROSPECT = "PROSPECT";
    public static final String CUSTOMER_STATUS_ACTIVE = "ACTIVE";
    public static final String CUSTOMER_STATUS_INACTIVE = "INACTIVE";

    public static final String CUSTOMER_LEVEL_STRATEGIC = "STRATEGIC";
    public static final String CUSTOMER_LEVEL_KEY = "KEY";
    public static final String CUSTOMER_LEVEL_STANDARD = "STANDARD";
    public static final String CUSTOMER_LEVEL_WATCHLIST = "WATCHLIST";
    public static final String CUSTOMER_LEVEL_BLACKLISTED = "BLACKLISTED";

    public static final String CUSTOMER_PROJECT_OPPORTUNITY_DISCOVERY = "OPPORTUNITY_DISCOVERY";
    public static final String CUSTOMER_PROJECT_SAMPLE_TESTING = "SAMPLE_TESTING";
    public static final String CUSTOMER_PROJECT_RND_INVESTMENT = "RND_INVESTMENT";
    public static final String CUSTOMER_PROJECT_ORDER_SPRINT = "ORDER_SPRINT";
    public static final String CUSTOMER_PROJECT_FIRST_ORDER_SUPPORT = "FIRST_ORDER_SUPPORT";
    public static final String CUSTOMER_PROJECT_MASS_PRODUCTION_SUPPORT = "MASS_PRODUCTION_SUPPORT";
    public static final String CUSTOMER_PROJECT_EOL_NOTICE = "EOL_NOTICE";
    public static final String CUSTOMER_PROJECT_EOL = "EOL";
    public static final String CUSTOMER_PROJECT_SUPPORT_ENDED = "SUPPORT_ENDED";

    public static final String ORDER_TYPE_SAMPLE = "SAMPLE";
    public static final String ORDER_TYPE_PRE_ORDER = "PRE_ORDER";
    public static final String ORDER_TYPE_FORMAL = "FORMAL";
    public static final String ORDER_STATUS_CREATED = "CREATED";
    public static final String ORDER_STATUS_IN_PRODUCTION = "IN_PRODUCTION";
    public static final String ORDER_STATUS_SHIPPED = "SHIPPED";
    public static final String ORDER_STATUS_RECEIVED = "RECEIVED";
    public static final String ORDER_STATUS_COMPLETED = "COMPLETED";

    public static final String TASK_CATEGORY_REQUIREMENT = "REQUIREMENT";
    public static final String TASK_CATEGORY_BUG = "BUG";
    public static final String TASK_CATEGORY_SUPPORT = "TECHNICAL_SUPPORT";
    public static final String TASK_CATEGORY_OTHER = "OTHER";
    public static final String TASK_STATUS_PENDING = "PENDING";
    public static final String TASK_STATUS_IN_PROGRESS = "IN_PROGRESS";
    public static final String TASK_STATUS_COMPLETED = "COMPLETED";
    public static final String TASK_STATUS_REJECTED = "REJECTED";
    public static final String PRIORITY_HIGH = "HIGH";
    public static final String PRIORITY_MEDIUM = "MEDIUM";
    public static final String PRIORITY_LOW = "LOW";

    public static final String REQUIREMENT_STATUS_PENDING_REVIEW = "PENDING_REVIEW";
    public static final String REQUIREMENT_STATUS_ACCEPTED = "ACCEPTED";
    public static final String REQUIREMENT_STATUS_IMPLEMENTING = "IMPLEMENTING";
    public static final String REQUIREMENT_STATUS_IMPLEMENTED = "IMPLEMENTED";
    public static final String REQUIREMENT_STATUS_REJECTED = "REJECTED";
    public static final String REQUIREMENT_STATUS_VOIDED = "VOIDED";

    public static final String ANNOUNCEMENT_TYPE_GENERAL = "GENERAL";
    public static final String ANNOUNCEMENT_TYPE_PRODUCT_EOL = "PRODUCT_EOL";
    public static final String ANNOUNCEMENT_STATUS_PUBLISHED = "PUBLISHED";
    public static final String ANNOUNCEMENT_STATUS_RETRACTED = "RETRACTED";

    public static final String KNOWLEDGE_STATUS_PENDING_REVIEW = "PENDING_REVIEW";
    public static final String KNOWLEDGE_STATUS_PUBLISHED = "PUBLISHED";

    public static final String FILE_TYPE_IMAGE = "IMAGE";
    public static final String FILE_TYPE_VIDEO = "VIDEO";
    public static final String FILE_TYPE_PDF = "PDF";
    public static final String FILE_TYPE_DOCUMENT = "DOCUMENT";
    public static final String FILE_TYPE_SPREADSHEET = "SPREADSHEET";
    public static final String FILE_TYPE_PRESENTATION = "PRESENTATION";
    public static final String FILE_TYPE_OTHER = "OTHER";

    public static final String TASK_SOURCE_TASK_MANAGEMENT = "TASK_MANAGEMENT";
    public static final String TASK_SOURCE_STAGE_DETAIL = "STAGE_DETAIL";
    public static final String TASK_SOURCE_CUSTOMER_PORTAL = "CUSTOMER_PORTAL";
    public static final String TASK_SOURCE_REQUIREMENT_AUTO_CREATED = "REQUIREMENT_AUTO_CREATED";
    public static final String TASK_SOURCE_CUSTOMER_FOLLOW_UP = "CUSTOMER_FOLLOW_UP";
    public static final String TASK_SOURCE_CUSTOMER_REQUIREMENT_BREAKDOWN = "CUSTOMER_REQUIREMENT_BREAKDOWN";
    public static final String TASK_SOURCE_CUSTOMER_PROJECT_FOLLOW_UP = "CUSTOMER_PROJECT_FOLLOW_UP";
    public static final String TASK_SOURCE_TEST_DATA = "TEST_DATA";
    public static final String TASK_SOURCE_INTEGRATION_SCRIPT = "INTEGRATION_SCRIPT";

    private static final Set<String> TASK_SOURCE_CODES = Set.of(
            TASK_SOURCE_TASK_MANAGEMENT,
            TASK_SOURCE_STAGE_DETAIL,
            TASK_SOURCE_CUSTOMER_PORTAL,
            TASK_SOURCE_REQUIREMENT_AUTO_CREATED,
            TASK_SOURCE_CUSTOMER_FOLLOW_UP,
            TASK_SOURCE_CUSTOMER_REQUIREMENT_BREAKDOWN,
            TASK_SOURCE_CUSTOMER_PROJECT_FOLLOW_UP,
            TASK_SOURCE_TEST_DATA,
            TASK_SOURCE_INTEGRATION_SCRIPT
    );

    /** Returns whether the value is one of the fixed task-entry source codes. */
    public static boolean isTaskSource(String value) {
        return TASK_SOURCE_CODES.contains(value);
    }

    public static final String ACTIVITY_ACTIVE = "ACTIVE";
    public static final String ACTIVITY_OBSERVING = "OBSERVING";
    public static final String ACTIVITY_STALLED = "STALLED";
    public static final String ACTIVITY_ABANDONED = "ABANDONED";
}
