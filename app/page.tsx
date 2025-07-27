import LandingPageNavbar from "@/components/landing/LandingPageNavbar";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Hero from "@/components/landing/Hero";
import CTA from "@/components/landing/CTA";
import LandingPageFooter from "@/components/landing/LandingPageFooter";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <LandingPageNavbar />
      <Hero />
      <Features />
      <Pricing />
      <CTA />
      <LandingPageFooter />
    </div>
  );
};

export default LandingPage;
