export function FormSkeleton() {
  return (
    <div className="space-y-4" role="status" aria-live="polite">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
          <div className="h-10 w-full bg-gray-700 rounded animate-pulse" />
        </div>
      ))}
      <div className="flex gap-3">
        <div className="h-10 w-28 bg-gray-700 rounded animate-pulse" />
        <div className="h-10 w-28 bg-gray-700 rounded animate-pulse" />
      </div>
      <span className="sr-only">Cargando formulario…</span>
    </div>
  );
}
