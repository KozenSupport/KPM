import { Select } from 'antd';
import type { SelectProps } from 'antd';
import type { Customer } from '../../types';

type CustomerSelectProps = SelectProps & {
  customers?: Customer[];
};

export function CustomerSelect({ customers = [], ...props }: CustomerSelectProps) {
  const options = customers.map((customer) => ({ label: `${customer.name}${customer.region ? ` · ${customer.region}` : ''}`, value: customer.id }));
  return <Select showSearch allowClear optionFilterProp="label" options={options} {...props} />;
}
