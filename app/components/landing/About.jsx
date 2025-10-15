"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaHandsHelping,
  FaEye,
  FaHeart,
  FaGlobeAsia,
  FaGraduationCap,
  FaUsers,
  FaPeopleCarry,
  FaQuoteLeft,
} from "react-icons/fa";

const CountUp = dynamic(() => import("react-countup"), { ssr: false });

function ClientCountUp({ number, suffix, icon, title }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col items-center text-center">
      {icon}
      {mounted && (
        <CountUp
          start={0}
          end={number}
          duration={2.5}
          enableScrollSpy
          suffix={suffix}
          className="text-4xl md:text-5xl font-bold text-[var(--primary-color)] drop-shadow-[0_0_12px_rgba(143,194,65,0.7)]"
        />
      )}
      <p className="text-gray-300 mt-3 text-base md:text-lg font-medium">
        {title}
      </p>
    </div>
  );
}

export default function AboutUs() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const missionVisionValues = [
    {
      title: "Our Mission",
      icon: (
        <FaHandsHelping className="text-4xl md:text-5xl text-[var(--primary-color)] mb-4 drop-shadow-[0_0_12px_rgba(143,194,65,0.7)]" />
      ),
      desc: "Empowering communities through education, healthcare, and sustainable initiatives that build brighter futures.",
    },
    {
      title: "Our Vision",
      icon: (
        <FaEye className="text-4xl md:text-5xl text-[var(--accent-color)] mb-4 drop-shadow-[0_0_10px_rgba(24,186,214,0.7)]" />
      ),
      desc: "A world where every individual lives with dignity, knowledge, and opportunity — a future built on compassion and equity.",
    },
    {
      title: "Our Values",
      icon: (
        <FaHeart className="text-4xl md:text-5xl text-red-400 mb-4 drop-shadow-[0_0_12px_rgba(255,80,80,0.7)]" />
      ),
      desc: "Integrity, compassion, and empowerment guide every action we take in our mission to serve humanity.",
    },
  ];

  const impactData = [
    {
      title: "Lives Impacted",
      icon: (
        <FaGlobeAsia className="text-4xl md:text-5xl text-[var(--accent-color)] mb-3" />
      ),
      number: 10000,
      suffix: "+",
    },
    {
      title: "Scholarships Awarded",
      icon: (
        <FaGraduationCap className="text-4xl md:text-5xl text-[var(--primary-color)] mb-3" />
      ),
      number: 500,
      suffix: "+",
    },
    {
      title: "Communities Served",
      icon: (
        <FaUsers className="text-4xl md:text-5xl text-[#36b37e] mb-3" />
      ),
      number: 120,
      suffix: "+",
    },
    {
      title: "Active Volunteers",
      icon: (
        <FaPeopleCarry className="text-4xl md:text-5xl text-[var(--accent-color)] mb-3" />
      ),
      number: 200,
      suffix: "+",
    },
  ];

  const journeyData = [
    {
      year: "2015",
      text: "Founded Tadbeer to provide equitable education and empowerment opportunities.",
    },
    {
      year: "2018",
      text: "Expanded to healthcare and women empowerment initiatives across regions.",
    },
    {
      year: "2022",
      text: "Reached over 10,000 lives through education, healthcare, and community programs.",
    },
  ];

  return (
    <section
      id="aboutus"
      className="relative bg-gradient-to-b from-[#0B0B0B] via-[#0F0F0F] to-[#151515] text-white py-20 px-6 md:px-16 font-[var(--font-family)] overflow-hidden"
    >
      {/* 🔹 Background Glow Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[var(--primary-color)]/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[var(--accent-color)]/20 blur-[120px] rounded-full"></div>

      {/* 🔹 Section Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center mb-20 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary-color)] drop-shadow-[0_0_15px_rgba(143,194,65,0.6)] mb-4">
          About Tadbeer
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Guided by compassion, driven by impact — we bridge hope and
          opportunity.
        </p>
      </motion.div>

      {/* 🔹 Mission / Vision / Values */}
      <div className="grid md:grid-cols-3 gap-10 mb-24">
        {missionVisionValues.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="p-10 text-center bg-[#1A1A1A]/90 border border-white/10 rounded-2xl shadow-[0_0_20px_rgba(143,194,65,0.15)] backdrop-blur-md transition-transform duration-300"
          >
            {item.icon}
            <h3 className="text-2xl md:text-3xl font-semibold text-[var(--primary-color)] mb-3">
              {item.title}
            </h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 🔹 Journey Timeline */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-24 max-w-3xl mx-auto"
      >
        <h3 className="text-3xl md:text-4xl font-semibold text-center text-[var(--accent-color)] drop-shadow-[0_0_15px_rgba(24,186,214,0.6)] mb-12">
          Our Journey
        </h3>
        <div className="relative border-l-4 border-[var(--accent-color)]/60 pl-8 space-y-10">
          {journeyData.map((event, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative bg-[#101010]/80 border border-white/10 rounded-xl p-6 shadow-md hover:shadow-[0_0_20px_rgba(24,186,214,0.25)] transition"
            >
              <div className="absolute -left-5 top-6 w-4 h-4 rounded-full bg-[var(--accent-color)] border-2 border-white animate-pulse"></div>
              <h4 className="text-lg md:text-xl font-semibold text-[var(--primary-color)]">
                {event.year}
              </h4>
              <p className="text-gray-300 text-base md:text-lg mt-2">
                {event.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 🔹 Founder Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center gap-10 bg-[#101010]/90 border border-white/10 rounded-2xl p-10 md:p-16 shadow-[0_0_25px_rgba(143,194,65,0.15)] mb-20 backdrop-blur-lg"
      >
        <div className="w-full md:w-1/3 flex justify-center">
          <Image
            src="/vedios/abc.jpeg"
            alt="Founder"
            width={400}
            height={400}
            className="rounded-2xl object-cover shadow-[0_0_30px_rgba(143,194,65,0.25)]"
          />
        </div>
        <div className="w-full md:w-2/3 text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-semibold text-[var(--primary-color)] mb-2">
            Salimah Khanum
          </h3>
          <p className="text-gray-400 mb-3 text-sm md:text-base">
            Founder & Director, Tadbeer Organization
          </p>
          <p className="text-gray-300 leading-relaxed italic md:text-lg">
            “Education is not charity — it’s empowerment. Our mission is to
            foster self-reliance and dignity through sustainable initiatives
            that uplift lives.”
          </p>
        </div>
      </motion.div>

      {/* 🔹 Impact Metrics */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <h3 className="text-3xl md:text-4xl font-semibold text-[var(--accent-color)] drop-shadow-[0_0_15px_rgba(24,186,214,0.6)] mb-12">
          Our Global Impact
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impactData.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-10 bg-[#1A1A1A]/90 rounded-2xl shadow-[0_0_15px_rgba(143,194,65,0.15)] border border-white/10 backdrop-blur-md"
            >
              <ClientCountUp
                number={item.number}
                suffix={item.suffix}
                icon={item.icon}
                title={item.title}
              />
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <div className="relative bg-[#111]/90 border border-white/10 rounded-2xl shadow-[0_0_25px_rgba(24,186,214,0.15)] p-10 md:p-12 max-w-4xl mx-auto backdrop-blur-md">
          <FaQuoteLeft className="text-[var(--accent-color)] text-3xl mb-3 mx-auto" />
          <p className="text-gray-300 italic text-lg md:text-xl leading-relaxed">
            “Our mission is rooted in humanity — to light the path of
            opportunity, dignity, and empowerment for every life we touch.”
          </p>
          <p className="mt-4 text-[var(--primary-color)] font-semibold">
            — Tadbeer Foundation
          </p>
        </div>
      </motion.div>
    </section>
  );
}
