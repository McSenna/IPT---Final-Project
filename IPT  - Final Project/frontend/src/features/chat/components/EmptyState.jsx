export function EmptyState({ onPromptSelect }) {
  const suggestedPrompts = [
    {
      title: 'Security Scan',
      description: 'Audit a Solidity or Move contract for reentrancy and privilege escalation issues.',
      prompt: 'Audit this contract for security vulnerabilities:',
    },
    {
      title: 'Transaction Forensics',
      description: 'Decode a transaction, simulate execution, and break down gas behavior step by step.',
      prompt: 'Analyze this transaction and explain its gas usage:',
    },
    {
      title: 'Protocol Design',
      description: 'Co-design on-chain data flows and state layouts optimised for gas and composability.',
      prompt: 'Help me design a gas-efficient protocol for:',
    },
  ]

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-3 text-center">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            How can I help you today?
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Mental Block is a focused AI built exclusively for blockchain developers, Web3 engineers,
            and crypto researchers—no off-topic reasoning, only deep protocol insight.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {suggestedPrompts.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onPromptSelect?.(item.prompt)}
              className="group rounded-lg border border-zinc-200 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

