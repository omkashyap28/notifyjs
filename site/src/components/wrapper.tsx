export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="realtive w-full max-w-7xl mx-auto px-4">{children}</div>;
}
