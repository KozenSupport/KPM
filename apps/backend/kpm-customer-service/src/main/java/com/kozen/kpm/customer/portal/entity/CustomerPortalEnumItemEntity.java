package com.kozen.kpm.customer.portal.entity;

/** Localized metadata for a business enum exposed to the customer portal. */
public class CustomerPortalEnumItemEntity {
    private String enumType;
    private String value;
    private String name;
    private String nameEn;
    private Integer sortOrder;

    public String getEnumType() { return enumType; }
    public void setEnumType(String enumType) { this.enumType = enumType; }
    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getNameEn() { return nameEn; }
    public void setNameEn(String nameEn) { this.nameEn = nameEn; }
    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}
