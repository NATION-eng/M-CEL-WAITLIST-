import {
  Laptop2,
  UsersRound,
  GraduationCap,
  Award,
  Wallet,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

const highlights = [
  {
    icon: Laptop2,
    title: "Hybrid Learning",
    description: "Attend in person or join live sessions online, your choice.",
  },
  {
    icon: UsersRound,
    title: "Small Cohorts",
    description: "Focused class sizes that keep instruction personal and direct.",
  },
  {
    icon: GraduationCap,
    title: "Expert Guidance",
    description: "Learn directly from practitioners working in AI and digital tools.",
  },
  {
    icon: Award,
    title: "Certificate of Completion",
    description: "Walk away with a credential that verifies your new skill set.",
  },
  {
    icon: Wallet,
    title: "Affordable Fee",
    description: "Premium training at a price built for working professionals.",
  },
];

export function Highlights() {
  return (
    <section className="relative overflow-hidden bg-midnight-900/40 border-y border-white/[0.05] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(37,99,235,0.25)_0%,rgba(15,23,42,0)_70%)]" />

      <Container className="relative">
        <FadeIn className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Training highlights
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/55">
            Everything about this cohort is designed around outcomes, not
            just attendance.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {highlights.map(({ icon: Icon, title, description }, i) => (
            <FadeIn key={title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.07]">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.06] transition-colors group-hover:bg-cyan-400/15">
                  <Icon className="h-5 w-5 text-cyan-400" strokeWidth={2} />
                </div>
                <h3 className="mt-5 font-display text-[15px] font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/50">
                  {description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
