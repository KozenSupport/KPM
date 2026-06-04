import { Select } from 'antd';
import type { SelectProps } from 'antd';
import type { BootstrapData } from '../../types';

type EnumSelectProps = SelectProps & {
  bootstrap?: BootstrapData;
  enumType: string;
  includeInactive?: boolean;
};

export function EnumSelect({ bootstrap, enumType, includeInactive = false, ...props }: EnumSelectProps) {
  const options = (bootstrap?.enumItems || [])
    .filter((item) => item.enumType === enumType && (includeInactive || item.active !== false))
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    .map((item) => ({ label: item.name || item.value, value: item.value }));
  return <Select showSearch allowClear optionFilterProp="label" options={options} {...props} />;
}
