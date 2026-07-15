"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, PartyPopper, ChevronDown, AlertCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";
import {
  waitlistSchema,
  NIGERIAN_STATES,
  type WaitlistFormValues,
} from "@/validations/waitlist";

type SubmitState = "idle" | "success" | "error";

export function WaitlistForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      state: undefined,
      occupation: "",
      consent: false,
    },
  });

  const onSubmit = async (values: WaitlistFormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setServerError(json.message ?? "Something went wrong. Please try again.");
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      reset();
    } catch {
      setServerError("Network error. Check your connection and try again.");
      setSubmitState("error");
    }
  };

  return (
    <section id="waitlist-form" className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-xl">
          <FadeIn className="text-center">
            <h2 className="font-display text-balance text-3xl font-semibold tracking-tight text-midnight-900 sm:text-4xl">
              Reserve Your Spot
            </h2>
            <p className="mt-4 text-base leading-relaxed text-midnight-900/60">
              Secure your place before enrollment opens. It takes less than a
              minute.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-10">
            <div className="relative rounded-2xl border border-midnight-900/[0.07] bg-white p-6 shadow-premium-lg sm:p-9">
              <AnimatePresence mode="wait">
                {submitState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center py-8 text-center"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-royal-500/10">
                      <PartyPopper className="h-7 w-7 text-royal-500" strokeWidth={2} />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-midnight-900">
                      You&rsquo;re officially on the waitlist!
                    </h3>
                    <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-midnight-900/60">
                      We&rsquo;ve received your details. We&rsquo;ll contact you
                      as soon as registration officially opens. Thank you for
                      choosing M-CEL TECH.
                    </p>
                    <button
                      onClick={() => setSubmitState("idle")}
                      className="mt-6 text-sm font-medium text-royal-500 hover:text-royal-600"
                    >
                      Submit another response
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-5"
                  >
                    <Field
                      label="Full Name"
                      required
                      htmlFor="fullName"
                      error={errors.fullName?.message}
                    >
                      <input
                        id="fullName"
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Okafor"
                        {...register("fullName")}
                        className={inputClasses(!!errors.fullName)}
                      />
                    </Field>

                    <Field
                      label="Email Address"
                      required
                      htmlFor="email"
                      error={errors.email?.message}
                    >
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="jane@example.com"
                        {...register("email")}
                        className={inputClasses(!!errors.email)}
                      />
                    </Field>

                    <Field
                      label="Phone Number"
                      required
                      htmlFor="phone"
                      error={errors.phone?.message}
                    >
                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="080 1234 5678"
                        {...register("phone")}
                        className={inputClasses(!!errors.phone)}
                      />
                    </Field>

                    <Field
                      label="State"
                      required
                      htmlFor="state"
                      error={errors.state?.message}
                    >
                      <div className="relative">
                        <select
                          id="state"
                          defaultValue=""
                          {...register("state")}
                          className={cn(
                            inputClasses(!!errors.state),
                            "appearance-none pr-10"
                          )}
                        >
                          <option value="" disabled>
                            Select your state
                          </option>
                          {NIGERIAN_STATES.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-midnight-900/40" />
                      </div>
                    </Field>

                    <Field
                      label="Occupation"
                      htmlFor="occupation"
                      error={errors.occupation?.message}
                    >
                      <input
                        id="occupation"
                        type="text"
                        autoComplete="organization-title"
                        placeholder="Product Designer (optional)"
                        {...register("occupation")}
                        className={inputClasses(!!errors.occupation)}
                      />
                    </Field>

                    <label
                      htmlFor="consent"
                      className="flex cursor-pointer items-start gap-3 pt-1"
                    >
                      <input
                        id="consent"
                        type="checkbox"
                        {...register("consent")}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-midnight-900/20 text-royal-500 focus:ring-royal-500/40"
                      />
                      <span className="text-[13.5px] leading-relaxed text-midnight-900/60">
                        I agree to receive updates from M-CEL TECH.
                      </span>
                    </label>

                    {submitState === "error" && serverError && (
                      <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-[13.5px] text-red-700">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{serverError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-royal-500 px-6 py-3.5 text-[15px] font-medium text-white shadow-glow transition-all hover:bg-royal-600 hover:shadow-premium-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Join Waitlist"
                      )}
                    </button>

                    <p className="text-center text-xs text-midnight-900/40">
                      Your information is kept private and used only for
                      bootcamp updates.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-[13.5px] font-medium text-midnight-900/80"
      >
        {label} {required && <span className="text-royal-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}

function inputClasses(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-midnight-50/40 px-4 py-3 text-[15px] text-midnight-900 outline-none transition-all placeholder:text-midnight-900/35",
    "focus:border-royal-500 focus:bg-white focus:ring-4 focus:ring-royal-500/10",
    hasError
      ? "border-red-300 bg-red-50/40"
      : "border-midnight-900/10 hover:border-midnight-900/20"
  );
}
