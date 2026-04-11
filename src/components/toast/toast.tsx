import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { cn } from "../../utils/cn";
import { toastIconColors, toastVariants } from "./toast.variants";

interface ToastData {
  id: string;
  title: string;
  description?: string;
  duration?: number;
  variant?: "info" | "success" | "warning" | "error" | null;
}

interface ToastContextValue {
  toast: (data: Omit<ToastData, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const toast = useCallback((data: Omit<ToastData, "id">) => {
    const id = String(++toastId);
    setToasts((prev) => [...prev, { ...data, id }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="bloom fixed bottom-[var(--space-xl)] right-[var(--space-xl)] z-[100] flex flex-col gap-[var(--space-md)]">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const variantIcons: Record<string, ReactNode> = {
  success: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-labelledby="toast-success-title">
      <title id="toast-success-title">Success</title>
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.5 10.5L8.5 12.5L13.5 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-labelledby="toast-error-title">
      <title id="toast-error-title">Error</title>
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-labelledby="toast-warning-title">
      <title id="toast-warning-title">Warning</title>
      <path d="M10 3L18 17H2L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 8.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14.5" r="0.75" fill="currentColor" />
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-labelledby="toast-info-title">
      <title id="toast-info-title">Information</title>
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="6.5" r="0.75" fill="currentColor" />
    </svg>
  ),
};

function ToastItem({ toast: t, onDismiss }: { toast: ToastData; onDismiss: (id: string) => void }) {
  const duration = t.duration ?? 4000;
  const variant = t.variant ?? "info";

  useEffect(() => {
    const timer = setTimeout(() => onDismiss(t.id), duration);
    return () => clearTimeout(timer);
  }, [t.id, duration, onDismiss]);

  return (
    <div className={cn(toastVariants({ variant: t.variant }))}>
      <div className={cn("shrink-0 mt-[1px]", toastIconColors[variant])}>{variantIcons[variant]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-[length:var(--bloom-text-body)] font-medium color-[var(--bloom-text)]">{t.title}</p>
        {t.description && (
          <p className="text-[length:var(--bloom-text-caption)] color-[var(--bloom-text-secondary)] mt-[var(--space-xs)]">
            {t.description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(t.id)}
        className="color-[var(--bloom-text-secondary)] hover:color-[var(--bloom-text)] transition-colors shrink-0 rounded-full h-[28px] w-[28px] inline-flex items-center justify-center hover:bg-[var(--bloom-surface2)]"
        aria-label="Dismiss"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
