import Footer from "@/ui/components/Footer";
import { Toaster } from "react-hot-toast";
import React from "react";
import { useCarStore } from "@/state/useCarStore";
import { ConfirmDialog } from "@/ui/components/ConfirmDialog";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen justify-between bg-gray-900 min-h-screen text-white">
      <Toaster position="top-right" />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function GlobalConfirmDialog() {
  const { confirmDialog, hideConfirmDialog } = useCarStore();

  if (!confirmDialog.visible) return null;

  return (
    <ConfirmDialog
      message={confirmDialog.message}
      onConfirm={() => {
        confirmDialog.onConfirm();
        hideConfirmDialog();
      }}
      onCancel={() => {
        confirmDialog.onCancel();
        hideConfirmDialog();
      }}
    />
  );
}
