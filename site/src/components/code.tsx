export default function Code({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <code
      className={`rounded bg-neutral-200 px-1 text-neutral-700 dark:text-neutral-300 tracking-tight dark:bg-neutral-900 ${className}`}
    >
      {children}
    </code>
  );
}
