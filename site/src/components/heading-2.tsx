export default function Heading2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-3xl font-semibold tracking-tight mt-30 mb-20 text-center ${className ? className : null}`}
    >
      {children}
    </h2>
  );
}
