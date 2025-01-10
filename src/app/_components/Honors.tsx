"use client";
import React, { useEffect, useState } from "react";
import { Medal, Trophy } from "lucide-react";

type Item = {
  title: string;
  organization: string;
  date: string;
  description: string[];
};

type ResponseData = {
  honors: Item[];
  awards: Item[];
};

export default function HonorsAwardsSection() {
  const [honors, setHonors] = useState<Item[]>([]);
  const [awards, setAwards] = useState<Item[]>([]);
  const [activeTab, setActiveTab] = useState<"honors" | "awards">("honors");
  const [visibleCount, setVisibleCount] = useState(2); // Number of visible items
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/honors.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data: unknown) => {
        // Validate data structure
        if (
          typeof data === "object" &&
          data !== null &&
          Array.isArray((data as ResponseData).honors) &&
          Array.isArray((data as ResponseData).awards)
        ) {
          setHonors((data as ResponseData).honors);
          setAwards((data as ResponseData).awards);
        } else {
          throw new Error("Invalid data format");
        }
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 2);
  };

  if (loading) {
    return <div className="mt-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="mt-8 text-center text-red-500">Error: {error}</div>;
  }

  const items = activeTab === "honors" ? honors : awards;

  return (
    <section id="honors-awards" className="mt-20 bg-gray-100 py-12 pt-28 text-center">
      <h2 className="font-grace text-4xl font-bold text-blue-500">Honors & Awards</h2>

      {/* Tabs */}
      <div className="mt-8 inline-flex rounded-md shadow-sm" role="group">
        <button
          onClick={() => {
            setActiveTab("honors");
            setVisibleCount(2); // Reset visible count when switching tabs
          }}
          className={`rounded-s-md border-2 border-gray-900 px-4 py-2 font-comingSoon text-sm font-medium text-gray-900 transition-colors duration-200 ${
            activeTab === "honors"
              ? "bg-gray-900 text-white"
              : "bg-transparent hover:bg-gray-900 hover:text-white"
          } focus:ring-2 focus:ring-gray-500`}
        >
          Honors
        </button>
        <button
          onClick={() => {
            setActiveTab("awards");
            setVisibleCount(2); // Reset visible count when switching tabs
          }}
          className={`rounded-e-md border-2 border-gray-900 px-4 py-2 font-comingSoon text-sm font-medium text-gray-900 transition-colors duration-200 ${
            activeTab === "awards"
              ? "bg-gray-900 text-white"
              : "bg-transparent hover:bg-gray-900 hover:text-white"
          } focus:ring-2 focus:ring-gray-500`}
        >
          Awards
        </button>
      </div>

      {/* Timeline Container */}
      <div className="mx-auto mt-8 max-w-4xl px-4">
        <ol className="relative border-s-4 border-gray-900 dark:border-gray-700">
          {items.slice(0, visibleCount).map((item, index) => (
            <li key={index} className="mb-10 ms-6">
              {/* Date on the Left Side */}
              <time className="absolute -left-48 mt-2 font-singleDay text-xl font-normal leading-none text-gray-400 dark:text-gray-500">
                {item.date}
              </time>

              {/* Timeline Icon */}
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                {activeTab === "honors" ? (
                  <Medal className="h-4 w-4 text-blue-800 dark:text-blue-300" />
                ) : (
                  <Trophy className="h-4 w-4 text-blue-800 dark:text-blue-300" />
                )}
              </span>

              {/* Timeline Content */}
              <div className="ml-8">
                <h3 className="mb-1 text-left text-2xl font-comingSoon font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-left text-base font-singleDay text-xl font-normal text-gray-500 dark:text-gray-400">
                  {item.organization}
                </p>
                <ul className="mt-2 list-inside list-disc font-singleDay text-lg text-left text-gray-600">
                  {item.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        {/* Load More Button */}
        {visibleCount < items.length && (
          <button
            onClick={loadMore}
            className="mt-6 w-full rounded-full border-4 border-black px-6 py-2 font-singleDay text-lg font-bold text-black transition-all hover:border-gray-700 hover:text-gray-700"
          >
            Load More
          </button>
        )}
      </div>
    </section>
  );
}
