"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Field = {
  field: string;
  synonyms: string[];
};

type AnimatedTextProps = {
  fields: Field[];
  enthusiastSynonyms: string[];
};

export default function AnimatedText({
  fields,
  enthusiastSynonyms,
}: AnimatedTextProps) {
  const [currentField, setCurrentField] = useState("");
  const [currentSynonym, setCurrentSynonym] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const selectRandomFieldAndSynonym = useCallback(() => {
    if (!fields.length || !enthusiastSynonyms.length) return;

    const randomField = fields[Math.floor(Math.random() * fields.length)]!;
    const randomSynonym =
      enthusiastSynonyms[
        Math.floor(Math.random() * enthusiastSynonyms.length)
      ] ?? "Enthusiast";

    setCurrentField(randomField.field);
    setCurrentSynonym(randomSynonym);
    setTypingIndex(0);
    setDisplayText("");
    setIsTyping(true);
  }, [fields, enthusiastSynonyms]);

  useEffect(() => {
    if (enthusiastSynonyms.length > 0 && fields.length > 0 && !currentField) {
      selectRandomFieldAndSynonym();
    }
  }, [enthusiastSynonyms, fields, currentField, selectRandomFieldAndSynonym]);

  useEffect(() => {
    if (!currentField || !currentSynonym) return;

    const fullText = `${currentField} ${currentSynonym}`;

    if (isTyping) {
      if (typingIndex < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev + fullText[typingIndex]);
          setTypingIndex((prev) => prev + 1);
        }, 100);

        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);

        return () => clearTimeout(timeout);
      }
    } else {
      if (typingIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
          setTypingIndex((prev) => prev - 1);
        }, 50);

        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          selectRandomFieldAndSynonym();
        }, 1000);

        return () => clearTimeout(timeout);
      }
    }
  }, [
    typingIndex,
    currentField,
    currentSynonym,
    isTyping,
    selectRandomFieldAndSynonym,
  ]);

  return (
    <div className="mt-2 h-8">
      <AnimatePresence mode="wait">
        <motion.p
          key={`${currentField}-${currentSynonym}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="font-comingSoon text-2xl font-semibold text-gray-400"
        >
          {displayText}
          <span className="animate-blink">|</span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
