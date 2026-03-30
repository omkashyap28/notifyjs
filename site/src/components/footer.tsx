"use client";
import { motion, inView } from "motion/react";
import { Wrapper } from "@/components";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="h-34 w-full py-6">
      <Wrapper>
        <div className="flex items-start justify-between">
          <Link href="/" className="text-2xl font-semibold">
            ReactPings
          </Link>
          <div>
            <div className="flex items-center gap-4">
              <Link href="">
                <InstagramIcon size={20} strokeWidth={1} color="#737373" />
              </Link>
              <Link href="">
                <LinkedinIcon size={20} strokeWidth={1} color="#737373" />
              </Link>
              <Link href="">
                <GithubIcon size={20} strokeWidth={1} color="#737373" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="text-center text-sm text-neutral-500">
            Open source projects
          </div>
        </div>
      </Wrapper>
    </footer>
  );
}
