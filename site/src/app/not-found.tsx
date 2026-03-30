"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div>
        <h1 className="font-sans text-3xl font-semibold tracking-tight text-neutral-500">
          404 | Not found
        </h1>
        <p className="text-lg font-normal text-neutral-500">
          Page you are trying to access is not founded or available. Please go
          back.
        </p>
        <Link href="/">Go Back</Link>
      </div>
    </div>
  );
}
