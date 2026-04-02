export default function TerminalSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-sm border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900">
      <div className="space-y-3 p-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-3 w-full animate-pulse rounded bg-neutral-500/20"
            style={{
              width: `${90 - i * 8}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
