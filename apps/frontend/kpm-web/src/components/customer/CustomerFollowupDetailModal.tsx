import { DownloadOutlined, PaperClipOutlined } from '@ant-design/icons';
import { Button, Descriptions, Modal, Space, Typography, message } from 'antd';
import type { CustomerFollowup } from '../../types';
import { downloadBusinessFile } from '../../utils/fileUpload';
import { dateTimeText } from '../../utils/format';

type CustomerFollowupDetailModalProps = {
  followup: CustomerFollowup | null;
  onClose: () => void;
};

export function CustomerFollowupDetailModal({ followup, onClose }: CustomerFollowupDetailModalProps) {
  const attachments = Array.isArray(followup?.attachments) ? followup.attachments : [];

  return (
    <Modal
      title="跟进记录详情"
      open={Boolean(followup)}
      onCancel={onClose}
      footer={<Button onClick={onClose}>关闭</Button>}
      width={720}
      zIndex={1200}
    >
      {followup ? (
        <Space direction="vertical" size={18} style={{ width: '100%' }}>
          <Descriptions bordered column={2} size="small">
            <Descriptions.Item label="记录人">{followup.author || '-'}</Descriptions.Item>
            <Descriptions.Item label="记录时间">{dateTimeText(followup.createdAt)}</Descriptions.Item>
          </Descriptions>

          <section>
            <Typography.Title level={5}>跟进内容</Typography.Title>
            <div className="kpm-followup-detail-content">{followup.content || '-'}</div>
          </section>

          <section>
            <Typography.Title level={5}>
              <PaperClipOutlined /> 附件 ({attachments.length})
            </Typography.Title>
            {attachments.length ? (
              <Space direction="vertical" size={8} className="kpm-followup-attachments">
                {attachments.map((file, index) => (
                  <Button
                    key={file.objectKey || file.fileName || file.name || index}
                    icon={<DownloadOutlined />}
                    onClick={() =>
                      downloadBusinessFile(file).catch((error) =>
                        message.error(error.message || '附件下载失败'),
                      )
                    }
                  >
                    {file.fileName || file.name || `附件 ${index + 1}`}
                  </Button>
                ))}
              </Space>
            ) : (
              <Typography.Text type="secondary">暂无附件</Typography.Text>
            )}
          </section>
        </Space>
      ) : null}
    </Modal>
  );
}
