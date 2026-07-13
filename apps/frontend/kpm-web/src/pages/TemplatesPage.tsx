import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Modal, Select, Table, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionButtons } from '../components/common/ActionButtons';
import { DataState } from '../components/common/DataState';
import { PageScaffold } from '../components/PageScaffold';
import { StatusTag } from '../components/StatusTag';
import { useKpmData, useRefreshKpmData } from '../hooks/useKpmData';
import { useActionLock } from '../hooks/useActionLock';
import { confirmSubmit } from '../hooks/useConfirmingForm';
import { kpmApi } from '../services/kpmApi';
import type { AnyRecord } from '../types';
import { EnumCode } from '../types/businessEnums';
import { fixedEnumOptions } from '../utils/businessEnums';
import { validationRules } from '../validation';

function stagesToText(stages: AnyRecord[] | string[] | undefined) {
  return (stages || []).map((stage: AnyRecord | string) => typeof stage === 'string' ? stage : stage.stageName || stage.name).filter(Boolean).join('\n');
}

function textToStages(text = '') {
  return text.split('\n').map((name) => name.trim()).filter(Boolean);
}

export function TemplatesPage() {
  const { data, isLoading, error } = useKpmData();
  const { i18n } = useTranslation();
  const refresh = useRefreshKpmData();
  const [form] = Form.useForm();
  const [editing, setEditing] = useState<AnyRecord | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { isLocked, runLocked } = useActionLock();

  function openCreate() {
    setEditing(null);
    form.resetFields();
    form.setFieldsValue({ scope: 'POS 项目', status: EnumCode.active });
    setModalOpen(true);
  }

  function openEdit(row: AnyRecord) {
    setEditing(row);
    form.setFieldsValue({ ...row, stagesText: stagesToText(row.stages) });
    setModalOpen(true);
  }

  async function submit() {
    const values = await form.validateFields();
    const payload = { ...values, stages: textToStages(values.stagesText) };
    delete payload.stagesText;
    confirmSubmit(editing ? '确认修改流程模板？' : '确认新增流程模板？', async () => {
      await runLocked('template-save', async () => {
        if (editing) await kpmApi.updateTemplate(editing.id, payload);
        else await kpmApi.createTemplate(payload);
        message.success('流程模板已保存');
        setModalOpen(false);
        form.resetFields();
        refresh();
      });
    });
  }

  return (
    <PageScaffold title="流程模板" subtitle="维护项目默认阶段模板，后续项目创建时可按模板初始化阶段。" extra={<Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>新增模板</Button>}>
      <DataState loading={isLoading} error={error}>
        <Card className="kpm-card">
          <Table size="small" rowKey={(row: AnyRecord) => row.id} dataSource={data?.templates || []} columns={[
            { title: '模板名称', dataIndex: 'name', ellipsis: true },
            { title: '适用范围', dataIndex: 'scope', width: 180 },
            { title: '状态', dataIndex: 'status', width: 100, render: (value) => <StatusTag value={value} /> },
            { title: '阶段数', dataIndex: 'stages', width: 90, render: (value = []) => value.length },
            { title: '操作', width: 112, render: (_, row) => <ActionButtons onEdit={() => openEdit(row)} onDelete={() => kpmApi.deleteTemplate(row.id).then(() => { message.success('模板已删除'); refresh(); })} /> },
          ]} />
        </Card>
        <Modal title={editing ? '编辑流程模板' : '新增流程模板'} open={modalOpen} maskClosable onCancel={() => setModalOpen(false)} onOk={submit} confirmLoading={isLocked('template-save')} width={680}>
          <Form form={form} layout="vertical">
            <Form.Item name="name" label="模板名称" rules={[validationRules.required('请输入模板名称')]}><Input /></Form.Item>
            <Form.Item name="scope" label="适用范围" rules={[validationRules.required('请输入适用范围')]}><Input /></Form.Item>
            <Form.Item name="status" label="状态" rules={[validationRules.required('请选择状态')]}><Select options={fixedEnumOptions([EnumCode.active, EnumCode.inactive], i18n.language)} /></Form.Item>
            <Form.Item name="stagesText" label="阶段列表（一行一个阶段）" rules={[validationRules.required('请输入阶段列表')]}><Input.TextArea rows={10} /></Form.Item>
          </Form>
        </Modal>
      </DataState>
    </PageScaffold>
  );
}
