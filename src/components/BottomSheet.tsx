import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type BottomSheetProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
};

export function BottomSheet({ open, title, subtitle, onClose, children, wide }: BottomSheetProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return createPortal(
    <div className="sheet-backdrop" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
      <div className={`sheet-panel ${wide ? "sheet-wide" : ""}`}>
        <button className="icon-button sheet-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <p className="eyebrow">For Tanpreet</p>
        <h3 id="sheet-title">{title}</h3>
        {subtitle ? <p className="subtitle sheet-subtitle">{subtitle}</p> : null}
        <div className="sheet-body">{children}</div>
      </div>
    </div>,
    document.body
  );
}
