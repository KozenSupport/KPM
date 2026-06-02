package com.kozen.kpm.order.service.impl;

import com.kozen.kpm.common.util.IdUtil;
import com.kozen.kpm.common.util.JsonUtil;
import com.kozen.kpm.common.util.SqlParamUtil;
import com.kozen.kpm.common.util.ValidationUtil;
import com.kozen.kpm.order.mapper.OrderMapper;
import com.kozen.kpm.order.service.OrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * Default order service implementation.
 */
@Service
public class OrderServiceImpl implements OrderService {
    private final OrderMapper orderMapper;

    public OrderServiceImpl(OrderMapper orderMapper) {
        this.orderMapper = orderMapper;
    }

    @Override
    public List<Map<String, Object>> list(String year, String customerId, String projectId) {
        String y = SqlParamUtil.blankIfAll(year);
        String c = SqlParamUtil.blankIfAll(customerId);
        String p = SqlParamUtil.blankIfAll(projectId);
        List<Map<String, Object>> rows = orderMapper.list(y, c, p);
        rows.forEach(this::enrichOrder);
        return rows;
    }

    @Override
    public Map<String, Object> detail(String id) {
        Map<String, Object> order = orderMapper.load(id);
        enrichOrder(order);
        return order;
    }

    @Override
    @Transactional
    public Map<String, Object> create(Map<String, Object> body) {
        validateOrder(body, false);
        String id = body.get("id") == null || String.valueOf(body.get("id")).isBlank() ? nextOrderId() : String.valueOf(body.get("id"));
        BigDecimal unitPrice = ValidationUtil.nonNegativeDecimal(body, "unitPrice", "单价");
        int quantity = ValidationUtil.positiveInt(body, "quantity", "数量", 10_000_000);
        BigDecimal amount = unitPrice.multiply(BigDecimal.valueOf(quantity));
        Map<String, Object> creator = requireUser(body.getOrDefault("creator", "张敏"), "订单创建人");
        orderMapper.insert(body, id, quantity, unitPrice, amount, String.valueOf(creator.get("id")), String.valueOf(creator.get("name")));
        ensureProjectCustomer(String.valueOf(body.get("projectId")), String.valueOf(body.get("customerId")), String.valueOf(body.getOrDefault("orderType", "正式订单")));
        publishOrderCreatedEvent(id, body);
        return detail(id);
    }

    @Override
    @Transactional
    public Map<String, Object> update(String id, Map<String, Object> body) {
        validateOrder(body, true);
        Map<String, Object> before = detail(id);
        BigDecimal unitPrice = ValidationUtil.nonNegativeDecimal(body, "unitPrice", "单价");
        int quantity = ValidationUtil.positiveInt(body, "quantity", "数量", 10_000_000);
        BigDecimal amount = unitPrice.multiply(BigDecimal.valueOf(quantity));
        orderMapper.updateOrder(id, body, quantity, unitPrice, amount);
        String changes = String.valueOf(body.getOrDefault("changeSummary", summarize(before, body)));
        String reason = ValidationUtil.requireText(body, "changeReason", "修改原因", 500);
        orderMapper.insertHistory(IdUtil.nanoId("oh"), id, body.getOrDefault("modifier", "张敏"), changes, reason);
        ensureProjectCustomer(String.valueOf(body.get("projectId")), String.valueOf(body.get("customerId")), String.valueOf(body.getOrDefault("orderType", "正式订单")));
        return detail(id);
    }

    @Override
    public boolean delete(String id) {
        orderMapper.deleteById(id);
        return true;
    }

    private Map<String, Object> requireUser(Object accountOrName, String label) {
        if (accountOrName == null || String.valueOf(accountOrName).isBlank()) {
            throw new IllegalArgumentException(label + "必须从已有用户中选择");
        }
        List<Map<String, Object>> users = orderMapper.usersByAccountOrName(accountOrName);
        if (users.isEmpty()) {
            throw new IllegalArgumentException(label + "不存在，请从已有用户中选择");
        }
        return users.getFirst();
    }

    private void publishOrderCreatedEvent(String orderId, Map<String, Object> body) {
        List<String> recipients = orderMapper.customerOwnerUserIds(String.valueOf(body.get("customerId")));
        if (recipients.isEmpty()) {
            return;
        }
        orderMapper.insertNotificationEvent(
                IdUtil.nanoId("evt"),
                "ORDER_CREATED",
                orderId,
                "新订单已创建",
                "订单 " + orderId + " 已创建，请相关销售和技术支持关注交付计划。",
                JsonUtil.toJson(recipients)
        );
    }

    private void enrichOrder(Map<String, Object> order) {
        order.put("histories", orderMapper.histories(String.valueOf(order.get("id"))));
    }

    private void ensureProjectCustomer(String projectId, String customerId, String orderType) {
        String status = switch (orderType) {
            case "样品订单" -> "样机测试";
            case "预订单" -> "商机发掘";
            default -> "订单冲刺";
        };
        List<String> ids = orderMapper.projectCustomerIds(projectId, customerId);
        if (ids.isEmpty()) {
            orderMapper.insertProjectCustomer(IdUtil.nanoId("pc"), projectId, customerId, status);
        } else {
            orderMapper.updateProjectCustomerStatus(projectId, customerId, status);
        }
    }

    private String summarize(Map<String, Object> before, Map<String, Object> after) {
        return "订单更新：" + before.get("quantity") + "台 → " + after.get("quantity") + "台；计划发货 " + before.get("plannedShipDate") + " → " + after.get("plannedShipDate");
    }

    private void validateOrder(Map<String, Object> body, boolean update) {
        ValidationUtil.requireDate(body, "orderDate", "下单日期");
        ValidationUtil.requireText(body, "customerId", "客户ID", 80);
        ValidationUtil.requireText(body, "projectId", "项目ID", 80);
        ValidationUtil.requireText(body, "orderType", "订单类型", 40);
        ValidationUtil.positiveInt(body, "quantity", "数量", 10_000_000);
        ValidationUtil.requireText(body, "specification", "具体规格", 1000);
        ValidationUtil.optionalDate(body, "expectedShipDate", "期望发货日期");
        ValidationUtil.optionalDate(body, "plannedShipDate", "计划发货日期");
        ValidationUtil.optionalText(body, "softwareVersion", "软件版本号", 80);
        ValidationUtil.requireText(body, "currency", "币种", 10);
        ValidationUtil.nonNegativeDecimal(body, "unitPrice", "单价");
        ValidationUtil.requireText(body, "creator", "创建人", 60);
        if (update) {
            ValidationUtil.optionalText(body, "modifier", "修改人", 60);
            ValidationUtil.requireText(body, "changeReason", "修改原因", 500);
            ValidationUtil.optionalText(body, "changeSummary", "修改内容", 1000);
        }
    }

    private String nextOrderId() {
        String ym = java.time.LocalDate.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyyMM"));
        String prefix = "ORD-" + ym + "-";
        return prefix + String.format("%03d", orderMapper.nextMonthlyOrderSequence(prefix));
    }
}
