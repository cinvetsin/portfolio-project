"use client";
import React, { useEffect, useState } from "react";
import { Medal, Trophy, Download } from "lucide-react";
import Carousel from "./Carousel";

type Item = {
  title: string;
  organization: string;
  date: string;
  description: string[];
  images?: string[];
  certificate?: string;
};

type ResponseData = {
  honors: Item[];
  awards: Item[];
};

export default function HonorsAwardsSection() {
  const [honors, setHonors] = useState<Item[]>([]);
  const [awards, setAwards] = useState<Item[]>([]);
  const [activeTab, setActiveTab] = useState<"honors" | "awards">("honors");
  const [visibleCount, setVisibleCount] = useState(2);
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
    <section
      id="honors"
      className="mt-20 bg-gray-100 py-4 pt-28 text-center dark:bg-gray-800"
    >
      <h2 className="font-grace text-4xl font-bold text-blue-500 dark:text-blue-300">
        Honors & Awards
      </h2>

      {/* Tabs */}
      <div className="mt-8 inline-flex rounded-md shadow-sm" role="group">
        <button
          onClick={() => {
            setActiveTab("honors");
            setVisibleCount(2);
          }}
          className={`rounded-s-md border-2 border-gray-900 dark:border-gray-700 px-4 py-2 font-comingSoon text-sm font-medium text-gray-900 dark:text-gray-300 transition-colors duration-200 ${
            activeTab === "honors"
              ? "bg-gray-900 text-white dark:bg-gray-700 dark:text-white"
              : "bg-transparent hover:bg-gray-900 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
          }`}
        >
          Honors
        </button>
        <button
          onClick={() => {
            setActiveTab("awards");
            setVisibleCount(2);
          }}
          className={`rounded-e-md border-2 border-gray-900 dark:border-gray-700 px-4 py-2 font-comingSoon text-sm font-medium text-gray-900 dark:text-gray-300 transition-colors duration-200 ${
            activeTab === "awards"
              ? "bg-gray-900 text-white dark:bg-gray-700 dark:text-white"
              : "bg-transparent hover:bg-gray-900 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
          }`}
        >
          Awards
        </button>
      </div>

      {/* Timeline */}
      <div className="mx-auto mt-8 max-w-full sm:max-w-4xl px-4">
        <ol className="relative ms-12 border-s-4 border-gray-900 dark:border-gray-700">
          {items.slice(0, visibleCount).map((item, index) => (
            <li key={index} className="mb-6 ms-6">
              <span className="absolute -left-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                {activeTab === "honors" ? (
                  <Medal className="h-4 w-4 text-blue-800 dark:text-blue-300" />
                ) : (
                  <Trophy className="h-4 w-4 text-blue-800 dark:text-blue-300" />
                )}
              </span>
              <div className="ml-8">
                <time className="block mb-1 text-left font-singleDay text-base font-normal text-gray-600 dark:text-gray-400">
                  {item.date}
                </time>
                <h3 className="mb-1 text-left font-comingSoon text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>
                <p className="text-left font-singleDay text-base font-normal text-gray-500 dark:text-gray-400">
                  {item.organization}
                </p>
                {item.description && (
                  <ul className="mt-2 list-inside list-disc text-left font-singleDay text-sm text-gray-600 dark:text-gray-300">
                    {item.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                )}
                {item.images && item.images.length > 0 && (
                  <Carousel images={item.images} />
                )}
                {item.certificate && (
                  <details className="mt-6">
                    <summary className="cursor-pointer text-left font-comingSoon font-bold text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500">
                      View Certificate
                    </summary>
                    <div className="mt-4 flex flex-col items-center">
                      <div className="w-full max-w-3xl overflow-hidden rounded-lg border border-gray-300 shadow-md dark:border-gray-700">
                        <iframe
                          src={`https://drive.google.com/file/d/${item.certificate}/preview`}
                          width="100%"
                          height="480"
                          className="rounded-lg"
                        ></iframe>
                      </div>
                      <a
                        href={`https://drive.google.com/uc?export=download&id=${item.certificate}`}
                        download
                        className="mt-4 flex items-center justify-center rounded-full bg-blue-500 px-6 py-2 font-comingSoon text-white transition-colors hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
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
        {visibleCount < items.length && (
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
