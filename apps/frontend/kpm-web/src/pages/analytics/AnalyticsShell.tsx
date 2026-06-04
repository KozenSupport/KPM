import { Tabs } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PageScaffold } from '../../components/PageScaffold';

const analyticsTabs = [
  { key: '/analytics/orders', label: '订单情况' },
  { key: '/analytics/support', label: '技术支持情况' },
  { key: '/analytics/resources', label: '资源分布' },
  { key: '/analytics/activity', label: '客户×项目活跃度' },
];

export function AnalyticsShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeKey = analyticsTabs.find((item) => location.pathname.startsWith(item.key))?.key || '/analytics/orders';

  return (
    <PageScaffold title="统计看板" subtitle="按业务主题拆分统计视图，避免信息堆叠；每个二级页面聚焦一种决策场景。">
      <Tabs className="kpm-analytics-tabs" activeKey={activeKey} items={analyticsTabs} onChange={(key) => navigate(key)} />
      <Outlet />
    </PageScaffold>
  );
}
