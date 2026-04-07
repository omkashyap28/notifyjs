import { Code } from "bright";

export default async function MdxCodeBlock ({children}: {children: React.ReactNode}) {
  return <div className="relative">
    
    <Code>
      {children}
    </Code>
  </div>
}