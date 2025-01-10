import React, { useState, useEffect } from "react";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageDimensions, setImageDimensions] = useState<
    { width: number; height: number }[]
  >([]);

  useEffect(() => {
    const loadDimensions = async () => {
      const dimensions = await Promise.all(
        images.map(
          (img) =>
            new Promise<{ width: number; height: number }>((resolve) => {
              const image = new Image();
              image.onload = () => {
                resolve({ width: image.width, height: image.height });
              };
              image.src = img;
            }),
        ),
      );
      setImageDimensions(dimensions);
    };

    void loadDimensions(); // Explicitly mark promise as ignored
  }, [images]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  return (
    <div className="relative mt-4 w-2/3">
      {/* Carousel Wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {images.map((img, idx) => {
          const { width, height } = imageDimensions[idx] ?? { width: 1, height: 1 }; // Use ?? for safer fallback
          const isPortrait = height > width;

          return (
            <div
              key={idx}
              className={`absolute flex h-full w-full items-center bg-black justify-center transition-opacity duration-700 ease-in-out ${
                currentIndex === idx ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={img}
                className="max-h-full max-w-full object-contain"
                alt={`Slide ${idx + 1}`}
              />
            </div>
          );
        })}
      </div>

      {/* Slider Controls */}
      <button
        type="button"
        className="group absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        onClick={prevSlide}
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
          <svg
            className="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1L1 5l4 4"
            />
          </svg>
        </span>
      </button>
      <button
        type="button"
        className="group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
          <svg
            className="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l4 4-4 4"
            />
          </svg>
        </span>
      </button>

      {/* Dots for carousel */}
      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`h-3 w-3 rounded-full ${
              currentIndex === idx ? "bg-blue-800" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(idx)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
