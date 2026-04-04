import { Wrapper } from "@/components";
import { Instructions, Hero, Feedback } from "@/ui";

export default function Page() {
  return (
    <>
      <Wrapper>
        <Hero />
        <Instructions />
      </Wrapper>
      <Feedback />
    </>
  );
}
