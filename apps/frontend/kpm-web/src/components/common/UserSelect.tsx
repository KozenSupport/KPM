import { Select } from 'antd';
import type { SelectProps } from 'antd';
import type { BootstrapData } from '../../types';

type UserSelectProps = SelectProps & {
  bootstrap?: BootstrapData;
  valueField?: 'account' | 'id' | 'name';
};

export function UserSelect({ bootstrap, valueField = 'account', ...props }: UserSelectProps) {
  const options = (bootstrap?.users || []).map((user) => ({
    label: `${user.name}（${user.account || user.email || user.id}）`,
    value: String(user[valueField] || user.account || user.id),
  }));
  return <Select showSearch allowClear optionFilterProp="label" options={options} {...props} />;
}
