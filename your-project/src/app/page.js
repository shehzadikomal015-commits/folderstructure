"use client";

import { useState } from "react";
import { LandingNavbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { LoginModal } from "@/components/landing/LoginModal";
import { SignupModal } from "@/components/landing/SignupModal";

export default function Home() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const openLogin = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  const openSignup = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  return (
    <>
      <LandingNavbar onOpenLogin={openLogin} onOpenSignup={openSignup} />
      <main>
        <HeroSection onOpenLogin={openLogin} onOpenSignup={openSignup} />
        <ProblemSection />
        <HowItWorks />
        <FeaturesGrid />
        <DashboardPreview />
        <Testimonials />
        <FAQ />
        <CTASection onOpenLogin={openLogin} onOpenSignup={openSignup} />
      </main>
      <Footer />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToSignup={openSignup}
      />
      <SignupModal
        open={signupOpen}
        onClose={() => setSignupOpen(false)}
        onSwitchToLogin={openLogin}
      />
    </>
  );
}
