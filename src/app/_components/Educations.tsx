"use client";
import React, { useEffect, useState } from "react";
import { School, GraduationCap, Download } from "lucide-react";

type Education = {
  title: string;
  organization: string;
  duration: string;
  description: (string | string[])[];
  type: "formal" | "nonformal";
  certificate?: string; // URL to the certificate
};

export default function EducationSection() {
  const [education, setEducation] = useState<Education[]>([]);
  const [filteredEducation, setFilteredEducation] = useState<Education[]>([]);
  const [visibleCount, setVisibleCount] = useState(2); // Number of visible sections
  const [activeFilter, setActiveFilter] = useState<"formal" | "nonformal">(
    "formal"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/educations.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data: Education[]) => {
        setEducation(data);
        setFilteredEducation(data.filter((edu) => edu.type === "formal"));
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filterEducation = (type: "formal" | "nonformal") => {
    setActiveFilter(type);
    const filtered = education.filter((edu) => edu.type === type);
    setFilteredEducation(filtered);
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
    <section
      id="education"
      className="mt-20 bg-gray-100 py-4 pt-28 text-center dark:bg-gray-800"
    >
      <h2 className="font-grace text-4xl font-bold text-blue-500 dark:text-blue-300">
        Education
      </h2>

      {/* Filter Buttons */}
      <div className="mt-8 inline-flex rounded-md shadow-sm" role="group">
        <button
          onClick={() => filterEducation("formal")}
          className={`rounded-s-md border-2 border-gray-900 dark:border-gray-700 px-4 py-2 font-comingSoon text-sm font-medium text-gray-900 dark:text-gray-300 transition-colors duration-200 ${
            activeFilter === "formal"
              ? "bg-gray-900 text-white dark:bg-gray-700 dark:text-white"
              : "bg-transparent hover:bg-gray-900 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
          } focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-500`}
        >
          Formal
        </button>
        <button
          onClick={() => filterEducation("nonformal")}
          className={`rounded-e-md border-2 border-gray-900 dark:border-gray-700 px-4 py-2 font-comingSoon text-sm font-medium text-gray-900 dark:text-gray-300 transition-colors duration-200 ${
            activeFilter === "nonformal"
              ? "bg-gray-900 text-white dark:bg-gray-700 dark:text-white"
              : "bg-transparent hover:bg-gray-900 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
          } focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-500`}
        >
          Non-formal
        </button>
      </div>

      {/* Timeline Container */}
      <div className="mx-auto mt-8 max-w-4xl px-4">
        <ol className="relative ms-12 border-s-4 border-gray-900 dark:border-gray-700">
          {filteredEducation.slice(0, visibleCount).map((edu, index) => (
            <li key={index} className="mb-6 ms-6">
              {/* Timeline Icon */}
              <span className="absolute -left-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                {edu.type === "formal" ? (
                  <GraduationCap className="h-4 w-4 text-blue-800 dark:text-blue-300" />
                ) : (
                  <School className="h-4 w-4 text-blue-800 dark:text-blue-300" />
                )}
              </span>

              {/* Timeline Content */}
              <div className="ml-8">
                <time className="block mb-1 text-left font-singleDay text-base font-normal text-gray-600 dark:text-gray-400">
                  {edu.duration}
                </time>
                <h3 className="mb-1 text-left font-comingSoon text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {edu.title}
                </h3>
                <p className="text-left font-singleDay text-base font-normal text-gray-500 dark:text-gray-400">
                  {edu.organization}
                </p>
                <ul className="mt-2 list-inside list-disc text-left font-singleDay text-sm text-gray-600 dark:text-gray-300">
                  {edu.description.map((item, i) =>
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
                    )
                  )}
                </ul>

                {/* Certificate */}
                {edu.certificate && (
                  <details className="mt-6">
                    <summary className="cursor-pointer text-left font-comingSoon font-bold text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500">
                      View Certificate
                    </summary>
                    <div className="mt-4 flex flex-col items-center">
                      <div className="w-full max-w-3xl overflow-hidden rounded-lg border border-gray-300 shadow-md dark:border-gray-700">
                        <iframe
                          src={`https://drive.google.com/file/d/${edu.certificate}/preview`}
                          width="100%"
                          height="480"
                          allow="autoplay"
                          className="rounded-lg"
                        ></iframe>
                      </div>

                      <a
                        href={`https://drive.google.com/uc?export=download&id=${edu.certificate}`}
                        download
                        className="mt-4 flex items-center justify-center rounded-full bg-blue-500 px-6 py-2 font-comingSoon text-white transition-colors hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500"
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

        {visibleCount < filteredEducation.length && (
          <button
            onClick={loadMore}
            className="mt-6 w-full rounded-full border-4 border-black px-6 py-2 font-singleDay text-lg font-bold text-black transition-all hover:border-gray-700 hover:text-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white"
          >
            Load More
          </button>
        )}
      </div>
    </section>
  );
}
