import React, { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const SIZE_MAP = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({ isOpen, onClose, title, children, footer, size = "md" }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(6px)", backgroundColor: "rgba(15,23,42,0.4)" }}
    >
      <div
        className={`w-full ${SIZE_MAP[size]} max-h-[90vh] flex flex-col`}
        style={{
          background: "rgba(255, 255, 255, 0.55)",
          backdropFilter: "blur(20px) saturate(160%)",
          border: "1px solid rgba(255, 255, 255, 0.7)",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(100, 116, 139, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{
            background: "rgba(248,249,251,0.8)",
            borderBottom: "1px solid rgba(226,232,240,0.6)",
            borderRadius: "16px 16px 0 0",
          }}
        >
          <h2 className="text-[#0F172A] font-semibold text-base" style={{ fontWeight: 700 }}>{title}</h2>
          <button
            onClick={onClose}
            className="text-[#64748B] hover:text-[#0F172A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div
            className="flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0"
            style={{ borderTop: "1px solid rgba(226,232,240,0.6)" }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
