<<<<<<< HEAD

=======
<<<<<<< HEAD
=======

>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
<<<<<<< HEAD
=======
<<<<<<< HEAD
    phone: "",
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
<<<<<<< HEAD
=======
<<<<<<< HEAD

    if (name === "name" && /[^a-zA-Z\s]/.test(value)) return;
    if (name === "phone" && /[^\d]/.test(value)) return;

=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    console.log("Form submitted:", formData);
    
=======
<<<<<<< HEAD

    const { name, email, phone, subject, message } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^\d{10}$/;

    if (name.length < 2 || name.length > 50) {
      return toast({ title: "Invalid name", description: "Name should be between 2 and 50 characters." });
    }

    if (!nameRegex.test(name)) {
      return toast({ title: "Invalid name", description: "Name should only contain letters and spaces." });
    }

    if (!emailRegex.test(email)) {
      return toast({ title: "Invalid email", description: "Please enter a valid email address." });
    }

    if (!phoneRegex.test(phone)) {
      return toast({ title: "Invalid phone number", description: "Phone number should be 10 digits." });
    }

    if (subject.length < 5 || subject.length > 100) {
      return toast({ title: "Invalid subject", description: "Subject should be 5 to 100 characters long." });
    }

    if (message.length < 10 || message.length > 1000) {
      return toast({ title: "Invalid message", description: "Message should be between 10 and 1000 characters." });
    }

    console.log("Form submitted:", formData);

=======
    console.log("Form submitted:", formData);
    
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    toast({
      title: "Message sent!",
      description: "We will get back to you as soon as possible.",
    });
<<<<<<< HEAD
    
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
=======
<<<<<<< HEAD

    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
=======
    
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
<<<<<<< HEAD
=======
<<<<<<< HEAD
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Contact <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Us</span>
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Have questions, suggestions, or need support? Reach out and our team will respond promptly.
=======
>>>>>>> 9b0ce35 (Initial commit)
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Have questions about our services? Need support? We are here to help.
                Reach out to us using any of the methods below.
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
<<<<<<< HEAD
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Get in Touch</h2>
                <Card className="bg-white border border-gray-100 shadow-sm p-6">
=======
<<<<<<< HEAD
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">Get in Touch</h2>
                <Card className="bg-white border border-gray-100 shadow-lg p-6 md:p-8 rounded-2xl">
=======
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Get in Touch</h2>
                <Card className="bg-white border border-gray-100 shadow-sm p-6">
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
<<<<<<< HEAD
                        className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-200"
=======
<<<<<<< HEAD
>>>>>>> 9b0ce35 (Initial commit)
                        required
                      />
                    </div>
<<<<<<< HEAD
                    
=======

=======
                        className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-200"
                        required
                      />
                    </div>
                    
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
<<<<<<< HEAD
                        className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-200"
                        required
                      />
                    </div>
                    
=======
<<<<<<< HEAD
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        required
                        minLength={10}
                        maxLength={10}
                      />
                    </div>

=======
                        className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-200"
                        required
                      />
                    </div>
                    
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
<<<<<<< HEAD
                        placeholder="How can we help?"
                        className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-200"
=======
<<<<<<< HEAD
                        placeholder="What's this about?"
>>>>>>> 9b0ce35 (Initial commit)
                        required
                      />
                    </div>
<<<<<<< HEAD
                    
=======

=======
                        placeholder="How can we help?"
                        className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-200"
                        required
                      />
                    </div>
                    
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
<<<<<<< HEAD
                        placeholder="Tell us about your inquiry..."
=======
<<<<<<< HEAD
                        placeholder="Write your message..."
>>>>>>> 9b0ce35 (Initial commit)
                        rows={6}
                        className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-200"
                        required
                      />
                    </div>
<<<<<<< HEAD
                    
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
=======

                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm md:text-base">
=======
                        placeholder="Tell us about your inquiry..."
                        rows={6}
                        className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-200"
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                  </form>
                </Card>
              </div>
<<<<<<< HEAD
              
=======
<<<<<<< HEAD

>>>>>>> 9b0ce35 (Initial commit)
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>
                <div className="grid gap-6">
<<<<<<< HEAD
                  <Card className="p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
=======
                  <Card className="p-6 bg-white border border-gray-100 shadow-md rounded-2xl">
=======
              
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>
                <div className="grid gap-6">
                  <Card className="p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Address</h3>
<<<<<<< HEAD
                        <p className="text-gray-600 mt-1">
                          Visakhapatnam, Andhra Pradesh, India
                        </p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
=======
<<<<<<< HEAD
                        <p className="text-gray-600 mt-1">Visakhapatnam, Andhra Pradesh, India</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-white border border-gray-100 shadow-md rounded-2xl">
=======
                        <p className="text-gray-600 mt-1">
                          Visakhapatnam, Andhra Pradesh, India
                        </p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                    <div className="flex items-start">
                      <Phone className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                        <p className="text-gray-600 mt-1">
<<<<<<< HEAD
                          <a href="tel:+919848756956" className="hover:text-blue-600">
                            +91 9848756956
                          </a>
=======
<<<<<<< HEAD
                          <a href="tel:+919848756956" className="hover:text-blue-600">+91 9848756956</a>
=======
                          <a href="tel:+919848756956" className="hover:text-blue-600">
                            +91 9848756956
                          </a>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                        </p>
                      </div>
                    </div>
                  </Card>
<<<<<<< HEAD
                  
                  <Card className="p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
=======
<<<<<<< HEAD

                  <Card className="p-6 bg-white border border-gray-100 shadow-md rounded-2xl">
=======
                  
                  <Card className="p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                    <div className="flex items-start">
                      <Mail className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                        <p className="text-gray-600 mt-1">
<<<<<<< HEAD
                          <a href="mailto:support@diligince.ai" className="hover:text-blue-600">
                            support@diligince.ai
                          </a>
=======
<<<<<<< HEAD
                          <a href="mailto:support@diligince.ai" className="hover:text-blue-600">support@diligince.ai</a>
=======
                          <a href="mailto:support@diligince.ai" className="hover:text-blue-600">
                            support@diligince.ai
                          </a>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
<<<<<<< HEAD
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Business Hours</h3>
                  <div className="text-gray-600 bg-white p-4 rounded-lg border border-gray-100">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
=======
<<<<<<< HEAD

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Business Hours</h3>
                  <div className="text-gray-600 bg-white p-4 rounded-lg border border-gray-100">
                    <p>Mon - Fri: 9:00 AM - 6:00 PM IST</p>
=======
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Business Hours</h3>
                  <div className="text-gray-600 bg-white p-4 rounded-lg border border-gray-100">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                    <p>Saturday: 10:00 AM - 2:00 PM IST</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
<<<<<<< HEAD
              </div>
            </div>
=======
<<<<<<< HEAD

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Our Location</h3>
                  <div className="overflow-hidden rounded-2xl shadow-md border border-gray-100">
                    <iframe
                      title="Google Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.489481264679!2d83.21848161487641!3d17.686815487915366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39431bdc4101c1%3A0x84d3d77e61785764!2sVisakhapatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1692012580621!5m2!1sen!2sin"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>

              </div>
            </div>

=======
              </div>
            </div>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
