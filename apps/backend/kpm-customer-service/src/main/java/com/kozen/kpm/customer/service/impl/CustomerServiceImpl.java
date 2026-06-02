package com.kozen.kpm.customer.service.impl;

import com.kozen.kpm.common.util.IdUtil;
import com.kozen.kpm.common.util.SqlParamUtil;
import com.kozen.kpm.common.util.ValidationUtil;
import com.kozen.kpm.customer.converter.CustomerContactConverter;
import com.kozen.kpm.customer.mapper.CustomerMapper;
import com.kozen.kpm.customer.service.CustomerService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Default customer service implementation.
 */
@Service
public class CustomerServiceImpl implements CustomerService {
    private final CustomerMapper customerMapper;

    public CustomerServiceImpl(CustomerMapper customerMapper) {
        this.customerMapper = customerMapper;
    }

    @Override
    public List<Map<String, Object>> list(String keyword) {
        List<Map<String, Object>> customers = customerMapper.list(SqlParamUtil.likeOrBlank(keyword));
        customers.forEach(this::enrichCustomer);
        return customers;
    }

    @Override
    public Map<String, Object> detail(String id) {
        Map<String, Object> customer = customerMapper.load(id);
        enrichCustomer(customer);
        return customer;
    }

    @Override
    @Transactional
    public Map<String, Object> create(Map<String, Object> body) {
        validateCustomer(body);
        String id = uniqueCustomerId(String.valueOf(body.getOrDefault("name", "customer")));
        customerMapper.insert(id, body);
        replaceOwners(id, body);
        return detail(id);
    }

    @Override
    @Transactional
    public Map<String, Object> update(String id, Map<String, Object> body) {
        validateCustomer(body);
        customerMapper.updateCustomer(id, body);
        replaceOwners(id, body);
        return detail(id);
    }

    @Override
    public boolean delete(String id) {
        customerMapper.deleteById(id);
        return true;
    }

    @Override
    @Transactional
    public Map<String, Object> addContact(String id, Map<String, Object> body) {
        validateContact(body);
        customerMapper.insertContact(IdUtil.nanoId("cc"), id, body);
        return detail(id);
    }

    @Override
    @Transactional
    public Map<String, Object> deleteContact(String id, String contactId) {
        customerMapper.deleteContact(id, contactId);
        return detail(id);
    }

    @Override
    @Transactional
    public Map<String, Object> addFollowup(String id, Map<String, Object> body) {
        ValidationUtil.requireText(body, "content", "跟进内容", 2000);
        ValidationUtil.optionalJsonArrayLike(body, "attachments", "跟进附件", 20);
        customerMapper.insertFollowup(IdUtil.nanoId("cf"), id, body.getOrDefault("author", "张敏"), body.get("content"), body.get("attachments"));
        return detail(id);
    }

    @Override
    @Transactional
    public Map<String, Object> addMaterial(String id, Map<String, Object> body) {
        ValidationUtil.validateFileMeta(body);
        customerMapper.insertMaterial(IdUtil.nanoId("cm"), id, body);
        return detail(id);
    }

    private void validateCustomer(Map<String, Object> body) {
        ValidationUtil.requireText(body, "name", "客户名称", 120);
        ValidationUtil.optionalText(body, "shortName", "客户简称", 60);
        ValidationUtil.requireText(body, "region", "国家 / 区域", 80);
        ValidationUtil.optionalText(body, "address", "详细地址", 255);
        ValidationUtil.optionalText(body, "level", "客户等级", 60);
        ValidationUtil.optionalText(body, "status", "客户状态", 60);
        ValidationUtil.maxList(body, "salesOwners", "负责销售", 30);
        ValidationUtil.maxList(body, "supportOwners", "负责技术支持", 30);
    }

    private void validateContact(Map<String, Object> body) {
        ValidationUtil.requireText(body, "name", "联系人姓名", 60);
        ValidationUtil.optionalText(body, "title", "联系人职位", 80);
        ValidationUtil.optionalPhone(body, "phone", "联系人电话");
        ValidationUtil.optionalEmail(body, "email", "联系人邮箱");
        ValidationUtil.optionalText(body, "remark", "联系人备注", 500);
    }

    private void enrichCustomer(Map<String, Object> customer) {
        String id = String.valueOf(customer.get("id"));
        customer.put("salesOwners", customerMapper.ownerNames(id, "sales"));
        customer.put("supportOwners", customerMapper.ownerNames(id, "support"));
        customer.put("contacts", CustomerContactConverter.toDtos(customerMapper.contacts(id)));
        customer.put("materials", customerMapper.materials(id));
        customer.put("followups", customerMapper.followups(id));
        customer.put("projects", customerMapper.projects(id));
    }

    @SuppressWarnings("unchecked")
    private void replaceOwners(String customerId, Map<String, Object> body) {
        customerMapper.deleteOwners(customerId);
        for (Object owner : (List<Object>) body.getOrDefault("salesOwners", List.of())) {
            Map<String, Object> user = requireUser(owner, "负责销售");
            customerMapper.insertOwner(IdUtil.nanoId("co"), customerId, "sales", String.valueOf(user.get("id")), user.get("name"));
        }
        for (Object owner : (List<Object>) body.getOrDefault("supportOwners", List.of())) {
            Map<String, Object> user = requireUser(owner, "负责技术支持");
            customerMapper.insertOwner(IdUtil.nanoId("co"), customerId, "support", String.valueOf(user.get("id")), user.get("name"));
        }
    }

    private Map<String, Object> requireUser(Object accountOrName, String label) {
        if (accountOrName == null || String.valueOf(accountOrName).isBlank()) {
            throw new IllegalArgumentException(label + "必须从已有用户中选择");
        }
        List<Map<String, Object>> users = customerMapper.usersByAccountOrName(accountOrName);
        if (users.isEmpty()) {
            throw new IllegalArgumentException(label + "不存在，请从已有用户中选择");
        }
        return users.getFirst();
    }

    private String uniqueCustomerId(String source) {
        String base = "cus-" + IdUtil.slug(source, "customer");
        String candidate = base;
        int index = 2;
        while (!customerMapper.idsById(candidate).isEmpty()) {
            candidate = base + "-" + index++;
        }
        return candidate;
    }
}
