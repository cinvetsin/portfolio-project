"use client";
import React from "react";
import dynamic from "next/dynamic";
import Navbar from "~/app/_components/Navbar";
import Footer from "./_components/Footer";

const HeroSection = dynamic(() => import("~/app/_components/HeroSection"), {
  ssr: false,
});
const ProjectsSection = dynamic(() => import("~/app/_components/Projects"), {
  ssr: false,
});
const ExperienceSection = dynamic(() => import("~/app/_components/Experiences"), {
  ssr: false,
});
const EducationSection = dynamic(() => import("./_components/Educations"), {
  ssr: false,
});
const HonorsSection = dynamic(() => import("./_components/Honors"), {
  ssr: false,
});

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

