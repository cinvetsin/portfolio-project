"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";

interface Project {
  id: number;
  year: number;
  title: string;
  description: string;
  links: { label: string; url: string }[];
  key_tech: string[];
  fiels: string;
}

export default function ProjectsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("all");
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<number, boolean>
  >({});

  // Fetch projects data from the JSON file
  useEffect(() => {
    fetch("/data/projects.json")
      .then((response) => response.json())
      .then((data: Project[]) => {
        setProjectsData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects data:", error);
        setLoading(false);
      });
  }, []);

  // Filter logic
  const filteredProjects = projectsData.filter((project) => {
    const matchesSearchTerm =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.key_tech
        .join(", ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesField =
      selectedField === "all" ||
      project.fiels.toLowerCase() === selectedField.toLowerCase();
    return matchesSearchTerm && matchesField;
  });

  // Toggle description visibility
  const toggleDescription = (projectId: number) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  if (loading) {
    return <div className="py-8 text-center">Loading projects...</div>;
  }

  return (
    <section id="projects" className="bg-gray-100 pt-28 dark:bg-gray-800">
      {/* Projects Title */}
      <h2 className="text-center font-grace text-4xl font-bold text-blue-500 dark:text-blue-300">
        Projects
      </h2>

      {/* Search Bar */}
      <div className="mt-4 text-center">
        <SearchBar onSearch={(query) => setSearchTerm(query)} />
      </div>

      {/* Filter Links */}
      <div className="mt-4 px-4">
        {/* Dropdown for smaller screens */}
        <div className="block sm:hidden">
          <select
            onChange={(e) => setSelectedField(e.target.value)}
            value={selectedField}
            className="w-full font-comingSoon font-bold rounded-md border border-gray-300 p-2"
          >
            <option value="all">All Fields</option>
            <option value="data science">Data Science</option>
            <option value="machine learning">Machine Learning</option>
            <option value="software engineering">Software Engineering</option>
            <option value="UI/UX">UI/UX</option>
          </select>
        </div>

        {/* Button group for larger screens */}
<div className="hidden flex-wrap justify-center gap-1 sm:flex sm:gap-1 lg:gap-3">
  <button
    onClick={() => setSelectedField("all")}
    onMouseEnter={() => setHoveredField("all")}
    onMouseLeave={() => setHoveredField(null)}
    className="p-2 sm:p-3 lg:p-4"
  >
    <Image
      src={
        selectedField === "all" || hoveredField === "all"
          ? "/icons/tags/all_fields_clicked.svg"
          : "/icons/tags/all_fields.svg"
      }
      alt="All Fields"
      width={64}
      height={64}
      className="h-12 w-48 sm:h-8 sm:w-36 lg:h-12 lg:w-40"
    />
  </button>
  <button
    onClick={() => setSelectedField("data science")}
    onMouseEnter={() => setHoveredField("data science")}
    onMouseLeave={() => setHoveredField(null)}
    className="p-2 sm:p-3 lg:p-4"
  >
    <Image
      src={
        selectedField === "data science" || hoveredField === "data science"
          ? "/icons/tags/data_science_clicked.svg"
          : "/icons/tags/data_science.svg"
      }
      alt="Data Science"
      width={64}
      height={64}
      className="h-12 w-48 sm:h-8 sm:w-36 lg:h-12 lg:w-40"
    />
  </button>
  <button
    onClick={() => setSelectedField("machine learning")}
    onMouseEnter={() => setHoveredField("machine learning")}
    onMouseLeave={() => setHoveredField(null)}
    className="p-2 sm:p-3 lg:p-4"
  >
    <Image
      src={
        selectedField === "machine learning" || hoveredField === "machine learning"
          ? "/icons/tags/machine_learning_clicked.svg"
          : "/icons/tags/machine_learning.svg"
      }
      alt="Machine Learning"
      width={64}
      height={64}
      className="h-12 w-48 sm:h-8 sm:w-36 lg:h-12 lg:w-40"
    />
  </button>
  <button
    onClick={() => setSelectedField("software engineering")}
    onMouseEnter={() => setHoveredField("software engineering")}
    onMouseLeave={() => setHoveredField(null)}
    className="p-2 sm:p-3 lg:p-4"
  >
    <Image
      src={
        selectedField === "software engineering" || hoveredField === "software engineering"
          ? "/icons/tags/software_engineering_clicked.svg"
          : "/icons/tags/software_engineering.svg"
      }
      alt="Software Engineering"
      width={64}
      height={64}
      className="h-12 w-48 sm:h-8 sm:w-36 lg:h-12 lg:w-40"
    />
  </button>
  <button
    onClick={() => setSelectedField("UI/UX")}
    onMouseEnter={() => setHoveredField("UI/UX")}
    onMouseLeave={() => setHoveredField(null)}
    className="p-2 sm:p-3 lg:p-4"
  >
    <Image
      src={
        selectedField === "UI/UX" || hoveredField === "UI/UX"
          ? "/icons/tags/ui_ux_clicked.svg"
          : "/icons/tags/ui_ux.svg"
      }
      alt="UI/UX"
      width={64}
      height={64}
      className="h-12 w-48 sm:h-8 sm:w-36 lg:h-12 lg:w-40"
    />
  </button>
</div>

      </div>

      {/* Projects Grid */}
      <div className="mt-8 px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg border-4 border-gray-800 bg-gray-300 p-6 shadow-lg dark:border-gray-200 dark:bg-gray-700"
            >
              <h3 className="font-comingSoon text-xl font-bold text-gray-800 dark:text-gray-200">
                {project.title} ({project.year})
              </h3>

              <div className="mt-2 flex flex-wrap gap-2">
                {project.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full border-2 border-gray-800 bg-transparent px-4 py-2 font-comingSoon text-sm font-bold text-gray-800 transition-all duration-200 hover:bg-[#FEDDC6] hover:text-gray-800 dark:border-gray-200 dark:text-gray-200 dark:hover:bg-[#4A3F35] dark:hover:text-gray-100"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Fancier Accordion for Description */}
              <div className="mt-4">
                <button
                  onClick={() => toggleDescription(project.id)}
                  className="flex w-full items-center justify-between rounded-lg bg-gray-200 p-3 text-left font-medium text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 dark:focus:ring-gray-500"
                >
                  <span className="flex items-center font-singleDay">
                    <svg
                      className="mr-2 h-5 w-5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {expandedDescriptions[project.id]
                      ? "Hide Description"
                      : "Show Description"}
                  </span>
                  <svg
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      expandedDescriptions[project.id] ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {expandedDescriptions[project.id] && (
                  <div className="mt-2 rounded-lg bg-gray-200 p-4 text-gray-800 shadow-lg dark:bg-gray-800 dark:text-gray-100">
                    <p className="font-singleDay">{project.description}</p>
                  </div>
                )}
              </div>

              <p className="text-m mt-2 font-singleDay text-gray-700 dark:text-gray-200">
                <strong>Key Technologies:</strong> {project.key_tech.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
