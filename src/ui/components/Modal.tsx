import { ReactNode, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ children, onClose }: ModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        ref={backdropRef}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-900 rounded-xl shadow-xl w-full max-w-xl relative overflow-hidden p-4"
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-100 hover:text-white text-2xl font-light"
            aria-label="Cerrar"
          >
            &times;
          </button>
          <div className="p-6">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
