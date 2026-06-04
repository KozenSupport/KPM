import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Descriptions, Drawer, Form, Input, Modal, Select, Space, Switch, Table, Tag, Typography, message } from 'antd';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ActionButtons } from '../components/common/ActionButtons';
import { CustomerSelect } from '../components/common/CustomerSelect';
import { DataState } from '../components/common/DataState';
import { EnumSelect } from '../components/common/EnumSelect';
import { ProjectSelect } from '../components/common/ProjectSelect';
import { UserSelect } from '../components/common/UserSelect';
import { PageScaffold } from '../components/PageScaffold';
import { StatusTag } from '../components/StatusTag';
import { useAuth } from '../context/AuthContext';
import { useKpmData, useRefreshKpmData } from '../hooks/useKpmData';
import { confirmSubmit } from '../hooks/useConfirmingForm';
import { kpmApi } from '../services/kpmApi';
import type { AnyRecord, Task } from '../types';
import { compactId, dateText, includesKeyword, isAssignedToUser, isClosedTaskStatus } from '../utils/format';
import { validationRules } from '../validation';

export function TasksPage() {
  const { data, isLoading, error } = useKpmData();
  const refresh = useRefreshKpmData();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [commentForm] = Form.useForm();
  const [editing, setEditing] = useState<Task | null>(null);
  const [detail, setDetail] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState({ keyword: '', status: undefined as string | undefined, category: undefined as string | undefined, customerId: searchParams.get('customerId') || undefined });

  const tasks = useMemo(() => {
    const requestedId = searchParams.get('id');
    const assigneeScope = searchParams.get('assignee');
    const currentName = user?.name || user?.account || '';
    return (data?.tasks || []).filter((task) => {
      if (requestedId && task.id !== requestedId) return false;
      if (assigneeScope === 'me') {
        if (isClosedTaskStatus(task.status) || !isAssignedToUser(task.assignees, currentName)) return false;
      }
      if (assigneeScope === 'others') {
        if (isClosedTaskStatus(task.status) || isAssignedToUser(task.assignees, currentName)) return false;
      }
      const matchesKeyword = includesKeyword([task.taskNo, task.title, task.description, task.projectName, task.customerName], filters.keyword);
      const matchesStatus = !filters.status || task.status === filters.status;
      const matchesCategory = !filters.category || task.category === filters.category;
      const matchesCustomer = !filters.customerId || task.customerId === filters.customerId;
      return matchesKeyword && matchesStatus && matchesCategory && matchesCustomer;
    });
  }, [data?.tasks, filters, searchParams, user?.account, user?.name]);

  function openCreate(initial?: Partial<Task>) {
    setEditing(null);
    form.resetFields();
    form.setFieldsValue({ creator: user?.name || user?.account, category: '需求', priority: '中', blocked: false, ...initial });
    setModalOpen(true);
  }

  function openEdit(task: Task) {
    setEditing(task);
    form.setFieldsValue(task);
    setModalOpen(true);
  }

  async function submitTask() {
    const values = await form.validateFields();
    confirmSubmit(editing ? '确认修改任务？' : '确认新增任务？', async () => {
      if (editing) await kpmApi.updateTask(editing.id, values);
      else await kpmApi.createTask(values);
      message.success(editing ? '任务已更新' : '任务已创建');
      setModalOpen(false);
      form.resetFields();
      refresh();
    });
  }

  async function addComment() {
    if (!detail) return;
    const values = await commentForm.validateFields();
    await kpmApi.addTaskComment(detail.id, { ...values, author: user?.name || user?.account || '当前用户', attachments: [] });
    message.success('评论已发布');
    commentForm.resetFields();
    refresh();
  }

  return (
    <PageScaffold title="任务管理" subtitle="记录和管理项目成员日常任务，支持客户、项目、阶段维度关联。" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => openCreate()}>新增任务</Button>}>
      <DataState loading={isLoading} error={error}>
        <Card className="kpm-card kpm-filter-card">
          <Space wrap>
            <Input.Search allowClear placeholder="搜索任务编号 / 标题 / 项目 / 客户" onSearch={(keyword) => setFilters((prev) => ({ ...prev, keyword }))} onChange={(e) => setFilters((prev) => ({ ...prev, keyword: e.target.value }))} />
            <EnumSelect bootstrap={data?.bootstrap} enumType="task_status" placeholder="任务状态" value={filters.status} onChange={(status) => setFilters((prev) => ({ ...prev, status }))} style={{ width: 160 }} />
            <EnumSelect bootstrap={data?.bootstrap} enumType="task_category" placeholder="任务分类" value={filters.category} onChange={(category) => setFilters((prev) => ({ ...prev, category }))} style={{ width: 160 }} />
            <CustomerSelect customers={data?.customers} placeholder="客户" value={filters.customerId} onChange={(customerId) => setFilters((prev) => ({ ...prev, customerId }))} style={{ width: 220 }} />
          </Space>
        </Card>
        <Card className="kpm-card">
          <Table<Task>
            size="small"
            rowKey="id"
            dataSource={tasks}
            pagination={{ pageSize: 12, showSizeChanger: true }}
            columns={[
              { title: '编号', dataIndex: 'taskNo', width: 110, render: (value, row) => <Typography.Text code>{value || compactId(row.id)}</Typography.Text> },
              { title: '标题', dataIndex: 'title', ellipsis: true, render: (title, row) => <button className="link-button truncate" type="button" onClick={() => setDetail(row)}>{title}</button> },
              { title: '分类', dataIndex: 'category', width: 100, render: (value) => <Tag>{value || '-'}</Tag> },
              { title: '状态', dataIndex: 'status', width: 120, render: (value) => <StatusTag value={value} /> },
              { title: '优先级', dataIndex: 'priority', width: 90 },
              { title: '项目/客户', width: 210, render: (_, row) => <span className="subtle-text">{row.projectName || '中性任务'} / {row.customerName || '所有客户'}</span> },
              { title: '执行者', dataIndex: 'assignees', width: 160, render: (names?: string[]) => <Space wrap>{(names || []).slice(0, 2).map((name) => <Tag key={name}>{name}</Tag>)}</Space> },
              { title: '预期完成', dataIndex: 'expectedCompletionAt', width: 120, render: dateText },
              { title: '操作', width: 112, fixed: 'right', render: (_, row) => <ActionButtons onView={() => setDetail(row)} onEdit={() => openEdit(row)} onDelete={() => kpmApi.deleteTask(row.id).then(() => { message.success('任务已删除'); refresh(); })} /> },
            ]}
          />
        </Card>
        <Modal title={editing ? '编辑任务' : '新增任务'} open={modalOpen} maskClosable onCancel={() => setModalOpen(false)} onOk={submitTask} width={760}>
          <Form form={form} layout="vertical" requiredMark={false}>
            <Form.Item name="title" label="任务标题" rules={[validationRules.required('请输入任务标题'), validationRules.max(120)]}><Input /></Form.Item>
            <Form.Item name="description" label="任务描述" rules={[validationRules.max(3000)]}><Input.TextArea rows={4} /></Form.Item>
            <Space.Compact block>
              <Form.Item name="projectId" label="项目" style={{ width: '50%' }}><ProjectSelect projects={data?.projects} /></Form.Item>
              <Form.Item name="customerId" label="客户" style={{ width: '50%' }}><CustomerSelect customers={data?.customers} placeholder="不选择则为所有客户" /></Form.Item>
            </Space.Compact>
            <Space.Compact block>
              <Form.Item name="category" label="分类" rules={[validationRules.required('请选择分类')]} style={{ width: '34%' }}><EnumSelect bootstrap={data?.bootstrap} enumType="task_category" /></Form.Item>
              <Form.Item name="status" label="状态" rules={[validationRules.required('请选择状态')]} style={{ width: '33%' }}><EnumSelect bootstrap={data?.bootstrap} enumType="task_status" /></Form.Item>
              <Form.Item name="priority" label="优先级" rules={[validationRules.required('请选择优先级')]} style={{ width: '33%' }}><EnumSelect bootstrap={data?.bootstrap} enumType="task_priority" /></Form.Item>
            </Space.Compact>
            <Form.Item name="creator" label="创建人" rules={[validationRules.required('请输入创建人')]}><Input disabled /></Form.Item>
            <Form.Item name="assignees" label="执行者"><UserSelect bootstrap={data?.bootstrap} mode="multiple" placeholder="必须从搜索结果中选择" /></Form.Item>
            <Form.Item name="participants" label="参与者"><UserSelect bootstrap={data?.bootstrap} mode="multiple" placeholder="必须从搜索结果中选择" /></Form.Item>
            <Form.Item name="expectedCompletionAt" label="预期完成时间"><Input type="date" /></Form.Item>
            <Form.Item name="blocked" label="是否卡点" valuePropName="checked"><Switch /></Form.Item>
          </Form>
        </Modal>
        <Drawer title={detail?.title || '任务详情'} open={Boolean(detail)} onClose={() => setDetail(null)} width={760} extra={detail ? <Button onClick={() => openEdit(detail)}>编辑</Button> : null}>
          {detail ? <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Descriptions bordered size="small" column={2}>
              <Descriptions.Item label="编号">{detail.taskNo || compactId(detail.id)}</Descriptions.Item>
              <Descriptions.Item label="状态"><StatusTag value={detail.status} /></Descriptions.Item>
              <Descriptions.Item label="分类">{detail.category || '-'}</Descriptions.Item>
              <Descriptions.Item label="优先级">{detail.priority || '-'}</Descriptions.Item>
              <Descriptions.Item label="项目">{detail.projectName || '-'}</Descriptions.Item>
              <Descriptions.Item label="客户">{detail.customerName || '所有客户'}</Descriptions.Item>
              <Descriptions.Item label="创建人">{detail.creator || '-'}</Descriptions.Item>
              <Descriptions.Item label="预期完成">{dateText(detail.expectedCompletionAt)}</Descriptions.Item>
            </Descriptions>
            <Card size="small" title="任务描述"><Typography.Paragraph>{detail.description || '暂无描述'}</Typography.Paragraph></Card>
            <Card size="small" title="附件"><Table size="small" rowKey={(row: AnyRecord) => row.id} pagination={false} dataSource={detail.attachments || []} columns={[{ title: '文件', dataIndex: 'fileName' }, { title: '上传人', dataIndex: 'uploader' }]} /></Card>
            <Card size="small" title="评论 / 留言">
              <Space direction="vertical" style={{ width: '100%' }}>
                {(detail.comments || []).map((comment: AnyRecord) => <article className="kpm-comment" key={comment.id}><strong>{comment.author}</strong><p>{comment.content}</p><small>{comment.createdAt}</small></article>)}
                <Form form={commentForm} layout="vertical"><Form.Item name="content" rules={[validationRules.required('请输入评论内容')]}><Input.TextArea rows={3} placeholder="输入评论" /></Form.Item><Button onClick={addComment}>发布评论</Button></Form>
              </Space>
            </Card>
          </Space> : null}
        </Drawer>
      </DataState>
    </PageScaffold>
  );
}
