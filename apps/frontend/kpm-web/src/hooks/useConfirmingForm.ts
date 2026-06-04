import { Modal } from 'antd';

export function confirmSubmit(title: string, onOk: () => Promise<void> | void) {
  Modal.confirm({
    title,
    content: '请确认当前表单信息无误。提交后将写入后端数据库。',
    okText: '确认提交',
    cancelText: '继续编辑',
    onOk,
  });
}
