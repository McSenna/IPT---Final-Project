import { ModalBase } from './ModalBase'

export function TermsModal({ open, onClose }) {
  return (
    <ModalBase open={open} onClose={onClose} title="Terms of Use">
      <p>
        This interface is provided as-is for experimentation and learning. Do not rely on it for
        legal, medical, financial, or safety-critical decisions.
      </p>
      <p>
        By using this prototype, you agree that any content you type may be stored locally in your
        browser for the purpose of preserving your conversation history.
      </p>
      <p>
        You are responsible for the prompts and outputs you generate. Please avoid entering
        sensitive or personal data.
      </p>
    </ModalBase>
  )
}


