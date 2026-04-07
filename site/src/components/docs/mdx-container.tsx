import BreadCrumps from "./breadcrumps";
import MdxFooter from "./mdx-footer";

export default function MdxContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 p-5 sm:px-8 md:px-18 md:py-13">
      <BreadCrumps />
      <main className="markdown-body">{children}</main>
      <MdxFooter />
    </div>
  );
}
