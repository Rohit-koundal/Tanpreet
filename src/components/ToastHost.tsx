type ToastHostProps = {
  message: string | null;
};

export function ToastHost({ message }: ToastHostProps) {
  if (!message) return null;
  return <div className="toast-host" role="status" aria-live="polite">{message}</div>;
}
