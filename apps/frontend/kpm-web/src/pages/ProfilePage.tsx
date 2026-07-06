import {
  CheckCircleOutlined,
  CustomerServiceOutlined,
  FileProtectOutlined,
  FolderOpenOutlined,
  LockOutlined,
  LogoutOutlined,
  MailOutlined,
  ProjectOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, Avatar, Button, Card, Col, Descriptions, Form, Input, Modal, Row, Skeleton, Space, Statistic, Tag, Typography, message } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type * as echarts from 'echarts';
import { EChart } from '../components/charts/EChart';
import { useAuth } from '../context/AuthContext';
import { kpmApi } from '../services/kpmApi';
import type { ProfileStats } from '../types';

const { Title, Text, Paragraph } = Typography;

type PasswordFormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  code: string;
};

type MetricConfig = {
  key: keyof ProfileStats;
  label: string;
  hint: string;
  icon: ReactNode;
  color: string;
};

const metricConfigs: MetricConfig[] = [
  { key: 'completedTasks', label: '完成任务', hint: '体现个人交付成果', icon: <CheckCircleOutlined />, color: '#21a67a' },
  { key: 'assignedTasks', label: '承接任务', hint: '分配给我的任务总量', icon: <SafetyCertificateOutlined />, color: '#1677ff' },
  { key: 'createdTasks', label: '创建任务', hint: '主动发起和记录的问题', icon: <FileProtectOutlined />, color: '#f5a400' },
  { key: 'participatedTasks', label: '参与任务', hint: '协作参与的任务数量', icon: <TeamOutlined />, color: '#7c3aed' },
  { key: 'customerReplies', label: '客户回复', hint: '外部留言/客户沟通次数', icon: <CustomerServiceOutlined />, color: '#00a6a6' },
  { key: 'publishedKbArticles', label: 'KB文章', hint: '沉淀的知识库内容', icon: <FolderOpenOutlined />, color: '#ff5c8a' },
  { key: 'projectCount', label: '参与项目', hint: '参与或负责的项目数量', icon: <ProjectOutlined />, color: '#4568dc' },
  { key: 'customerCount', label: '服务客户', hint: '负责或服务的客户数量', icon: <UserOutlined />, color: '#52c41a' },
];

function statValue(stats: ProfileStats | undefined, key: keyof ProfileStats) {
  return Number(stats?.[key] || 0);
}

function buildAchievementOption(stats: ProfileStats | undefined): echarts.EChartsCoreOption {
  const labels = metricConfigs.map((item) => item.label);
  const values = metricConfigs.map((item) => statValue(stats, item.key));
  return {
    color: metricConfigs.map((item) => item.color),
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: 30, right: 20, top: 26, bottom: 58, containLabel: true },
    xAxis: {
      type: 'category',
      data: labels,
      axisLabel: { interval: 0, color: '#5b6475' },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      splitLine: { lineStyle: { color: 'rgba(22, 119, 255, 0.08)' } },
    },
    series: [
      {
        name: '数量',
        type: 'bar',
        data: values.map((value, index) => ({ value, itemStyle: { color: metricConfigs[index].color, borderRadius: [10, 10, 4, 4] } })),
        barMaxWidth: 42,
        label: { show: true, position: 'top', color: '#263043', fontWeight: 700 },
      },
    ],
  };
}

function buildCompositionOption(stats: ProfileStats | undefined): echarts.EChartsCoreOption {
  const data = metricConfigs
    .slice(0, 6)
    .map((item) => ({ name: item.label, value: statValue(stats, item.key), itemStyle: { color: item.color } }))
    .filter((item) => item.value > 0);
  return {
    tooltip: { trigger: 'item' },
    legend: { bottom: 0, type: 'scroll' },
    series: [
      {
        name: '成果构成',
        type: 'pie',
        radius: ['48%', '72%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: true,
        label: { formatter: '{b}\n{c}' },
        data: data.length ? data : [{ name: '暂无数据', value: 1, itemStyle: { color: '#d9e1ef' } }],
      },
    ],
  };
}

export function ProfilePage() {
  const navigate = useNavigate();
  const { user: sessionUser, logout } = useAuth();
  const [form] = Form.useForm<PasswordFormValues>();
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [debugCode, setDebugCode] = useState<string | null>(null);
  const [codeSent, setCodeSent] = useState(false);

  const profileQuery = useQuery({ queryKey: ['iam-profile'], queryFn: kpmApi.profile });
  const profile = profileQuery.data;
  const profileUser = profile?.user || sessionUser;
  const stats = profile?.stats;

  const achievementOption = useMemo(() => buildAchievementOption(stats), [stats]);
  const compositionOption = useMemo(() => buildCompositionOption(stats), [stats]);

  const sendCodeMutation = useMutation({
    mutationFn: async () => {
      const values = await form.validateFields(['oldPassword', 'newPassword', 'confirmPassword']);
      if (values.newPassword !== values.confirmPassword) throw new Error('两次输入的新密码不一致');
      return kpmApi.requestPasswordCode({ oldPassword: values.oldPassword, newPassword: values.newPassword });
    },
    onSuccess: (result) => {
      setCodeSent(true);
      setDebugCode(result.debugCode || null);
      message.success(result.message || '验证码已发送到登录邮箱');
    },
    onError: (error) => message.error(error instanceof Error ? error.message : '验证码发送失败'),
  });

  const changePasswordMutation = useMutation({
    mutationFn: async () => {
      const values = await form.validateFields();
      if (values.newPassword !== values.confirmPassword) throw new Error('两次输入的新密码不一致');
      return kpmApi.changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        code: values.code,
      });
    },
    onSuccess: () => {
      message.success('密码已修改，请使用新密码重新登录');
      setPasswordOpen(false);
      form.resetFields();
      setDebugCode(null);
      setCodeSent(false);
      logout();
      navigate('/login', { replace: true });
    },
    onError: (error) => message.error(error instanceof Error ? error.message : '密码修改失败'),
  });

  function openPasswordModal() {
    setPasswordOpen(true);
    setDebugCode(null);
    setCodeSent(false);
  }

  function closePasswordModal() {
    setPasswordOpen(false);
  }

  if (profileQuery.isLoading) {
    return <div className="kpm-page"><Skeleton active paragraph={{ rows: 10 }} /></div>;
  }

  return (
    <div className="kpm-page kpm-profile-page">
      {profileQuery.isError && (
        <Alert
          type="warning"
          showIcon
          message="个人统计暂时加载失败"
          description={profileQuery.error instanceof Error ? profileQuery.error.message : '请稍后刷新页面重试。'}
        />
      )}
      <Card className="kpm-profile-hero">
        <Space align="center" size={22} className="kpm-profile-identity">
          <Avatar
            className="kpm-profile-avatar"
            size={92}
            src={`https://api.dicebear.com/10.x/adventurer/svg?seed=${encodeURIComponent(profileUser?.account || 'kozen')}&backgroundColor=fff35a,b7ff38,1fd7c7`}
          />
          <div>
            <Title level={3}>{profileUser?.name || '未登录用户'}</Title>
            <Paragraph type="secondary">在 KPM 中沉淀协作、服务客户、推进项目的个人工作成果。</Paragraph>
            <Space wrap>
              {(profileUser?.roles || []).map((role) => <Tag color="gold" key={role}>{role}</Tag>)}
              {(profileUser?.departments || []).map((department) => <Tag color="cyan" key={department}>{department}</Tag>)}
            </Space>
          </div>
        </Space>
        <Descriptions className="kpm-profile-descriptions" column={{ xs: 1, sm: 2, lg: 4 }} size="small">
          <Descriptions.Item label="姓名">{profileUser?.name || '-'}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{profileUser?.email || profileUser?.account || '-'}</Descriptions.Item>
          <Descriptions.Item label="部门">{profileUser?.departments?.join('、') || '-'}</Descriptions.Item>
          <Descriptions.Item label="角色">{profileUser?.roles?.join('、') || '-'}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Row gutter={[16, 16]} className="kpm-profile-metrics">
        {metricConfigs.map((item) => (
          <Col xs={12} sm={8} lg={6} xl={3} key={item.key}>
            <Card className="kpm-profile-stat-card" styles={{ body: { padding: 16 } }}>
              <Statistic
                title={<span title={item.hint}>{item.label}</span>}
                value={statValue(stats, item.key)}
                prefix={<span style={{ color: item.color }}>{item.icon}</span>}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={16}>
          <Card title="个人成果趋势概览" className="kpm-card-tech">
            <EChart option={achievementOption} height={360} />
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card title="成果构成" className="kpm-card-tech">
            <EChart option={compositionOption} height={360} />
          </Card>
        </Col>
      </Row>

      <Card className="kpm-profile-actions" title="账号安全">
        <Space wrap>
          <Button type="primary" icon={<LockOutlined />} onClick={openPasswordModal}>修改密码</Button>
          <Button icon={<LogoutOutlined />} onClick={logout}>退出登录</Button>
        </Space>
        <Text type="secondary">修改密码需要先校验原密码，并通过登录邮箱验证码确认。</Text>
      </Card>

      <Modal
        title="修改密码"
        open={passwordOpen}
        onCancel={closePasswordModal}
        footer={null}
        destroyOnHidden={false}
        maskClosable
        className="kpm-rounded-modal"
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item name="oldPassword" label="原密码" rules={[{ required: true, message: '请输入原密码' }, { max: 128, message: '原密码不能超过128位' }]}>
            <Input.Password placeholder="请输入当前密码" />
          </Form.Item>
          <Form.Item name="newPassword" label="新密码" rules={[{ required: true, message: '请输入新密码' }, { min: 6, message: '新密码至少6位' }, { max: 128, message: '新密码不能超过128位' }]}>
            <Input.Password placeholder="请输入新密码" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="确认新密码"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: '请再次输入新密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) return Promise.resolve();
                  return Promise.reject(new Error('两次输入的新密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请再次输入新密码" />
          </Form.Item>
          <Form.Item label="邮箱验证码" required>
            <Space.Compact className="kpm-code-input">
              <Form.Item name="code" noStyle rules={[{ required: true, message: '请输入邮箱验证码' }, { max: 16, message: '验证码不能超过16位' }]}>
                <Input prefix={<MailOutlined />} placeholder="6位验证码" maxLength={16} />
              </Form.Item>
              <Button loading={sendCodeMutation.isPending} onClick={() => sendCodeMutation.mutate()}>
                {codeSent ? '重新发送' : '发送验证码'}
              </Button>
            </Space.Compact>
          </Form.Item>
          {debugCode && <Alert className="kpm-profile-code-alert" type="info" showIcon message={`开发环境验证码：${debugCode}`} />}
          <Space className="kpm-profile-modal-actions">
            <Button onClick={closePasswordModal}>取消</Button>
            <Button type="primary" loading={changePasswordMutation.isPending} onClick={() => changePasswordMutation.mutate()}>
              确认修改
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
}
