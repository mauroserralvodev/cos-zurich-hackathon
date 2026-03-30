"use client";

import { useEffect, useRef, useState } from "react";
import { KeyRound } from "lucide-react";
import Image from "next/image";

type AccessCodeModalProps = {
  open: boolean;
};

const CODE_LENGTH = 4;

export default function AccessCodeModal({ open }: AccessCodeModalProps) {
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (open) {
      inputsRef.current[0]?.focus();
    }
  }, [open]);

  if (!open) return null;

  const code = digits.join("");

  const updateDigit = (index: number, value: string) => {
    const cleanValue = value.replace(/\D/g, "").slice(-1);

    const nextDigits = [...digits];
    nextDigits[index] = cleanValue;
    setDigits(nextDigits);
    setError("");

    if (cleanValue && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const nextDigits = [...digits];
        nextDigits[index] = "";
        setDigits(nextDigits);
        return;
      }

      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH);

    if (!pasted) return;

    const nextDigits = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((digit, index) => {
      nextDigits[index] = digit;
    });

    setDigits(nextDigits);
    setError("");

    const nextIndex =
      pasted.length >= CODE_LENGTH ? CODE_LENGTH - 1 : pasted.length;
    inputsRef.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== CODE_LENGTH) {
      setError("Please enter the 4-digit code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/demo-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        setError("Invalid code.");
        setLoading(false);
        return;
      }

      window.location.href = "/dash";
    } catch {
      setError("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="w-[min(520px,92vw)]">
        <div className="px-6 py-6 sm:px-7 sm:py-7">
            <div className="relative h-14 mb-10 overflow-hidden w-full">
                <Image
                    src="/cos-logo.png"
                    alt="COS logo"
                    fill
                    className="object-contain"
                />
            </div>
          <div className="flex items-start gap-4">
            <div className="min-w-0">

            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="flex items-center justify-center gap-3">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => updateDigit(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="h-14 w-12 rounded-2xl border border-black/10 bg-white text-center text-lg font-medium text-black outline-none transition focus:border-black/20 focus:bg-neutral-50"
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>

            <div className="mt-4 min-h-5 text-center">
              {error ? (
                <p className="text-sm text-[#FF5500]">{error}</p>
              ) : (
                <p className="text-xs text-neutral-400">
                  
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 w-full cursor-pointer rounded-2xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Checking..." : "Continue to demo"}
            </button>
            <p className="pt-5 text-xs leading-5 text-neutral-400">
            To avoid unnecessary usage limits on third-party services, this demo is
            currently protected with a small access code. If you are part of the event
            team and need access, feel free to email{" "}
            <a
                href="mailto:mauro@brinpage.com"
                className="text-neutral-500 underline underline-offset-2 hover:text-neutral-700"
            >
                mauro@brinpage.com
            </a>{" "}
            and I’ll send it right away.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}