import { on } from "events";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ConfirmDialogProps {
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  title = "Confirmar acción",
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-900 rounded shadow-sm w-full max-w-sm p-6 space-y-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-lg text-gray-200 font-semibold">{title}</h2>
          <p className="text-gray-100">{message}</p>
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-secondary text-brand rounded hover:bg-sec_hover transition-colors duration-200 text-sm font-semibold shadow-md hover:text-white"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Confirmar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
