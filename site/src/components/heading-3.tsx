export default function Heading3({
  children,
}: {
  children: React.ReactNode;
}) {
  return <h3 className="text-xl mt-10 font-semibold tracking-normal">{children}</h3>;
}
