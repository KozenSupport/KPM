import type { BusinessEnumItem } from "../types";
import { EnumCode } from "../types/businessEnums";

function isEnglishLanguage(language?: string): boolean {
  return String(language || "").toLowerCase().startsWith("en");
}

type FixedLabel = { zh: string; en: string };

const fixedLabels: Record<string, FixedLabel> = {
  [EnumCode.active]: { zh: "启用", en: "Enabled" },
  [EnumCode.inactive]: { zh: "停用", en: "Disabled" },
  [EnumCode.global]: { zh: "全局角色", en: "Global Role" },
  [EnumCode.project]: { zh: "项目角色", en: "Project Role" },
  [EnumCode.menu]: { zh: "菜单权限", en: "Menu Permission" },
  [EnumCode.button]: { zh: "按钮权限", en: "Button Permission" },
  [EnumCode.published]: { zh: "已发布", en: "Published" },
  [EnumCode.retracted]: { zh: "已撤回", en: "Retracted" },
  [EnumCode.pendingReview]: { zh: "待审核", en: "Pending Review" },
  OBSERVING: { zh: "观察中", en: "Observing" },
  STALLED: { zh: "停滞", en: "Stalled" },
  ABANDONED: { zh: "已放弃", en: "Abandoned" },
};

export function enumItemsOf(items: BusinessEnumItem[] | undefined, enumType: string, includeInactive = false): BusinessEnumItem[] {
  return (items || [])
    .filter((item) => item.enumType === enumType && (includeInactive || item.active !== false))
    .sort((left, right) => (left.sortOrder || 0) - (right.sortOrder || 0));
}

export function enumItemOf(items: BusinessEnumItem[] | undefined, enumType: string, value?: string | null): BusinessEnumItem | undefined {
  if (!value) return undefined;
  return enumItemsOf(items, enumType, true).find((item) => item.value === value);
}

export function fixedEnumLabel(value?: string | boolean | null, language?: string): string {
  if (typeof value === "boolean") return fixedEnumLabel(value ? EnumCode.active : EnumCode.inactive, language);
  const code = String(value || "").trim();
  const label = fixedLabels[code];
  if (!label) return code;
  return isEnglishLanguage(language) ? label.en : label.zh;
}

export function businessEnumLabel(
  items: BusinessEnumItem[] | undefined,
  enumType: string | undefined,
  value?: string | boolean | null,
  language?: string,
): string {
  if (typeof value === "boolean") return fixedEnumLabel(value, language);
  const code = String(value || "").trim();
  if (!code) return "-";
  const item = enumType ? enumItemOf(items, enumType, code) : undefined;
  if (item) {
    if (isEnglishLanguage(language)) return item.nameEn || item.name || item.value;
    return item.name || item.value;
  }
  return fixedEnumLabel(code, language) || code;
}

export function businessEnumOptions(items: BusinessEnumItem[] | undefined, enumType: string, language?: string, includeInactive = false) {
  return enumItemsOf(items, enumType, includeInactive).map((item) => ({
    label: businessEnumLabel(items, enumType, item.value, language),
    value: item.value,
  }));
}

export function fixedEnumOptions(values: readonly string[], language?: string) {
  return values.map((value) => ({ label: fixedEnumLabel(value, language), value }));
}

export function firstEnumCode(items: BusinessEnumItem[] | undefined, enumType: string, preferredCode?: string): string | undefined {
  const values = enumItemsOf(items, enumType);
  if (preferredCode && values.some((item) => item.value === preferredCode)) return preferredCode;
  return values[0]?.value;
}

export function businessStatusColor(value?: string | boolean | null): string {
  const code = typeof value === "boolean" ? (value ? EnumCode.active : EnumCode.inactive) : String(value || "").toUpperCase();
  if (["COMPLETED", "ACTIVE", "SHIPPED", "RECEIVED", "IMPLEMENTED", "PUBLISHED"].includes(code)) return "green";
  if (["IN_PROGRESS", "IN_PRODUCTION", "ORDER_SPRINT", "ACCEPTED", "IMPLEMENTING", "RND_INVESTMENT"].includes(code)) return "blue";
  if (["INACTIVE", "REJECTED", "VOIDED", "RETRACTED", "ABANDONED", "BLACKLISTED", "SUPPORT_ENDED"].includes(code)) return "red";
  return "gold";
}
