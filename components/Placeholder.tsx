/**
 * Marks content the client still has to confirm or provide.
 * Visible only in development; renders nothing in production builds so no
 * "[CLIENT TO CONFIRM]" text ever reaches visitors.
 */
export function Placeholder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div
      className={`rounded-input border-2 border-dashed border-amber-500 bg-amber-50 px-4 py-3 text-[14px] font-medium text-amber-900 ${className}`}
      role="note"
    >
      <span className="font-bold">Client to confirm:</span> {children}
    </div>
  );
}
