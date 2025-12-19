import { ModalBase } from './ModalBase'

const team = [
  {
    name: 'Justin Valladolid',
    role: 'Product Design',
    description: 'Curates the calm, focused feel of the prompt-driven workspace.',
  },
  {
    name: 'Ian James Villanueva',
    role: 'Engineering',
    description: 'Builds the conversational engine and UX patterns.',
  },
  {
    name: 'Leizel Villa',
    role: 'Research',
    description: 'Explores better ways to align UI with natural language intent.',
  },
  {
    name: 'Tristan Raven Seblario',
    role: 'Research',
    description: 'Explores better ways to align UI with natural language intent.',
  },
]

export function AboutModal({ open, onClose }) {
  return (
    <ModalBase open={open} onClose={onClose} title="About Mental Block">
      <section className="space-y-1.5">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Mission &amp; Vision
        </h3>
        <p>
          Mental Block is a ChatGPT-inspired interface with a single powerful input. The
          goal is to keep the canvas free of clutter so you can brainstorm, edit, and refine
          without seeing sound.
        </p>
        <p>
          We believe that natural language is a design tool. By centering the experience around a
          calm conversational loop, the UI adapts to what you say, not the other way around.
        </p>
      </section>

      <section className="space-y-2 pt-1.5">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Team
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {team.map((member) => (
            <article
              key={member.name}
              className="flex gap-3 rounded-lg border border-zinc-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold uppercase text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
                {member.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div className="flex flex-col gap-1">
                <div>
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">{member.name}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{member.role}</div>
                </div>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {member.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
        This prototype is for educational and exploration purposes only and is not an official
        OpenAI product.
      </section>
    </ModalBase>
  )
}