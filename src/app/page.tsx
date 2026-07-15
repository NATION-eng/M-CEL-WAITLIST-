import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhyJoin } from "@/components/WhyJoin";
import { Highlights } from "@/components/Highlights";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <WhyJoin />
      <Highlights />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
