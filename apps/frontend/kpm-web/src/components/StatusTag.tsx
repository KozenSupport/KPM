import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import type { BusinessEnumItem } from '../types';
import { businessEnumLabel, businessStatusColor } from '../utils/businessEnums';

type StatusTagProps = {
  value?: string | boolean | null;
  enumItems?: BusinessEnumItem[];
  enumType?: string;
  label?: string;
};

export function StatusTag({ value, enumItems, enumType, label }: StatusTagProps) {
  const { i18n } = useTranslation();
  const text = label || businessEnumLabel(enumItems, enumType, value, i18n.language);
  return <Tag color={businessStatusColor(value)}>{text}</Tag>;
}
