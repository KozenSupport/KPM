import type { ReactNode } from 'react';

type StatCardProps = {
  label?: ReactNode;
  title?: ReactNode;
  value: ReactNode;
  icon?: ReactNode;
  tone?: 'yellow' | 'green' | 'blue' | 'red';
  accent?: 'yellow' | 'green' | 'blue' | 'red';
  onClick?: () => void;
};

export function StatCard({ label, title, value, icon, tone = 'yellow', accent, onClick }: StatCardProps) {
  return (
    <button className={`kpm-stat-card tone-${accent || tone}`} type="button" onClick={onClick}>
      <span className="stat-icon">{icon}</span>
      <span>{title || label}</span>
      <strong>{value}</strong>
    </button>
  );
}
