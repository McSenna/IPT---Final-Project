import { ModalBase } from './ModalBase'

export function PrivacyModal({ open, onClose }) {
  return (
    <ModalBase open={open} onClose={onClose} title="Privacy Policy">
      <p>
        Prompt Studio stores your chat history in your browser&apos;s localStorage so you can return
        to previous conversations. This data never leaves your device unless you explicitly export
        or share it.
      </p>
      <p>
        You can clear your browser storage at any time to remove past sessions. Future versions may
        offer optional cloud sync, but this prototype is designed to work fully locally.
      </p>
      <p>
        Please treat this environment as a sandbox and avoid inputting passwords, API keys, or
        personally identifiable information.
      </p>
    </ModalBase>
  )
}


