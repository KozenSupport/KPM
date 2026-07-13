import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';
import type { BootstrapData } from '../../types';
import { businessEnumOptions } from '../../utils/businessEnums';

type EnumSelectProps = SelectProps & {
  bootstrap?: BootstrapData;
  enumType: string;
  includeInactive?: boolean;
};

export function EnumSelect({ bootstrap, enumType, includeInactive = false, ...props }: EnumSelectProps) {
  const { i18n } = useTranslation();
  const options = businessEnumOptions(bootstrap?.enumItems, enumType, i18n.language, includeInactive);
  return <Select showSearch allowClear optionFilterProp="label" options={options} {...props} />;
}
