import { Alert, Skeleton } from 'antd';
import type { ReactNode } from 'react';

type DataStateProps = {
  loading?: boolean;
  error?: unknown;
  children: ReactNode;
};

export function DataState({ loading, error, children }: DataStateProps) {
  if (loading) return <Skeleton active paragraph={{ rows: 8 }} />;
  if (error) return <Alert type="error" showIcon message="数据加载失败" description={error instanceof Error ? error.message : '请稍后重试，或检查后端服务状态。'} />;
  return <>{children}</>;
}
