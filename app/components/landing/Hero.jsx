"use client";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] md:h-screen w-full overflow-hidden"
    >
      {/* 🔹 Clear Full Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center mx-auto"
        style={{
          backgroundImage: "url('/vedios/banner.jpg')",
        }}
      ></div>
    </section>
  );
}
