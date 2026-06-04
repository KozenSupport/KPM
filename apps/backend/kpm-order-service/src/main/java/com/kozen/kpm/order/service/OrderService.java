package com.kozen.kpm.order.service;

import com.kozen.kpm.order.dto.OrderDto;
import com.kozen.kpm.order.dto.OrderRequest;

import java.util.List;

/**
 * Order domain service.
 * Responsible for order CRUD, amount calculation, order history recording,
 * and automatic project-customer status maintenance after order creation/update.
 */
public interface OrderService {
    /**
     * Query order list by optional year/customer/project filters.
     */
    List<OrderDto> list(String year, String customerId, String projectId);

    /**
     * Load one order with modification histories.
     */
    OrderDto detail(String id);

    /**
     * Create a new order and update related customer-project status.
     */
    OrderDto create(OrderRequest request);

    /**
     * Update an existing order and append an audit history record.
     */
    OrderDto update(String id, OrderRequest request);

    /**
     * Delete one order by ID.
     */
    boolean delete(String id);
}
