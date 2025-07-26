import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ScrollText, ArrowLeft } from "lucide-react";

const Privacy = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="w-8 h-8 text-blue-600" />
                  Privacy <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Policy</span>
                </span>
              </h1>
              <p className="mt-4 text-gray-600 text-sm sm:text-base">
                Effective Date: April 1, 2025
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-200">
              <div className="space-y-10 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                <div>
                  <h2 className="flex items-center text-xl sm:text-2xl font-bold mb-3">
                    <ScrollText className="w-6 h-6 mr-2 text-blue-500" /> Information We Collect
                  </h2>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Personal identification information (Name, email address, phone number)</li>
                    <li>Technical data (IP address, browser type, device type)</li>
                    <li>Usage data (pages visited, time spent, clicks)</li>
                    <li>Communication data (messages, support interactions)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3">How We Use Your Information</h2>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>To provide and improve our services</li>
                    <li>To process transactions and send confirmations</li>
                    <li>To communicate with you and respond to inquiries</li>
                    <li>To ensure legal compliance and prevent fraud</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3">Cookies & Tracking Technologies</h2>
                  <p>
                    We use cookies and similar tracking technologies to enhance your experience. You can manage your cookie preferences through your browser settings.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3">Data Sharing</h2>
                  <p>
                    We do not sell your personal data. We may share information with trusted third parties to operate our website and services, such as hosting providers and analytics services.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3">Data Retention</h2>
                  <p>
                    We retain your information only as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3">Your Rights</h2>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Right to access and update your data</li>
                    <li>Right to request data deletion</li>
                    <li>Right to object to processing</li>
                    <li>Right to withdraw consent</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3">Children's Privacy</h2>
                  <p>
                    Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3">Security</h2>
                  <p>
                    We implement robust security measures to protect your data against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3">Third-Party Links</h2>
                  <p>
                    Our website may contain links to third-party sites. We are not responsible for the privacy practices of such sites. Please review their policies.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3">Changes to This Policy</h2>
                  <p>
                    We may update this policy from time to time. Any changes will be posted on this page with a revised effective date.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3">Contact Us</h2>
                  <p>
                    If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:privacy@diligince.ai" className="text-blue-600 underline">privacy@diligince.ai</a>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Last updated: April 1, 2025</p>
                </div>
              </div>

              <div className="mt-14 text-center">
                <Button onClick={handleBackToHome} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-full text-sm sm:text-base font-semibold inline-flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back to Home
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
