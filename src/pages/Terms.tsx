<<<<<<< HEAD

=======
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======

>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Terms = () => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
  const navigate = useNavigate();

>>>>>>> 9b0ce35 (Initial commit)
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-12">
<<<<<<< HEAD
=======
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
=======
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-12">
>>>>>>> 9b0ce35 (Initial commit)
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="lead">
                Effective Date: April 1, 2025
              </p>
              <p>
                Please read these Terms of Service ("Terms", "Terms of Service") carefully before using 
                the Diligince.ai website and platform operated by Diligince.ai ("us", "we", "our").
              </p>
              <p>
                Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. 
                These Terms apply to all visitors, users and others who access or use the Service.
              </p>
              <p>
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with 
                any part of the terms, then you may not access the Service.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Accounts</h2>
              <p>
                When you create an account with us, you must provide us with accurate, complete and up-to-date 
                information. Failure to do so constitutes a breach of the Terms, which may result in immediate 
                termination of your account on our Service.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access the Service and for any 
                activities or actions under your password, whether your password is with our Service or a third-party service.
              </p>
              <p>
                You agree not to disclose your password to any third party. You must notify us immediately upon 
                becoming aware of any breach of security or unauthorized use of your account.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Subscriptions and Payments</h2>
              <p>
                Some parts of the Service are billed on a subscription basis. You will be billed in advance on a 
                recurring and periodic basis, depending on the type of subscription plan you select.
              </p>
              <p>
                At the end of each billing period, your subscription will automatically renew under the same conditions 
                unless you cancel it or we cancel it. You may cancel your subscription at any time through your account 
                settings or by contacting our customer support team.
              </p>
              <p>
                For any subscription changes or cancellations, changes will take effect at the end of the current 
                billing cycle. You will not receive a refund for the current billing cycle.
              </p>
              <p>
                We use trusted third-party payment processors for all transactions. By providing your payment information, 
                you authorize us to charge your payment method for all subscription fees incurred.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Platform Usage and Restrictions</h2>
              <p>
                Our platform is designed to connect industrial plants with vendors, professionals and logistics providers. 
                Users may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the platform for any illegal purpose or to solicit others to perform illegal acts</li>
                <li>Violate any international, federal, provincial or state regulations, rules, laws, or local ordinances</li>
                <li>Infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>Submit false or misleading information</li>
                <li>Upload or transmit viruses or any other type of malicious code</li>
                <li>Collect or track the personal information of others</li>
                <li>Interfere with or circumvent the security features of the Service</li>
                <li>Engage in unauthorized framing or linking to the Service</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Intellectual Property</h2>
              <p>
                The Service and its original content, features and functionality are and will remain the exclusive 
                property of Diligince.ai and its licensors. The Service is protected by copyright, trademark and 
                other laws of both India and foreign countries.
              </p>
              <p>
                Our trademarks and trade dress may not be used in connection with any product or service without 
                the prior written consent of Diligince.ai.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any 
                reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p>
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate 
                your account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Limitation of Liability</h2>
              <p>
                In no event shall Diligince.ai, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                be liable for any indirect, incidental, special, consequential or punitive damages, including without 
                limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your access to or use of or inability to access or use the Service</li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>Any content obtained from the Service</li>
                <li>Unauthorized access, use or alteration of your transmissions or content</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a 
                revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
              </p>
              <p>
                By continuing to access or use our Service after those revisions become effective, you agree to 
                be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                Email: legal@diligince.ai<br />
                Phone: +91 9848756956<br />
                Address: Visakhapatnam, Andhra Pradesh, India
              </p>
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

<<<<<<< HEAD
=======
<<<<<<< HEAD
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

=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
export default Terms;
