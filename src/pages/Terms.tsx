import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="bg-gray-50 p-8 md:p-12 rounded-2xl shadow-md border border-gray-200">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Terms of Service</h1>
              <p className="text-sm text-gray-500 mb-10">Effective Date: April 1, 2025</p>

              <div className="space-y-12 text-base leading-relaxed">
                <Intro />
                <Section title="1. Accounts & Registration">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You must provide accurate, complete, and current information during registration.</li>
                    <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                    <li>You agree to notify us of any unauthorized use of your account.</li>
                  </ul>
                </Section>

                <Section title="2. Subscriptions & Billing">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Some services require a subscription plan (Freemium and Pro tiers).</li>
                    <li>All fees are billed in advance and are non-refundable unless otherwise stated.</li>
                    <li>Plans will automatically renew unless cancelled before the renewal date.</li>
                  </ul>
                </Section>

                <Section title="3. Acceptable Use Policy">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>No use for illegal, harmful, or abusive activities.</li>
                    <li>Do not distribute malware, spam, or attempt to breach security.</li>
                    <li>You must not reverse-engineer or copy any platform code or design.</li>
                  </ul>
                </Section>

                <Section title="4. Intellectual Property Rights">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All content, logos, trademarks, and software are owned by Diligince.ai.</li>
                    <li>You are granted a limited, non-exclusive license to use our services.</li>
                  </ul>
                </Section>

                <Section title="5. Termination">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>We reserve the right to suspend or terminate access for violation of terms.</li>
                    <li>You may cancel your account at any time via your dashboard or email.</li>
                  </ul>
                </Section>

                <Section title="6. Limitation of Liability">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>We are not liable for indirect, incidental, or consequential damages.</li>
                    <li>Service may experience interruptions, errors, or data loss occasionally.</li>
                  </ul>
                </Section>

                <Section title="7. Privacy Policy">
                  <p>
                    Your use of our service is also governed by our <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>.
                  </p>
                </Section>

                <Section title="8. Modifications to Terms">
                  <p>
                    We may revise these Terms at any time. We'll notify users through email or platform updates.
                    Continued use of the platform means acceptance of any changes.
                  </p>
                </Section>

                <Section title="9. Governing Law">
                  <p>
                    These Terms are governed by and construed in accordance with the laws of India. Any disputes shall be
                    subject to the exclusive jurisdiction of courts in Andhra Pradesh, India.
                  </p>
                </Section>

                <Section title="10. Contact Information">
                  <p>
                    For any questions or concerns, please contact us:
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>Email: <a href="mailto:legal@diligince.ai" className="text-blue-600 underline">legal@diligince.ai</a></li>
                    <li>Phone: +91 9848756956</li>
                    <li>Address: Visakhapatnam, Andhra Pradesh, India</li>
                  </ul>
                </Section>
              </div>
            </div>

            {/* Back to Home Button */}
            <div className="mt-12 text-center">
              <button
                onClick={() => navigate("/")}
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition duration-200"
              >
                Back to Home
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Intro Text
const Intro = () => (
  <div className="space-y-4">
    <p>Welcome to Diligince.ai! These Terms of Service ("Terms") govern your access and use of our platform.</p>
    <p>By accessing or using our services, you agree to be bound by these Terms. If you do not agree, do not use our services.</p>
  </div>
);

// Reusable Section Component
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h2>
    <div className="space-y-4 text-gray-700">{children}</div>
  </div>
);

export default Terms;
