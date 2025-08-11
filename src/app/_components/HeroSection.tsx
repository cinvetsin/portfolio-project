"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; // Import Image from next/image
import AnimatedText from "./AnimatedText";
import ContactSection from "./Contact"; // Import the ContactSection component

type Field = {
  field: string;
  synonyms: string[];
};

type SynonymResponse = {
  meanings: {
    synonyms?: string[] | null;
  }[];
};

export default function HeroSection() {
  const fields: Field[] = [
    { field: "Data Science", synonyms: [] },
    { field: "Machine Learning", synonyms: [] },
    { field: "Software Engineering", synonyms: [] },
    { field: "AI", synonyms: [] },
    { field: "Computer Vision", synonyms: [] },
    { field: "Natural Language Processing", synonyms: [] },
  ];

  const [enthusiastSynonyms, setEnthusiastSynonyms] = useState<string[]>([]);

  useEffect(() => {
    const fetchEnthusiastSynonyms = async () => {
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/enthusiast`,
        );

        if (!response.ok) {
          console.error("Failed to fetch synonyms for 'Enthusiast'");
          return;
        }

        // Explicitly type the parsed JSON
        const data = (await response.json()) as SynonymResponse[];
        const synonyms: string[] = data
          .flatMap((entry) =>
            entry.meanings.flatMap((meaning) => meaning.synonyms ?? []),
          )
          .filter((synonym): synonym is string => typeof synonym === "string");

        setEnthusiastSynonyms(synonyms);
      } catch (error) {
        console.error("Error fetching synonyms for 'Enthusiast':", error);
      }
    };

    void fetchEnthusiastSynonyms();
  }, []);

  return (
    <section
      id="home"
      className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8 pt-28 dark:bg-gray-800 md:flex-row"
    >
      {/* Left Side: Image */}
      <div className="order-1 flex w-full justify-center md:order-2 md:w-1/2">
        <Image
          src="/images/profile_picture_3.svg"
          alt="Profile Picture"
          width={288}
          height={288}
        />
      </div>

      {/* Right Side: Text */}
      <div className="order-2 mt-8 w-full text-center md:order-1 md:mt-0 md:w-1/2 md:text-right">
        <h1 className="font-grace text-4xl font-bold text-blue-500 dark:text-blue-400">
          Hello!!!
        </h1>
        <p className="mt-4 font-comingSoon text-4xl dark:text-white">
          I&apos;m Sasha Nabila Fortuna
        </p>
        <AnimatedText fields={fields} enthusiastSynonyms={enthusiastSynonyms} />
        <p className="mt-8 font-singleDay text-xl text-gray-600 dark:text-gray-300">
          &quot;Recent computer science graduate with experience in machine
          learning, software development, and data analysis. Proficient in
          Python, Java, and JavaScript, with skills in TensorFlow, Next.js, and
          React. Solid foundation in data mining and software engineering,
          seeking to contribute to impactful projects in Business Intelligence,
          Data Science, or Software Engineering.&quot;
        </p>
        <ContactSection />
      </div>
    </section>
  );
}
