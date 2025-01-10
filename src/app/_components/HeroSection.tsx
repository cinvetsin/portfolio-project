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
            entry.meanings.flatMap((meaning) => meaning.synonyms ?? [])
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
      className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8 md:flex-row"
    >
      <div className="mt-8 text-center md:mt-0 md:w-1/2 md:text-right">
        <h1 className="font-grace text-4xl font-bold text-blue-500">
          Hello!!!
        </h1>
        <p className="mt-4 font-comingSoon text-4xl">
          I&apos;m Sasha Nabila Fortuna
        </p>
        <AnimatedText fields={fields} enthusiastSynonyms={enthusiastSynonyms} />
        <p className="mt-8 font-singleDay text-xl text-gray-600">
          &quot;Computer Science student at Universitas Indonesia with strong
          academics and a passion for data science and software development.
          Experienced teaching assistant, IT developer intern, and Research
          Analyst, skilled in Python, TensorFlow, and Flutter. Proficient in
          data analysis, project management, and team leadership, ready to drive
          innovation in tech environments.&quot;
        </p>
        <ContactSection /> {/* Add the ContactSection component here */}
      </div>

      <div className="flex justify-center md:w-1/2">
        <Image
          src="/images/profile_picture_2.svg"
          alt="Profile Picture"
          width={288} // Adjusted dimensions
          height={288}
        />
      </div>
    </section>
  );
}
