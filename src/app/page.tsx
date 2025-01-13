import React from "react";
import Navbar from "~/app/_components/Navbar";
import HeroSection from "~/app/_components/HeroSection";
import ExperienceSection from "~/app/_components/Experiences";
import ProjectsSection from "~/app/_components/Projects";
import EducationSection from "./_components/Educations";
import Footer from "./_components/Footer";
import HonorsSection from "./_components/Honors";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800">
      {/* Navigation Bar */}
      <Navbar size="small" />

      {/* Main Content Area */}
      <div className="flex-grow dark:bg-gray-800 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
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
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

