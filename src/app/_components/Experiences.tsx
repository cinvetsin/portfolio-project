"use client";
import React, { useEffect, useState } from "react";
import { BriefcaseBusiness, HandHeart, Download } from "lucide-react";
import Carousel from "./Carousel";

type Experience = {
  title: string;
  organization: string;
  duration: string;
  description: string[];
  type: "work" | "volunteering";
  image?: string[];
  certificate?: string; // URL to the PDF certificate (Google Drive preview link)
};

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>(
    [],
  );
  const [visibleCount, setVisibleCount] = useState(2); // Number of visible sections
  const [activeFilter, setActiveFilter] = useState<"work" | "volunteering">(
    "work",
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/experiences.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data: Experience[]) => {
        setExperiences(data);
        setFilteredExperiences(data.filter((exp) => exp.type === "work"));
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filterExperiences = (type: "work" | "volunteering") => {
    setActiveFilter(type);
    const filtered = experiences.filter((exp) => exp.type === type);
    setFilteredExperiences(filtered);
    setVisibleCount(2); // Reset visible count when switching filters
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 2);
  };

  if (loading) {
    return <div className="mt-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="mt-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <section id="experiences" className="mt-20 bg-gray-100 py-12 text-center pt-28">
      <h2 className="font-grace text-4xl font-bold text-blue-500">
        Experience
      </h2>

      {/* Filter Buttons */}
      <div className="mt-8 inline-flex rounded-md shadow-sm" role="group">
        <button
          onClick={() => filterExperiences("work")}
          className={`rounded-s-md border-2 border-gray-900 px-4 py-2 font-comingSoon text-sm font-medium text-gray-900 transition-colors duration-200 ${
            activeFilter === "work"
              ? "bg-gray-900 text-white"
              : "bg-transparent hover:bg-gray-900 hover:text-white"
          } focus:ring-2 focus:ring-gray-500`}
        >
          Work
        </button>
        <button
          onClick={() => filterExperiences("volunteering")}
          className={`rounded-e-md border-2 border-gray-900 px-4 py-2 font-comingSoon text-sm font-medium text-gray-900 transition-colors duration-200 ${
            activeFilter === "volunteering"
              ? "bg-gray-900 text-white"
              : "bg-transparent hover:bg-gray-900 hover:text-white"
          } focus:ring-2 focus:ring-gray-500`}
        >
          Volunteering
        </button>
      </div>

      {/* Timeline Container */}
      <div className="mx-auto mt-8 max-w-4xl px-4">
        <ol className="relative border-s-4 border-gray-900 dark:border-gray-700">
          {filteredExperiences
            .slice(0, visibleCount)
            .map((experience, index) => (
              <li key={index} className="mb-10 ms-6">
                {/* Duration on the Left Side */}
                <time className="absolute -start-48 mt-2 font-singleDay text-xl font-normal leading-none text-gray-600 dark:text-gray-500">
                  {experience.duration}
                </time>

                {/* Timeline Icon */}
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                  {experience.type === "work" ? (
                    <BriefcaseBusiness className="h-4 w-4 text-blue-800 dark:text-blue-300" />
                  ) : (
                    <HandHeart className="h-4 w-4 text-blue-800 dark:text-blue-300" />
                  )}
                </span>

                {/* Timeline Content */}
                <div className="ml-8">
                  <h3 className="mb-1 text-left font-comingSoon text-2xl font-semibold text-gray-900 dark:text-white">
                    {experience.title}
                  </h3>
                  <p className="text-left font-singleDay text-xl font-normal text-gray-500 dark:text-gray-400">
                    {experience.organization}
                  </p>
                  <ul className="mt-2 list-inside list-disc font-singleDay text-lg text-left text-gray-600">
                    {experience.description.map((item, i) =>
                      Array.isArray(item) ? (
                        <ul
                          key={i}
                          className="mt-2 list-inside list-[circle] pl-6"
                        >
                          {item.map((subItem, j) => (
                            <li key={j}>{subItem}</li>
                          ))}
                        </ul>
                      ) : (
                        <li key={i}>{item}</li>
                      ),
                    )}
                  </ul>

                  {/* Carousel for images */}
                  {experience.image && experience.image.length > 0 && (
                    <Carousel images={experience.image} />
                  )}

                  {/* Accordion for Certificate */}
                  {experience.certificate && (
                    <details className="mt-6">
                      <summary className="cursor-pointer text-left font-comingSoon font-bold text-blue-500 hover:text-blue-700">
                        View Certificate
                      </summary>
                      <div className="mt-4 flex flex-col items-center">
                        {/* Embed Google Drive PDF preview */}
                        <div className="w-full max-w-3xl overflow-hidden rounded-lg border border-gray-300 shadow-md">
                          <iframe
                            src={`https://drive.google.com/file/d/${experience.certificate}/preview`}
                            width="100%"
                            height="480"
                            allow="autoplay"
                            className="rounded-lg"
                          ></iframe>
                        </div>

                        {/* Download Button */}
                        <a
                          href={`https://drive.google.com/uc?export=download&id=${experience.certificate}`}
                          download
                          className="mt-4 flex items-center justify-center rounded-full bg-blue-500 px-6 py-2 font-comingSoon text-white transition-colors hover:bg-blue-700"
                        >
                          <Download className="mr-2 h-5 w-5" />
                          Download Certificate
                        </a>
                      </div>
                    </details>
                  )}
                </div>
              </li>
            ))}
        </ol>
        {/* Load More Button */}
        {visibleCount < filteredExperiences.length && (
          <button
            onClick={loadMore}
            className="mt-6 w-full rounded-full border-4 border-black px-6 py-2 font-comingSoon font-bold text-black transition-all hover:border-gray-700 hover:text-gray-700"
          >
            Load More
          </button>
        )}
      </div>
    </section>
  );
}
