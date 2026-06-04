import type { ReactNode } from 'react';

export function PageScaffold({ title, description, subtitle, extra, children }: { title: string; description?: string; subtitle?: string; extra?: ReactNode; children: ReactNode }) {
  return (
    <section className="kpm-page">
      <header className="kpm-page-header">
        <div>
          <h1>{title}</h1>
          {(description || subtitle) && <p>{description || subtitle}</p>}
        </div>
        {extra && <div className="kpm-page-extra">{extra}</div>}
      </header>
      {children}
    </section>
  );
}
