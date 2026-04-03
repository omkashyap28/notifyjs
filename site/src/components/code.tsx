export default function Code({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <code
      className={`rounded bg-neutral-200 px-1 text-neutral-500 dark:bg-neutral-900 ${className}`}
    >
      {children}
    </code>
  );
}
