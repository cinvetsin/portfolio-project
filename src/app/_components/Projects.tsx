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
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<number, boolean>>({});

  // Fetch projects data from the JSON file
  useEffect(() => {
    fetch("/data/projects.json")
      .then((response) => response.json())
      .then((data: Project[]) => {  // Typed here
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
    <section id="projects" className="bg-gray-100 pt-28">
      {/* Projects Title */}
      <h2 className="text-center font-grace text-4xl font-bold text-blue-500">
        Projects
      </h2>

      {/* Search Bar */}
      <div className="mt-4 text-center">
        <SearchBar onSearch={(query) => setSearchTerm(query)} />
      </div>

      {/* Filter Links */}
      <div className="mt-4 flex justify-center space-x-3 px-4">
        <button
          onClick={() => setSelectedField("all")}
          onMouseEnter={() => setHoveredField("all")}
          onMouseLeave={() => setHoveredField(null)}
          className="p-4"
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
            className="h-12 w-64"
          />
        </button>
        <button
          onClick={() => setSelectedField("data science")}
          onMouseEnter={() => setHoveredField("data science")}
          onMouseLeave={() => setHoveredField(null)}
          className="p-4"
        >
          <Image
            src={
              selectedField === "data science" ||
              hoveredField === "data science"
                ? "/icons/tags/data_science_clicked.svg"
                : "/icons/tags/data_science.svg"
            }
            alt="Data Science"
            width={64}
            height={64}
            className="h-12 w-64"
          />
        </button>
        <button
          onClick={() => setSelectedField("machine learning")}
          onMouseEnter={() => setHoveredField("machine learning")}
          onMouseLeave={() => setHoveredField(null)}
          className="p-4"
        >
          <Image
            src={
              selectedField === "machine learning" ||
              hoveredField === "machine learning"
                ? "/icons/tags/machine_learning_clicked.svg"
                : "/icons/tags/machine_learning.svg"
            }
            alt="Machine Learning"
            width={64}
            height={64}
            className="h-12 w-64"
          />
        </button>
        <button
          onClick={() => setSelectedField("software engineering")}
          onMouseEnter={() => setHoveredField("software engineering")}
          onMouseLeave={() => setHoveredField(null)}
          className="p-4"
        >
          <Image
            src={
              selectedField === "software engineering" ||
              hoveredField === "software engineering"
                ? "/icons/tags/software_engineering_clicked.svg"
                : "/icons/tags/software_engineering.svg"
            }
            alt="Software Engineering"
            width={64}
            height={64}
            className="h-12 w-64"
          />
        </button>
        <button
          onClick={() => setSelectedField("UI/UX")}
          onMouseEnter={() => setHoveredField("UI/UX")}
          onMouseLeave={() => setHoveredField(null)}
          className="p-4"
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
            className="h-12 w-64"
          />
        </button>
      </div>

      {/* Projects Grid */}
      <div className="mt-8 px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg border-4 border-gray-800 bg-gray-300 p-6 shadow-lg"
            >
              <h3 className="font-comingSoon text-xl font-bold">
                {project.title} ({project.year})
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-comingSoon font-bold inline-block rounded-full border-2 border-gray-800 bg-transparent px-4 py-2 text-sm font-small text-gray-800 transition-all duration-200 hover:bg-[#FEDDC6] hover:text-gray-800"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              {/* Fancier Accordion for Description */}
              <div className="mt-4">
                <button
                  onClick={() => toggleDescription(project.id)}
                  className="flex items-center justify-between w-full p-3 font-medium text-left text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <span className="flex items-center font-singleDay">
                    <svg
                      className="w-5 h-5 mr-2 shrink-0"
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
                    {expandedDescriptions[project.id] ? "Hide Description" : "Show Description"}
                  </span>
                  <svg
                    className={`w-4 h-4 shrink-0 transition-transform ${
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
                  <div className="mt-2 p-4 bg-gray-100 rounded-lg">
                    <p className="font-singleDay text-gray-700">
                      {project.description}
                    </p>
                  </div>
                )}
              </div>
              <p className="mt-2 text-m text-gray-700 font-singleDay">
                <strong>Key Technologies:</strong> {project.key_tech.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
