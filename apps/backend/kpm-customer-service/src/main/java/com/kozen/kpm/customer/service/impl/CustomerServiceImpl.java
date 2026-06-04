package com.kozen.kpm.customer.service.impl;

import com.kozen.kpm.common.dto.FileMetadataRequest;
import com.kozen.kpm.common.util.IdUtil;
import com.kozen.kpm.common.util.SqlParamUtil;
import com.kozen.kpm.common.util.ValidationUtil;
import com.kozen.kpm.customer.converter.CustomerConverter;
import com.kozen.kpm.customer.dto.CustomerContactRequest;
import com.kozen.kpm.customer.dto.CustomerDto;
import com.kozen.kpm.customer.dto.CustomerFollowupRequest;
import com.kozen.kpm.customer.dto.CustomerRequest;
import com.kozen.kpm.customer.dto.CustomerWriteCommand;
import com.kozen.kpm.customer.entity.CustomerEntity;
import com.kozen.kpm.customer.entity.UserLookupEntity;
import com.kozen.kpm.customer.mapper.CustomerMapper;
import com.kozen.kpm.customer.service.CustomerService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/** Default customer service implementation with typed DTO/entity boundaries. */
@Service
public class CustomerServiceImpl implements CustomerService {
    private final CustomerMapper customerMapper;
    private final CustomerConverter customerConverter;

    public CustomerServiceImpl(CustomerMapper customerMapper, CustomerConverter customerConverter) {
        this.customerMapper = customerMapper;
        this.customerConverter = customerConverter;
    }

    @Override
    public List<CustomerDto> list(String keyword) {
        return customerMapper.list(SqlParamUtil.likeOrBlank(keyword)).stream().map(this::enrichCustomer).toList();
    }

    @Override
    public CustomerDto detail(String id) {
        return enrichCustomer(requireCustomer(id));
    }

    @Override
    @Transactional
    public CustomerDto create(CustomerRequest request) {
        String id = uniqueCustomerId(request.name());
        String level = resolveDefault(request.level(), "customer_level", "客户等级");
        String status = resolveDefault(request.status(), "customer_master_status", "客户状态");
        ensureUniqueShortName(request.shortName(), null);
        customerMapper.insert(CustomerWriteCommand.from(id, request, level, status));
        replaceOwners(id, request);
        return detail(id);
    }

    @Override
    @Transactional
    public CustomerDto update(String id, CustomerRequest request) {
        requireCustomer(id);
        String level = resolveDefault(request.level(), "customer_level", "客户等级");
        String status = resolveDefault(request.status(), "customer_master_status", "客户状态");
        ensureUniqueShortName(request.shortName(), id);
        customerMapper.updateCustomer(CustomerWriteCommand.from(id, request, level, status));
        replaceOwners(id, request);
        return detail(id);
    }

    @Override
    public boolean delete(String id) {
        customerMapper.deleteById(id);
        return true;
    }

    @Override
    @Transactional
    public CustomerDto addContact(String id, CustomerContactRequest request) {
        requireCustomer(id);
        customerMapper.insertContact(IdUtil.nanoId("cc"), id, request);
        return detail(id);
    }

    @Override
    @Transactional
    public CustomerDto deleteContact(String id, String contactId) {
        requireCustomer(id);
        customerMapper.deleteContact(id, contactId);
        return detail(id);
    }

    @Override
    @Transactional
    public CustomerDto addFollowup(String id, CustomerFollowupRequest request) {
        requireCustomer(id);
        boolean hasText = request.content() != null && !request.content().isBlank();
        boolean hasFiles = request.attachments() != null && !request.attachments().isEmpty();
        if (!hasText && !hasFiles) {
            throw new IllegalArgumentException("跟进记录内容或附件不能为空");
        }
        String author = ValidationUtil.requireText(request.author(), "跟进记录作者", 64);
        customerMapper.insertFollowup(IdUtil.nanoId("cf"), id, author, request.content(), request.safeAttachments());
        return detail(id);
    }

    @Override
    @Transactional
    public CustomerDto addMaterial(String id, FileMetadataRequest request) {
        requireCustomer(id);
        customerMapper.insertMaterial(IdUtil.nanoId("cm"), id, request);
        return detail(id);
    }

    private String resolveDefault(Object value, String enumType, String label) {
        if (value != null && !String.valueOf(value).isBlank()) {
            return String.valueOf(value);
        }
        String defaultValue = customerMapper.defaultEnumValue(enumType);
        if (defaultValue == null || defaultValue.isBlank()) {
            throw new IllegalArgumentException(label + "未配置默认枚举值，请先在资源管理中配置");
        }
        return defaultValue;
    }

    private CustomerDto enrichCustomer(CustomerEntity customer) {
        if (customer == null) {
            throw new IllegalArgumentException("客户不存在");
        }
        String id = customer.getId();
        return customerConverter.toDto(
                customer,
                customerMapper.ownerNames(id, "sales"),
                customerMapper.ownerNames(id, "support"),
                customerMapper.contacts(id),
                customerMapper.materials(id),
                customerMapper.followups(id),
                customerMapper.projects(id)
        );
    }

    private void replaceOwners(String customerId, CustomerRequest request) {
        customerMapper.deleteOwners(customerId);
        for (String owner : request.safeSalesOwners()) {
            UserLookupEntity user = requireUser(owner, "负责销售");
            customerMapper.insertOwner(IdUtil.nanoId("co"), customerId, "sales", user.getId(), user.getName());
        }
        for (String owner : request.safeSupportOwners()) {
            UserLookupEntity user = requireUser(owner, "负责技术支持");
            customerMapper.insertOwner(IdUtil.nanoId("co"), customerId, "support", user.getId(), user.getName());
        }
    }

    private UserLookupEntity requireUser(String accountOrName, String label) {
        if (accountOrName == null || accountOrName.isBlank()) {
            throw new IllegalArgumentException(label + "必须从已有用户中选择");
        }
        List<UserLookupEntity> users = customerMapper.usersByAccountOrName(accountOrName);
        if (users.isEmpty()) {
            throw new IllegalArgumentException(label + "不存在，请从已有用户中选择");
        }
        return users.getFirst();
    }

    private CustomerEntity requireCustomer(String id) {
        CustomerEntity customer = customerMapper.load(id);
        if (customer == null) {
            throw new IllegalArgumentException("客户不存在");
        }
        return customer;
    }

    private void ensureUniqueShortName(String shortName, String excludeId) {
        if (customerMapper.countByShortName(shortName.trim(), excludeId == null ? "" : excludeId) > 0) {
            throw new IllegalArgumentException("客户简称已存在，请更换1-5位英文简称");
        }
    }

    private String uniqueCustomerId(String source) {
        return IdUtil.numericId();
    }
}
