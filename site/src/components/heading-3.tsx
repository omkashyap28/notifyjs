export default function Heading3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`mt-10 mb-6 text-xl font-semibold tracking-normal ${className ? className : null}`}
    >
      {children}
    </h3>
  );
}
