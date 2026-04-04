"use client";

import { Wrapper } from "@/components";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="h-34 w-full py-6">
      <Wrapper>
        <div className="flex items-start justify-between">
          <Link href="/" className="text-2xl font-semibold" title="Logo">
            ReactPings
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="https://www.instagram.com/omkashyap7484"
                title="Instagram"
              >
                <InstagramIcon size={25} shadow={0} strokeWidth={1.5} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/hari-om-kashyap-b176b63a5"
                title="Linkedin"
              >
                <LinkedinIcon size={25} shadow={0} strokeWidth={1.5} />
              </Link>
              <Link href="https://github.com/omkashyap28" title="Github">
                <GithubIcon size={25} shadow={0} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-3 pb-0">
          <div className="flex justify-center gap-3 text-[12px] tracking-tight text-neutral-500">
            <Link
              href="https://www.github.com/omkashyap28/react-pings"
              className="underline"
            >
              Contribute to project
            </Link>
            <Link href="#" className="underline">
              Report a issue
            </Link>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
}
