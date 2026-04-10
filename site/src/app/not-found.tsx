"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="bg-background grid h-auto place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 flex items-center text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-neutral-200">
          404 Page not found
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-7 text-neutral-500">
          Sorry, we couldn’t find the page you’re looking for. It might have
          been moved or deleted.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-4">
          <button
            onClick={() => router.back()}
            className="text-background rounded-md bg-neutral-900 px-4 py-1.5 transition duration-150 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200"
          >
            Go Back
          </button>
          <Link
            href="/"
            className="rounded-md bg-transparent p-3 py-1.5 ring-1 ring-transparent transition duration-150 hover:ring-neutral-900 hover:dark:ring-neutral-100"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
