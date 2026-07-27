function ProgressBar({ value, className = "" }) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>

      <span className="w-9 shrink-0 text-right text-xs tabular-nums text-text-secondary">
        {clamped}%
      </span>
    </div>
  );
}

export default ProgressBar;