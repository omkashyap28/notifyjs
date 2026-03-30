import { Sidebar } from "@/components/docs";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full font-sans">
      <Sidebar />
      <main className="flex-1 px-18 py-8">{children}</main>

      {/* area for adds */}
      {/* <div className="sticky top-16 right-auto bottom-0 left-0 h-full w-66 overflow-y-auto p-4">
      </div> */}
    </div>
  );
}

export default Layout;
