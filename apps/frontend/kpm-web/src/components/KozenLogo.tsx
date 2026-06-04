export function KozenLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="kozen-react-logo" aria-label="KOZEN">
      <svg viewBox="0 0 72 72" role="img">
        <defs>
          <linearGradient id="kpmLogoGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#FFE900" />
            <stop offset="0.55" stopColor="#B7FF38" />
            <stop offset="1" stopColor="#1FD7C7" />
          </linearGradient>
        </defs>
        <rect x="6" y="6" width="60" height="60" rx="18" fill="url(#kpmLogoGradient)" />
        <path d="M23 20h9v17l16-17h11L41 39l19 13H47L32 41v11h-9V20z" fill="#101828" />
      </svg>
      {!compact && <span>KPM</span>}
    </div>
  );
}
