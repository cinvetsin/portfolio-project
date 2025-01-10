import React from "react";
// import Link from "next/link";
import Navbar from "~/app/_components/Navbar";
import HeroSection from "~/app/_components/HeroSection";
import ExperienceSection from "~/app/_components/Experiences";
import ProjectsSection from "~/app/_components/Projects";
import EducationSection from "./_components/Educations";
import Footer from "./_components/Footer";
import HonorsSection from "./_components/Honors";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100"> {/* Light gray background to simulate paper behind content */}
      {/* Navigation Bar */}
      <Navbar size="small" />

      {/* Main Content Area (with white paper effect) */}
      <div className="flex-grow shadow-lg">
        {/* Hero Section */}
        <HeroSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Experiences Section */}
        <ExperienceSection />

        {/* Educations Section */}
        <EducationSection />

        {/* Honors Section */}
        <HonorsSection />

        {/* Footer Section */}
        <Footer />
      </div>
    </div>
  );
}
