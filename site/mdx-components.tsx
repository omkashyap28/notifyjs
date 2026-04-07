import { Code } from "bright";

// Allows customizing built-in components, e.g. to add styling.
const components = {
  pre: Code,
};

export function useMDXComponents() {
  return components;
}
