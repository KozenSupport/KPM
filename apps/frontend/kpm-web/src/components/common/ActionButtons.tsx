import { DeleteOutlined, EditOutlined, EyeOutlined, InboxOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import type { ReactNode } from 'react';

type ActionButtonsProps = {
  onView?: () => void;
  onEdit?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  archiveTitle?: string;
  deleteTitle?: string;
  extra?: ReactNode;
};

export function ActionButtons({ onView, onEdit, onArchive, onDelete, archiveTitle = '确认归档这条数据？', deleteTitle = '确认删除这条数据？', extra }: ActionButtonsProps) {
  return (
    <Space size={4} className="kpm-row-actions">
      {onView ? <Tooltip title="查看"><Button size="small" type="text" icon={<EyeOutlined />} onClick={onView} /></Tooltip> : null}
      {onEdit ? <Tooltip title="编辑"><Button size="small" type="text" icon={<EditOutlined />} onClick={onEdit} /></Tooltip> : null}
      {onArchive ? (
        <Popconfirm title={archiveTitle} okText="确认" cancelText="取消" onConfirm={onArchive}>
          <Tooltip title="归档"><Button size="small" type="text" icon={<InboxOutlined />} /></Tooltip>
        </Popconfirm>
      ) : null}
      {onDelete ? (
        <Popconfirm title={deleteTitle} okText="删除" cancelText="取消" okButtonProps={{ danger: true }} onConfirm={onDelete}>
          <Tooltip title="删除"><Button size="small" danger type="text" icon={<DeleteOutlined />} /></Tooltip>
        </Popconfirm>
      ) : null}
      {extra}
    </Space>
  );
}
