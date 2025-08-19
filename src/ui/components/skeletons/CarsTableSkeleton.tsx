export function CarsTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div
      className="w-full border border-gray-800 rounded-xl overflow-hidden"
      role="status"
      aria-live="polite"
    >
      <div className="p-3 border-b border-gray-800">
        <div className="h-6 w-40 animate-pulse bg-gray-700 rounded" />
      </div>
      <ul>
        {Array.from({ length: rows }).map((_, i) => (
          <li
            key={i}
            className="grid grid-cols-4 gap-4 p-3 border-b border-gray-800"
          >
            <div className="h-4 w-24 animate-pulse bg-gray-700 rounded" />
            <div className="h-4 w-32 animate-pulse bg-gray-700 rounded" />
            <div className="h-4 w-20 animate-pulse bg-gray-700 rounded" />
            <div className="h-8 w-16 animate-pulse bg-gray-700 rounded" />
          </li>
        ))}
      </ul>
      <span className="sr-only">Cargando coches…</span>
    </div>
  );
}
export default CarsTableSkeleton;
