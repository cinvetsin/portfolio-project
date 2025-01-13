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
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800"> {/* Light gray background with dark mode support */}
      {/* Navigation Bar */}
      <Navbar size="small" />

      {/* Main Content Area (with white paper effect in light mode and dark paper effect in dark mode) */}
      <div className="flex-grow shadow-lg bg-white dark:bg-gray-800">
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
