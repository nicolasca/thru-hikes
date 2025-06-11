// components/HeroSection.tsx
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-center p-4">
      {/* Background Image with Overlay */}
      <Image
        src="/images/wilderness.jpg"
        alt="Dramatic long-distance trail scene"
        fill
        priority // Prioritize loading for LCP
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60"></div> {/* Dark overlay */}
      {/* Content: Your original structure with new text and enhanced styling */}
      <div className="relative z-10 text-white max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 drop-shadow-lg animate-fade-in-up">
          Your GPS Just Died. Good.
        </h1>
        <p className="text-xl md:text-2xl font-light mb-8 drop-shadow-md animate-fade-in-up animation-delay-300">
          Forget your comfort zone. Find out what you&apos;re really made of.{" "}
          <br className="hidden sm:inline" /> Or just look at pretty pictures.
        </p>
        {/* You can add a button here later if you want to scroll to the trails */}
        {/* <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
          Start Your Journey
        </Button> */}
      </div>
    </section>
  );
}
