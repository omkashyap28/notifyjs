export default function Heading2({
  children,
}: {
  children: React.ReactNode;
}) {
  return <h2 className="text-2xl font-semibold tracking-tight">{children}</h2>;
}
