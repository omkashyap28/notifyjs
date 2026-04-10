import { ContentsTable, MdxContainer, Sidebar } from "@/components/docs";
import "./markdown.css";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full font-sans max-md:flex-col">
      <Sidebar />
      <MdxContainer>{children}</MdxContainer>
    </div>
  );
}

export default Layout;
