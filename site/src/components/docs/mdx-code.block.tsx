"use server";

import { Code } from "bright";
import CopyButton from "../copy-button";
import { isValidElement } from "react";

export default async function MdxCodeBlock({
  children,
}: {
  children: React.ReactNode;
}) {
  const codeString = isValidElement(children)
    ? String(children.props.children)
    : "";

  return (
    <div className="relative my-2">
      <CopyButton code={codeString} className="abolute" />
      <Code
        theme={{
          light: "github-light",
          dark: "dracula",
          lightSelector: "html.light",
        }}
      >
        {children}
      </Code>
    </div>
  );
}
