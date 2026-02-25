import { useEffect, useState } from "react";

type Toast = { id: number; message: string };

export default function ToastHost() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ message: string }>).detail;
      if (!detail?.message) return;
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message: detail.message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 2800);
    };
    window.addEventListener("bt-toast", handler as EventListener);
    return () => window.removeEventListener("bt-toast", handler as EventListener);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-host">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          {toast.message}
        </div>
      ))}
    </div>
  );
}
