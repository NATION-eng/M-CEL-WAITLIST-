import { Hammer, FolderKanban, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

const cards = [
  {
    icon: Hammer,
    title: "Practical Learning",
    description:
      "Hands-on sessions built around real tools and workflows, not just theory, so every concept sticks.",
  },
  {
    icon: FolderKanban,
    title: "Real Projects",
    description:
      "Work on tangible builds you can showcase, from automations to AI-generated video, by the end of the cohort.",
  },
  {
    icon: Target,
    title: "Industry-Relevant Skills",
    description:
      "Curriculum shaped around what employers and clients are actually asking for in AI and digital roles today.",
  },
];

export function WhyJoin() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <FadeIn className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Why join the bootcamp
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            A training experience built for people who want capability, not
            just certificates.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon: Icon, title, description }, i) => (
            <FadeIn key={title} delay={i * 0.1}>
              <div className="group h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04] hover:border-cyan-400/20 hover:shadow-premium-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 transition-colors group-hover:bg-cyan-400">
                  <Icon
                    className="h-5 w-5 text-cyan-400 transition-colors group-hover:text-midnight-950"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/50">
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
