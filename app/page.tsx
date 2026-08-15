import Hero from "@/components/Hero";
import ForWho from "@/components/ForWho";
import DifferentialAngle from "@/components/DifferentialAngle";
import ProgramTabs from "@/components/ProgramTabs";
import WhatsIncluded from "@/components/WhatsIncluded";
import Testimonials from "@/components/Testimonials";
import AboutPaty from "@/components/AboutPaty";
import NotAnotherZoom from "@/components/NotAnotherZoom";
import PricingSection from "@/components/PricingSection";
import FAQ from "@/components/FAQ";
import MentorshipTeaser from "@/components/MentorshipTeaser";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <ForWho />
      <DifferentialAngle />
      <ProgramTabs />
      <WhatsIncluded />
      <Testimonials />
      <AboutPaty />
      <NotAnotherZoom />
      <PricingSection />
      <FAQ />
      <MentorshipTeaser />
      <Footer />
    </main>
  );
}
