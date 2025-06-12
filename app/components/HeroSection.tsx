import React, { useState, useEffect } from "react";

export default function ImmersiveHeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 w-full h-[120%]"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        {/* Replace src with your actual wilderness image */}
        <img
          src="/images/hero-bg.jpg"
          alt="Vast wilderness landscape"
          className={`w-full h-full object-cover transition-all duration-1000 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Subtle gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
              Your GPS Just Died.
            </span>
            <br />
            <span className="text-white/90 drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
              Good.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto animate-fade-in animation-delay-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Forget your comfort zone. Find out what you&apos;re really made of.
            <br className="hidden sm:inline" />
            Or just look at pretty pictures.
          </p>
        </div>
      </div>

      {/* Simple scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse">
        <div className="w-px h-12 bg-white/30" />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1.5s ease-out forwards;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </section>
  );
}
