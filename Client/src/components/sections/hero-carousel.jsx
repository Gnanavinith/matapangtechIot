import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

const carouselData = [
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1c4ef999-e26e-49ca-963f-8e789d56b22c-matapangtech-com/assets/images/carousel-1-2.jpg",
    title: "Shaping the Future Now",
    subtitle: "",
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1c4ef999-e26e-49ca-963f-8e789d56b22c-matapangtech-com/assets/images/carousel-2-3.jpg",
    title: "The Future Starts Now",
    subtitle: "",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [isAnimating]);

  return (
    // ✅ Removed: pt-[90px] lg:pt-[135px] and bg-[#091E3E]
    // The header is absolute/fixed and overlays this section directly
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {carouselData.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out",
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Content — padded top so it clears the header */}
            <div className="relative z-20 container h-full flex items-center justify-center text-center mx-auto pt-[120px] lg:pt-[135px]">
              <div className="max-w-[950px] px-4">
                {slide.subtitle && (
                  <h5
                    className={cn(
                      "text-[#06a3da] uppercase mb-4 tracking-[0.3em] font-bold transition-all duration-1000 delay-300",
                      index === currentSlide ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
                    )}
                  >
                    {slide.subtitle}
                  </h5>
                )}

                <h1
                  className={cn(
                    "mb-10 transition-all duration-1000 delay-500 text-white font-extrabold",
                    index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  )}
                  style={{
                    fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
                    lineHeight: 1,
                    textShadow: "0 10px 30px rgba(0,0,0,0.8), 0 0 80px rgba(6, 163, 218, 0.2)",
                  }}
                >
                  {slide.title}
                </h1>

                <div
                  className={cn(
                    "flex flex-wrap items-center justify-center gap-6 transition-all duration-1000 delay-700",
                    index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  )}
                >
                  <a
                    href="#quote"
                    className="text-white px-[50px] py-[18px] font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-[#06a3da] hover:shadow-[0_0_20px_rgba(6,163,218,0.6)] rounded-sm"
                  >
                    For Demo
                  </a>
                  <Link
                    to="/contact"
                    className="bg-transparent border-2 border-white text-white px-[50px] py-[18px] font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-[#091e3e] flex items-center justify-center rounded-sm"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center text-white border border-white/30 rounded-sm hover:bg-[#06a3da] hover:border-[#06a3da] transition-colors focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft size={32} strokeWidth={1.5} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center text-white border border-white/30 rounded-sm hover:bg-[#06a3da] hover:border-[#06a3da] transition-colors focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight size={32} strokeWidth={1.5} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating) return;
              setIsAnimating(true);
              setCurrentSlide(index);
              setTimeout(() => setIsAnimating(false), 1000);
            }}
            className={cn(
              "h-3 rounded-full transition-all duration-300",
              currentSlide === index ? "bg-[#06a3da] w-8" : "bg-white/50 hover:bg-white w-3"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}