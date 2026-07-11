import { ReactNode, useEffect } from "react";

type ModalProps = {
  children: ReactNode;
  label: string;
  onClose: () => void;
};

export function Modal({ children, label, onClose }: ModalProps) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={label}>
      <div className="modal-panel">
        <button className="icon-button close-button" onClick={onClose} aria-label="Close dialog">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
