package com.kozen.kpm.common.util;

/**
 * Stable business enum values used by service logic.
 *
 * <p>The configurable enum table stores these values in {@code value}; Chinese and English names
 * are presentation-only labels. Services should not depend on display labels or any extra
 * meaning field.</p>
 */
public final class BusinessEnumValues {
    private BusinessEnumValues() {
    }

    public static final String STAGE_STATUS_NOT_STARTED = "未开始";
    public static final String STAGE_STATUS_IN_PROGRESS = "进行中";
    public static final String STAGE_STATUS_COMPLETED = "已完成";

    public static final String CUSTOMER_STATUS_POTENTIAL = "潜在客户";
    public static final String CUSTOMER_LEVEL_NORMAL = "C / 普通客户";

    public static final String CUSTOMER_PROJECT_OPPORTUNITY = "商机发掘";
    public static final String CUSTOMER_PROJECT_SAMPLE_TEST = "样机测试";
    public static final String CUSTOMER_PROJECT_ORDER_SPRINT = "订单冲刺";

    public static final String ORDER_TYPE_SAMPLE = "样品订单";
    public static final String ORDER_TYPE_PRE_ORDER = "预订单";
    public static final String ORDER_TYPE_FORMAL = "正式订单";
    public static final String ORDER_STATUS_CREATED = "已创建";
    public static final String ORDER_STATUS_SHIPPED = "已发货";

    public static final String TASK_CATEGORY_REQUIREMENT = "需求";
    public static final String TASK_CATEGORY_SUPPORT = "技术支持";
    public static final String TASK_STATUS_TODO = "待处理";
    public static final String TASK_STATUS_COMPLETED = "已完成";
    public static final String TASK_STATUS_REJECTED = "已拒绝";
    public static final String TASK_PRIORITY_MEDIUM = "中";

    public static final String REQUIREMENT_STATUS_TODO = "待评估";
    public static final String REQUIREMENT_STATUS_COMPLETED = "已实现";
    public static final String REQUIREMENT_STATUS_REJECTED = "已拒绝";
    public static final String REQUIREMENT_STATUS_VOID = "已作废";

    public static final String ANNOUNCEMENT_TYPE_GENERAL = "普通公告";
}
