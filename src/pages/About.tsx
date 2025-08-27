<<<<<<< HEAD

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
=======
<<<<<<< HEAD
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Lightbulb, ShieldCheck, Star } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
=======

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
<<<<<<< HEAD
      <main className="flex-grow pt-24 pb-16">
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Diligince.ai</h1>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We are building the leading AI powered platform connecting industrial ecosystems in India.
=======
<<<<<<< HEAD
      <main className="flex-grow bg-gradient-to-br from-gray-50 to-white">
        <section className="pt-28 pb-20">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center mb-20">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                About <span className="text-blue-600">Diligince.ai</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We are building the leading AI-powered platform connecting industrial ecosystems in India.
>>>>>>> 9b0ce35 (Initial commit)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2024, Diligince.ai was born from a vision to revolutionize how industrial plants connect with vendors, professionals and logistics partners across India.
                </p>
                <p className="text-gray-600 mb-4">
                  We recognized the inefficiencies in the traditional industrial service marketplace and set out to create a technology driven solution that leverages artificial intelligence to make connections faster, smarter and more reliable.
                </p>
<<<<<<< HEAD
                <p className="text-gray-600">
=======
                <p className="text-gray-700 leading-relaxed">
=======
      <main className="flex-grow pt-24 pb-16">
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Diligince.ai</h1>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We are building the leading AI powered platform connecting industrial ecosystems in India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2024, Diligince.ai was born from a vision to revolutionize how industrial plants connect with vendors, professionals and logistics partners across India.
                </p>
                <p className="text-gray-600 mb-4">
                  We recognized the inefficiencies in the traditional industrial service marketplace and set out to create a technology driven solution that leverages artificial intelligence to make connections faster, smarter and more reliable.
                </p>
                <p className="text-gray-600">
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                  Our platform is scheduled to launch in 2025, bringing an innovative approach to industrial partnerships throughout India.
                </p>
              </div>

<<<<<<< HEAD
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission & Vision</h2>
                <p className="text-gray-600 mb-4">
                  <strong>Mission:</strong> To create seamless connections between industrial plants and service providers, driving efficiency and growth across the industrial ecosystem.
                </p>
                <p className="text-gray-600 mb-4">
=======
<<<<<<< HEAD
              <div className="bg-white rounded-xl shadow-lg p-10 border-t-4 border-blue-600">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-3">Our Mission & Vision</h2>
                <p className="text-gray-700 mb-5 leading-relaxed">
                  <strong>Mission:</strong> To create seamless connections between industrial plants and service providers, driving efficiency and growth across the industrial ecosystem.
                </p>
                <p className="text-gray-700 leading-relaxed">
=======
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission & Vision</h2>
                <p className="text-gray-600 mb-4">
                  <strong>Mission:</strong> To create seamless connections between industrial plants and service providers, driving efficiency and growth across the industrial ecosystem.
                </p>
                <p className="text-gray-600 mb-4">
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                  <strong>Vision:</strong> To become the most intelligent and trusted industrial services marketplace in India, making it effortless for plant owners to find exactly the services they need.
                </p>
              </div>
            </div>

<<<<<<< HEAD
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Innovation</h3>
                    <p className="text-gray-600">
=======
<<<<<<< HEAD
            <div className="mt-10">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
                Our Core Values
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                <Card className="bg-white border border-gray-200 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300">
                  <CardHeader className="flex items-center justify-center py-8">
                    <div className="p-4 rounded-full bg-blue-100">
                      <Lightbulb className="h-10 w-10 text-blue-600" />
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-8 text-center">
                    <CardTitle className="text-2xl font-bold mb-3 text-gray-900">Innovation</CardTitle>
                    <CardDescription className="text-gray-700 text-base">
>>>>>>> 9b0ce35 (Initial commit)
                      We continuously explore new technologies and approaches to solve complex industrial challenges.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Reliability</h3>
                    <p className="text-gray-600">
                      We build trustworthy systems and forge dependable relationships with all stakeholders.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Excellence</h3>
                    <p className="text-gray-600">
                      We strive for excellence in every aspect of our platform and service delivery.
<<<<<<< HEAD
                    </p>
=======
                    </CardDescription>
=======
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Innovation</h3>
                    <p className="text-gray-600">
                      We continuously explore new technologies and approaches to solve complex industrial challenges.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Reliability</h3>
                    <p className="text-gray-600">
                      We build trustworthy systems and forge dependable relationships with all stakeholders.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Excellence</h3>
                    <p className="text-gray-600">
                      We strive for excellence in every aspect of our platform and service delivery.
                    </p>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
