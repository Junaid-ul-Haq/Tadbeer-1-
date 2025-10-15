"use client";

import Features from "./components/landing/Feature";
 import Hero from "./components/landing/Hero";
import About from "./components/landing/About";
import Testimonials from "./components/landing/Testimonials"
import Footer from "./components/landing/Footer";
// import Contact from "@/components/home/Contact";

export default function HomePage() {
  return (
  <div>
  {/* 🌟 1. Hero Section — First Impression */}
  <Hero />

  {/* 🏛️ 2. About Section — Who We Are */}
  <About />

  {/* 💚 3. Features / Impact Section — What We Do */}
  <Features />

  {/* 💬 4. Testimonials — Voices of Impact */}
  <Testimonials />

  {/* 📩 5. Footer — Quick Links, Tagline, Newsletter */}
  <Footer />
</div>

  );
}
