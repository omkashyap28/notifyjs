export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="container mx-auto px-4">{children}</div>;
}
