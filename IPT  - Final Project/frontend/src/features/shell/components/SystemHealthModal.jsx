import { Activity, AlertCircle, CheckCircle2 } from 'lucide-react'
import { ModalBase } from './ModalBase'

export function SystemHealthModal({ open, onClose, status = 'LIVE', issues = [], lastScan }) {
  return (
    <ModalBase open={open} title="System Health" onClose={onClose}>
      <div className="space-y-4 animate-in fade-in">
        {/* Status Overview */}
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                System Status
              </span>
            </div>
            <div
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                status === 'ERROR'
                  ? 'bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-300'
                  : status === 'WARNING'
                    ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300'
                    : 'bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-300'
              }`}
            >
              <span
                className={`relative flex h-2 w-2 ${
                  status === 'ERROR'
                    ? 'bg-red-500'
                    : status === 'WARNING'
                      ? 'bg-amber-500'
                      : 'bg-green-500'
                }`}
              >
                <span
                  className={`absolute h-full w-full animate-ping rounded-full opacity-75 ${
                    status === 'ERROR'
                      ? 'bg-red-500'
                      : status === 'WARNING'
                        ? 'bg-amber-500'
                        : 'bg-green-500'
                  }`}
                />
                <span
                  className={`relative h-2 w-2 rounded-full ${
                    status === 'ERROR'
                      ? 'bg-red-500'
                      : status === 'WARNING'
                        ? 'bg-amber-500'
                      : 'bg-green-500'
                  }`}
                />
              </span>
              {status === 'ERROR' ? 'ERROR' : status === 'WARNING' ? 'WARNING' : 'LIVE'}
            </div>
          </div>
          {lastScan && (
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              Last scanned: {lastScan}
            </p>
          )}
        </div>

        {/* Key Metrics */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Key Metrics
          </h3>
          <div className="space-y-2 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Model alignment</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  On-chain only
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">API & routes</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  Stable
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Latency</span>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Optimized
              </span>
            </div>
          </div>
        </div>

        {/* Active Incidents */}
        {issues?.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Active Incidents
            </h3>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-900/20">
              {issues.map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-start justify-between gap-2 py-1.5 first:pt-0 last:pb-0"
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <span className="text-sm text-amber-900 dark:text-amber-200">
                      {issue.label}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                    {issue.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance Indicators */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Performance
          </h3>
          <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Uptime</p>
                <p className="mt-0.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  99.9%
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Response Time</p>
                <p className="mt-0.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  &lt;100ms
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalBase>
  )
}

