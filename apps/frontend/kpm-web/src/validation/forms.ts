import { isEmail } from './email';

export const validationRules = {
  required: (label: string) => ({ required: true, message: label.startsWith('请输入') || label.startsWith('请选择') ? label : `请输入${label}` }),
  email: () => ({ validator: (_: unknown, value: string) => (!value || isEmail(value) ? Promise.resolve() : Promise.reject(new Error('请输入正确的邮箱格式'))) }),
  max: (max: number) => ({ max, message: `不能超过 ${max} 个字符` }),
  customerShortName: () => ({ pattern: /^[A-Z]{1,5}$/, message: '客户简称必须为1-5个英文字母' }),
};
