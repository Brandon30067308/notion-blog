"use client";

import { emailRegex, flowbiteTheme } from "@/utils";
import Button from "./Button";
import NewsletterSuccess from "./NewsletterSuccess";
import { Toaster, toast } from "sonner";
import { Flowbite, TextInput } from "flowbite-react";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { apiFetch } from "@/utils/api";
import clsx from "clsx";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const emailFieldRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    timeoutRef.current && clearTimeout(timeoutRef.current);

    if (!email?.length) {
      setFieldError(true);
      emailFieldRef.current?.focus();
      return toast.error("Please enter your email");
    }

    if (!email.toLowerCase().match(emailRegex)) {
      setFieldError(true);
      emailFieldRef.current?.focus();
      return toast.error("Please enter a valid email");
    }

    try {
      setLoading(true);

      const res = await apiFetch<any>("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      if (res?.success) {
        setEmail("");
        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        throw new Error(res?.message ?? "An error occurred");
      }
    } catch (err: any) {
      const error = err?.message ?? "An error occurred";
      console.log("error: ", error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Flowbite theme={{ theme: flowbiteTheme }}>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "text-gray-500",
        }}
      />

      <div className="w-full bg-[#F9FAFB] flex flex-col lg:flex-row justify-between items-end gap-6 sm:gap-10 px-6 sm:px-10 py-14 sm:py-16 rounded-[22px] shadow-lg">
        <div className="w-full flex flex-1 lg:flex-1/2 flex-col">
          <h2 className="flex items-center mb-3 text-black font-bold">
            <span className="mr-2">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.2725 7.02875C24.2662 7.02625 24.26 7.0225 24.255 7.02C24.1325 6.95375 23.1462 6.47 21.25 6.3075V5H22.5C23.19 5 23.75 4.44125 23.75 3.75C23.75 3.05875 23.19 2.5 22.5 2.5H20C19.31 2.5 18.75 3.05875 18.75 3.75V6.25H14.8625C16.4875 7.84 17.5 10.0525 17.5 12.5V18.75H15V12.5C15 9.05375 12.1962 6.25 8.75 6.25C5.30375 6.25 2.5 9.05375 2.5 12.5V20C2.5 20.6912 3.06 21.25 3.75 21.25H13.75V26.25C13.75 26.9412 14.31 27.5 15 27.5H17.5C18.19 27.5 18.75 26.9412 18.75 26.25V21.25H26.25C26.9412 21.25 27.5 20.69 27.5 20V12.5C27.5 10.2263 26.2638 8.12875 24.2725 7.02875ZM10 17.5H7.5C6.81 17.5 6.25 16.9412 6.25 16.25C6.25 15.5588 6.81 15 7.5 15H10C10.69 15 11.25 15.5588 11.25 16.25C11.25 16.9412 10.69 17.5 10 17.5Z"
                  fill="#1F2A37"
                />
              </svg>
            </span>
            Join our Newsletter
          </h2>
          <p className="text-base text-gray-500">
            Subscribe for exclusive insights and inspiring stories, delivered
            from our inbox to yours <span className="grayscale-[1]">❤️</span>
          </p>
        </div>

        <div className="w-full flex flex-1 lg:flex-1/2 flex-col">
          <form
            onSubmit={handleSubmit}
            className="w-full flex items-center h-[45px]"
          >
            <TextInput
              ref={emailFieldRef}
              placeholder="Enter your email"
              value={email}
              className={clsx(
                "h-full [&_input]:h-full [&_input]:px-4 w-full [&_div]:h-full mr-2 sm:mr-4",
                {
                  "[&_input]:!border-red-500 [&_input:focus]:!border-red-500":
                    fieldError,
                }
              )}
              onChange={(e) => {
                setEmail(e.target.value);
                fieldError && setFieldError(false);
              }}
            />
            <Button
              type="submit"
              className="h-full min-w-fit"
              color="secondary"
              disabled={loading || success}
            >
              {success ? "Subscribed!" : "Subscribe"}
            </Button>
          </form>
          <Link
            href="#"
            target="_blank"
            className="w-fit block mt-3 italic text-sm text-gray-500 hover:underline transition-all"
          >
            Link to privacy policy
          </Link>
        </div>
      </div>

      <NewsletterSuccess hidden={!success} />
    </Flowbite>
  );
}
