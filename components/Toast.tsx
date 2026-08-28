"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

type ToastProps = {
  message: string;
  onClose: () => void;
  duration?: number;
};

export default function Toast({ message, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [onClose, duration]);

  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 top-6 z-30 flex justify-center px-4">
      <div
        role="alert"
        className="pointer-events-auto max-w-sm rounded-md border border-[var(--error)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--error)]"
      >
        {message}
      </div>
    </div>,
    document.body,
  );
}
