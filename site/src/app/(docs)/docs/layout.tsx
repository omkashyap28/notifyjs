import { MdxContainer, Sidebar } from "@/components/docs";
import "./markdown.css";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full font-sans max-md:flex-col">
      <Sidebar />
      <MdxContainer>{children}</MdxContainer>
      {/* area for adds */}
      <div className="sticky top-16 right-auto bottom-0 left-0 h-full w-66 overflow-y-auto p-4"></div>
    </div>
  );
}

export default Layout;
