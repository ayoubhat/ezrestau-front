import LandingPageFooter from "@/components/landing/LandingPageFooter";
import LandingPageNavbar from "@/components/landing/LandingPageNavbar";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <LandingPageNavbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <SignUp />
      </main>
      <LandingPageFooter />
    </div>
  );
}
