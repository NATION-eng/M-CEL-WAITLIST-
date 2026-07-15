"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("waitlist-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-midnight-950/80 backdrop-blur-lg shadow-premium border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between sm:h-20">
          <a href="#top" className="flex items-center">
            <Image
              src="/logo.png"
              alt="M-CEL TECH"
              width={1106}
              height={459}
              priority
              className="h-8 w-auto sm:h-9 brightness-0 invert"
            />
          </a>

          <button
            onClick={scrollToForm}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-midnight-950 shadow-premium transition-all hover:bg-white/90 hover:shadow-glow active:scale-[0.97] sm:px-5 sm:py-2.5"
          >
            Join Waitlist
          </button>
        </nav>
      </Container>
    </motion.header>
  );
}
