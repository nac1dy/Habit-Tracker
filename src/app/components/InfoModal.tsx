type InfoModalProps = {
  title: string;
  message: string;
  onClose: () => void;
};

// Small popup used to show a single info/error message, with an "OK" button to close it.
// Pulled out into its own file so it can be reused by any form (login, create habit, ...)
// without copy-pasting the same markup everywhere.
export default function InfoModal({ title, message, onClose }: InfoModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-md bg-white border border-[var(--text)] p-6"
        style={{ borderRadius: 'var(--radius-lg)' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-modal-title"
        aria-describedby="info-modal-message"
      >
        <h2 id="info-modal-title" className="text-lg font-bold text-[var(--text)]">
          {title}
        </h2>
        <p id="info-modal-message" className="mt-2 text-[var(--text-2)]">
          {message}
        </p>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm font-semibold bg-[var(--teal-500)] text-white transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
