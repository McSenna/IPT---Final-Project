export function SystemHealthCard({ status = 'LIVE', issues = [], lastScan }) {
  const statusColor =
    status === 'ERROR'
      ? 'bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-300'
      : status === 'WARNING'
        ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300'
        : 'bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-300'

  const statusLabel =
    status === 'ERROR' ? 'ERROR' : status === 'WARNING' ? 'WARNING' : 'LIVE'

  const statusDotColor =
    status === 'ERROR'
      ? 'bg-red-500'
      : status === 'WARNING'
        ? 'bg-amber-500'
        : 'bg-green-500'

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            System Health
          </p>
          <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-300">
            Self-diagnosis &amp; optimization
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColor}`}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className={`absolute h-full w-full animate-ping rounded-full opacity-75 ${statusDotColor}`} />
              <span className={`relative h-1.5 w-1.5 rounded-full ${statusDotColor}`} />
            </span>
            {statusLabel}
          </div>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
            {lastScan ? `Scanned ${lastScan}` : 'Active'}
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-1.5 text-[11px] text-zinc-600 dark:text-zinc-300">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500 dark:text-zinc-400">Model alignment</span>
          <span className="text-green-600 dark:text-green-400">On-chain only</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-500 dark:text-zinc-400">API &amp; routes</span>
          <span className="text-green-600 dark:text-green-400">Stable</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-500 dark:text-zinc-400">Latency</span>
          <span className="text-zinc-700 dark:text-zinc-300">Optimized</span>
        </div>
      </div>

      {issues?.length ? (
        <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-2 dark:border-amber-800 dark:bg-amber-900/20">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Active Incidents
          </p>
          <ul className="space-y-1 text-[11px] text-amber-900 dark:text-amber-200">
            {issues.map((issue) => (
              <li key={issue.id} className="flex items-start justify-between gap-2">
                <span>{issue.label}</span>
                <span className="text-[10px]">{issue.status}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}


