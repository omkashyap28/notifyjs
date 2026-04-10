"use client";

import { CodeBlock, Heading3, Terminal, Code } from "@/components";
import Customizer from "@/components/customizer";
import { useAppStore } from "@/store";

export default function Instructions() {
  const providerCode = useAppStore((state) => state.providerCode);
  const usageCode = useAppStore((state) => state.usageCode);
  const defaultLanguage = useAppStore((state) => state.defaultLanguage);

  return (
    <div className="ma h-auto w-full md:px-10 md:pt-20">
      <div className="flex h-full items-start justify-center gap-5 max-lg:flex-col-reverse">
        <Customizer />

        <div className="h-full w-full lg:w-1/2">
          <section>
            <Heading3 className="mt-0! mb-4!">Install</Heading3>
            <p className="-mb-2 text-sm font-normal tracking-normal text-neutral-700 dark:text-neutral-300">
              Install Package from npm or any package manager.
            </p>
            <Terminal>npm install react-pings</Terminal>
          </section>

          <section>
            <Heading3 className="mt-16 mb-4!">Provide</Heading3>
            <p className="-mb-2 text-sm font-normal tracking-normal text-neutral-700 dark:text-neutral-300">
              Import <Code>PingsToastsProvider</Code> and wrap app in root
              layout.
            </p>
            <CodeBlock
              fileName={
                defaultLanguage === "typescript" ? "main.tsx" : "main.jsx"
              }
            >
              {providerCode}
            </CodeBlock>
          </section>
          <section>
            <Heading3 className="mt-16 mb-4!">Get Toasts</Heading3>
            <p className="-mb-2 text-sm font-normal tracking-normal text-neutral-700 dark:text-neutral-300">
              Import <Code>usePings</Code> hook in component.
            </p>
            <CodeBlock
              fileName={
                defaultLanguage === "typescript" ? "Example.tsx" : "Example.jsx"
              }
            >
              {usageCode}
            </CodeBlock>
          </section>
        </div>
      </div>
    </div>
  );
}
