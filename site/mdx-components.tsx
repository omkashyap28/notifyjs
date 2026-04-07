import { MdxCodeBlock } from "@/components/docs";
// Allows customizing built-in components, e.g. to add styling.
const components = {
  pre: MdxCodeBlock,
};

export function useMDXComponents() {
  return components;
}
