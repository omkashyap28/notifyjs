"use client";

import { Heading2, Wrapper } from "@/components";
import { ShareOutlineIcon } from "@/icons";
import { usePings } from "react-pings";
import { SubmitEvent, useState } from "react";

interface FormTypes {
  email: string;
  message: string;
}

export default function Feedback() {
  const ping = usePings();
  const [formValues, setFormValues] = useState<FormTypes>({
    email: "",
    message: "",
  });

  const submitForm = (e: SubmitEvent) => {
    e.preventDefault();
    if (formValues.email === "") {
      ping.error("Email required");
      return;
    }
    if (formValues.message === "") {
      ping.error("Message required");
      return;
    }
    ping.success("Shared sucessfully");
    setFormValues({
      email: "",
      message: "",
    });
  };

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_bottom,rgba(50,50,50,0.1),transparent_60%)] py-10 sm:py-20 md:py-30 dark:bg-[radial-gradient(circle_at_bottom,rgba(200,200,200,0.1),transparent_60%)]">
      <Wrapper>
        <div className="relative z-10 mx-auto max-w-2xl rounded py-10 md:px-20">
          <Heading2 className="my-0!">
            Have a suggestions, share with us
          </Heading2>
          <form onSubmit={submitForm} className="flex flex-col gap-5 py-8">
            <input
              type="email"
              className="rounded border border-neutral-500/20 bg-neutral-200/10 px-4 py-3 text-[16px] font-medium text-neutral-900 shadow ring-0 shadow-neutral-300/40 ring-transparent backdrop-blur-sm transition duration-200 outline-none placeholder:text-neutral-500/80 focus:ring-2 focus:ring-neutral-900/30 dark:bg-neutral-500/10 dark:text-neutral-50 dark:shadow-neutral-800/40 dark:focus:ring-neutral-100/30"
              placeholder="Enter your email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
            <textarea
              className="h-40 resize-none rounded border border-neutral-500/20 bg-neutral-200/10 px-4 py-3 text-[16px] font-medium text-neutral-900 shadow ring-0 shadow-neutral-300/40 ring-transparent backdrop-blur-sm transition duration-200 outline-none placeholder:text-neutral-500/80 focus:ring-2 focus:ring-neutral-900/30 dark:bg-neutral-500/10 dark:text-neutral-50 dark:shadow-neutral-800/40 dark:focus:ring-neutral-100/30"
              placeholder="Enter your suggestion here"
              value={formValues.message}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  message: e.target.value,
                }))
              }
            ></textarea>
            <button className="bg-foreground text-background mt-4 flex items-center justify-center gap-1 rounded py-2 text-lg shadow shadow-neutral-300/40 transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed! disabled:bg-neutral-800 dark:shadow-neutral-800/40 dark:hover:bg-neutral-300 dark:disabled:bg-neutral-400">
              <ShareOutlineIcon size={18} />
              Share
            </button>
          </form>
        </div>
      </Wrapper>
    </div>
  );
}
