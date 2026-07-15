"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Video,
  Code2,
  Workflow,
  ClipboardList,
  ArrowRight,
  Users2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

const modules = [
  { label: "Prompt Engineering", icon: Sparkles },
  { label: "Cinematic AI Video Generation", icon: Video },
  { label: "Vibe Coding", icon: Code2 },
  { label: "AI Automation", icon: Workflow },
  { label: "Project Management", icon: ClipboardList },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const scrollToForm = () => {
    document.getElementById("waitlist-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_10%,transparent_75%)]" />

      <Container className="relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/70 shadow-premium backdrop-blur-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </span>
            Waitlist now open &mdash; hybrid cohort
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            AI Productivity &amp; Digital
            <br className="hidden sm:block" /> Innovation Bootcamp
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Join the waitlist for M-CEL TECH&rsquo;s upcoming hybrid training
            designed to equip professionals with practical AI and digital
            skills.
          </motion.p>

          {/* Modules */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
          >
            {modules.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[13px] font-medium text-white/80 shadow-premium"
              >
                <Icon className="h-3.5 w-3.5 text-cyan-400" strokeWidth={2} />
                {label}
              </span>
            ))}
          </motion.div>

          {/* Price + format */}
          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-3xl font-semibold text-white">
                &#8358;15,000
              </span>
              <span className="text-sm text-white/50">one-time</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-2 text-sm font-medium text-white/70">
              <Users2 className="h-4 w-4 text-cyan-400" strokeWidth={2} />
              Hybrid Format
            </div>
          </motion.div>

          <motion.div variants={item} className="mt-10">
            <button
              onClick={scrollToForm}
              className="group inline-flex items-center gap-2 rounded-full bg-royal-500 px-7 py-3.5 text-[15px] font-medium text-white shadow-glow transition-all hover:bg-royal-600 hover:shadow-premium-lg active:scale-[0.97]"
            >
              Join the Waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
