import { Navigate, Route, Routes } from 'react-router-dom';
import { AnalyticsShell } from './analytics/AnalyticsShell';
import { ActivityMatrixPage } from './analytics/ActivityMatrixPage';
import { OrderAnalyticsPage } from './analytics/OrderAnalyticsPage';
import { ResourceMapAnalyticsPage } from './analytics/ResourceMapAnalyticsPage';
import { SupportAnalyticsPage } from './analytics/SupportAnalyticsPage';

export function AnalyticsPage() {
  return (
    <Routes>
      <Route element={<AnalyticsShell />}>
        <Route index element={<Navigate to="orders" replace />} />
        <Route path="orders" element={<OrderAnalyticsPage />} />
        <Route path="support" element={<SupportAnalyticsPage />} />
        <Route path="resources" element={<ResourceMapAnalyticsPage />} />
        <Route path="activity" element={<ActivityMatrixPage />} />
      </Route>
    </Routes>
  );
}
