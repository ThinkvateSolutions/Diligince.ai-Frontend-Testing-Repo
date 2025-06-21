import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Clock, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const Jobdetails = () => {
  const { state } = useLocation();
  
  // Debug: Check what's being received
  console.log("Navigation state:", state);

  // Redirect if no job data
  if (!state?.job) {
    return <Navigate to="/careers" replace />;
  }

  const { title, location, type, department, description } = state.job;

 const roleoffer = [
  "Design, develop, and maintain web application user interfaces using the React JavaScript library.",
  "Collaborate with cross-functional teams to define and design new features.",
  "Optimize components for maximum performance across a vast array of web-capable devices and browsers.",
  "Ensure the technical feasibility of UI/UX designs."
];
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Blue Banner */}
        <div className="h-[30px] w-full bg-blue-500"></div>

        {/* Job Details */}
       {/* Full-width gray background container */}
        <div className="w-full bg-gray-100">
          {/* Constrained content container */}
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            
            {/* Job details row - improved spacing and responsiveness */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              {/* Job metadata - now stacks on mobile */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-600">
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <MapPin className="h-4 w-4 flex-shrink-0" /> 
                  {location}
                </span>
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <Clock className="h-4 w-4 flex-shrink-0" /> 
                  {type}
                </span>
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <Briefcase className="h-4 w-4 flex-shrink-0" /> 
                  {department}
                </span>
              </div>

              {/* Apply button - right-aligned */}
              <Button size="lg" className="w-full sm:w-auto mt-2 sm:mt-0">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
        
   
         
        {/* Body page */}
        
        <div className="flex w-full">
          <div className="w-[70%]  p-4">
            <div>
            <h1 className="pl-20 mt-40">OPENTEXT </h1>
            <p className="pl-20">OpenText is a global leader in information management, where innovation, creativity, and collaboration are the key components of our corporate culture. As a member of our team, you will have the opportunity to partner with the most highly regarded companies in the world, tackle complex issues, and contribute to projects that shape the future of digital transformation.</p>
            <p className="pl-20 pt-20">As a global leader in secure information management, OpenText empowers businesses to stay ahead of the ever-evolving cyber threats. Our Cybersecurity Enterprise portfolio is formidable, offering innovative solutions that safeguard organizations from malicious attacks, data breaches, and cyber vulnerabilities. By joining our team, you'll be at the forefront of developing and implementing state-of-the-art security technologies, protecting critical assets and sensitive information for clients worldwide.</p>
            </div>
            <div>
            <h1 className="pl-20 mt-20">Your Impact: </h1>
            <p className="pl-20 pt-10">A Development role at OpenText is more than just a job; it's an opportunity to impact lives. As a key contributor, you'll be instrumental in constructing cutting-edge Information Management Solutions that contribute to sustainable supply chains, support refugees, and enhance medical information access to save lives. You will engage in solving meaningful challenges within a motivated team, gaining exposure to advanced technologies beyond individual access. You will be encouraged to cultivate an engineering mindset, driving the creation of innovative software solutions that address real-world problems and shape the future.</p>
            </div>
             <div>
            <h1 className="pl-20 mt-20">What the role offers:</h1>
            <p className="pl-20 pt-10">As a Senior Software Developer, you will:</p>
            <ul className="pl-40 pt-10 list-disc">
              {roleoffer.map((item, index) => (
                   <li className="pb-1" key={index}>{item}</li>
               ))}
            </ul>
            </div>
            <div>
            
           <p className="pl-20 pt-10 font-bold">What you need to Succeed:</p>
            <ul className="pl-40 pt-10 list-disc">
              {roleoffer.map((item, index) => (
                   <li className="pb-1" key={index}>{item}</li>
               ))}
            </ul>
            </div>
            <div>
              <p className="pl-20 pt-10 font-bold">One last thing:</p>
              <p className="pl-20 pt-10">OpenText is more than just a corporation, it's a global community where trust is foundational, the bar is raised, and outcomes are owned. </p>
              <p className="pl-20 pt-10">OpenText is more than just a corporation, it's a global community where trust is foundational, the bar is raised, and outcomes are owned. </p>
            </div>
            
            <div className="m-20 ">
             <Button className=" sm:w-auto mt-2 sm:mt-0 ">
                Apply Now
              </Button>
              </div>
          </div>
          <div className="w-[30%]  p-4">
            {/* Second 40% content */}
          </div>
        </div>

          
        
      </main>
      <Footer/>
    </div>
  );
};

export default Jobdetails;