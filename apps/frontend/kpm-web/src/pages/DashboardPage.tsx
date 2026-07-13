import { CheckCircleOutlined, ClockCircleOutlined, ProjectOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Card, Col, Empty, Row } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataState } from '../components/common/DataState';
import { PageScaffold } from '../components/PageScaffold';
import { StatCard } from '../components/StatCard';
import { useAuth } from '../context/AuthContext';
import { useKpmData } from '../hooks/useKpmData';
import { kpmApi } from '../services/kpmApi';
import type { Project } from '../types';
import { EnumCode, EnumType } from '../types/businessEnums';
import { resolveTaskUser } from '../utils/taskScope';

export function DashboardPage() {
  const { data, isLoading, error } = useKpmData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const completedStatusValues = useMemo(() => (data?.bootstrap?.enumItems || [])
      .filter((item) => item.enumType === EnumType.taskStatus && item.value === EnumCode.completed)
      .map((item) => item.value)
      .filter(Boolean), [data?.bootstrap?.enumItems]);
  const currentTaskUser = useMemo(() => resolveTaskUser(data?.bootstrap?.users || [], user), [data?.bootstrap?.users, user]);
  const taskStatsQuery = useQuery({
    queryKey: ['kpm', 'task-user-stats', currentTaskUser.id, completedStatusValues],
    queryFn: () => kpmApi.taskUserStats({
      userId: currentTaskUser.id,
      completedStatuses: completedStatusValues,
    }),
    enabled: Boolean(currentTaskUser.id && data?.bootstrap),
    staleTime: 10_000,
  });
  const taskStats = {
    total: taskStatsQuery.data?.total || 0,
    mine: taskStatsQuery.data?.mine || 0,
    waiting: taskStatsQuery.data?.waiting || 0,
    completed: taskStatsQuery.data?.completed || 0,
    currentUserId: taskStatsQuery.data?.userId || currentTaskUser.id,
  };

  const recentProjects = (data?.projects || []).slice(0, 12);

  return (
    <PageScaffold title="工作台" subtitle="快速查看与你有关的任务、项目与系统动态。">
      <DataState loading={isLoading || taskStatsQuery.isLoading} error={error || taskStatsQuery.error}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}><StatCard icon={<UnorderedListOutlined />} title="任务总数" value={taskStats.total} onClick={() => navigate(`/tasks?scope=related&userId=${encodeURIComponent(taskStats.currentUserId || '')}`)} /></Col>
          <Col xs={24} md={6}><StatCard icon={<ClockCircleOutlined />} title="我正在执行" value={taskStats.mine} accent="green" onClick={() => navigate(`/tasks?assignee=me&assigneeUserId=${encodeURIComponent(taskStats.currentUserId || '')}`)} /></Col>
          <Col xs={24} md={6}><StatCard icon={<ClockCircleOutlined />} title="等待他人" value={taskStats.waiting} accent="yellow" onClick={() => navigate(`/tasks?assignee=others&userId=${encodeURIComponent(taskStats.currentUserId || '')}`)} /></Col>
          <Col xs={24} md={6}><StatCard icon={<CheckCircleOutlined />} title="已完成" value={taskStats.completed} accent="blue" onClick={() => navigate(`/tasks?scope=related&status=completed&userId=${encodeURIComponent(taskStats.currentUserId || '')}`)} /></Col>
        </Row>

        <Row gutter={[16, 16]} className="kpm-section-row">
          <Col xs={24}>
            <Card title="项目气泡" className="kpm-card" extra={<ProjectOutlined />}>
              {recentProjects.length ? (
                <div className="kpm-project-bubbles">
                  {recentProjects.map((project: Project, index) => (
                    <button key={project.id} className={`project-bubble tone-${index % 6}`} type="button" onClick={() => navigate(`/projects/${project.id}`, { state: { from: '/dashboard' } })}>
                      <strong>{project.externalName}</strong>
                      <span>{project.modelName || project.internalName || '未设置型号'}</span>
                    </button>
                  ))}
                </div>
              ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无项目" />}
            </Card>
          </Col>
        </Row>
      </DataState>
    </PageScaffold>
  );
}
