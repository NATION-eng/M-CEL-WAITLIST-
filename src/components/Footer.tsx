import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";

const whatsappNumbers = [
  { display: "+234 706 383 6336", raw: "2347063836336" },
  { display: "+234 808 841 8335", raw: "2348088418335" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-midnight-950 py-14">
      <Container>
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start">
              <Image
                src="/logo.png"
                alt="M-CEL TECH"
                width={1106}
                height={459}
                className="h-9 w-auto brightness-0 invert"
              />
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
              Engineering Tomorrow&rsquo;s Technology, Today.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:items-end">
            <span className="text-xs font-medium uppercase tracking-wide text-white/40">
              Reach us on WhatsApp
            </span>
            <div className="flex flex-col items-center gap-2 sm:items-end">
              {whatsappNumbers.map(({ display, raw }) => (
                <a
                  key={raw}
                  href={`https://wa.me/${raw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-cyan-400"
                >
                  <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
                  {display}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/[0.06] pt-6 text-center">
          <p className="text-xs text-white/40">
            &copy; {year} M-CEL TECH. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
