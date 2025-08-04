import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Modal({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-600 rounded-lg shadow-lg w-full max-w-xl relative"
          initial={{ y: 40, opacity: 0.5, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center">
            <button
              onClick={onClose}
              className="rounded border shadow-sm bg-gray-500 py-2 px-4 absolute top-2 right-3 text-white hover:text-gray-100 text-xl"
            >
              Cerrar
            </button>
            <div className="bg-gray-900 p-8 rounded-md shadow-md backdrop-blur-md">
              {children}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
