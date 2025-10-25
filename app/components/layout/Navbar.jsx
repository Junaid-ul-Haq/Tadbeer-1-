"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/slices/authSlice";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 
export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = !!user;

  const [isScrolled, setIsScrolled] = useState(false);
  const [topBarVisible, setTopBarVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setTopBarVisible(!(currentScrollY > lastScrollY && currentScrollY > 50));
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <>
      {/* 🔹 Top Contact Bar */}
      <div
        className={`bg-[var(--surface-color)] text-[var(--text-color)] font-poppins font-semibold text-sm sm:text-base 
        px-6 py-3 border-b border-white/10 backdrop-blur-md transition-all duration-500 ease-in-out
        ${topBarVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        fixed top-0 left-0 w-full z-[1000] shadow-[0_1px_10px_rgba(143,194,65,0.15)]`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-10">
          {/* Left: Contact Info */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-1">
            <div className="flex items-center gap-2 hover:text-[var(--primary-color)] transition-colors duration-300">
              <Mail className="w-5 h-5 text-[var(--primary-color)]" />
              <span>info@tadbeer.org</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[var(--primary-color)] transition-colors duration-300">
              <Phone className="w-5 h-5 text-[var(--primary-color)]" />
              <span>+92 300 1234567</span>
            </div>
            <div className="hidden md:flex items-center gap-2 hover:text-[var(--primary-color)] transition-colors duration-300">
              <MapPin className="w-5 h-5 text-[var(--primary-color)]" />
              <span>Lahore, Pakistan</span>
            </div>
          </div>

          {/* Right: Social Icons */}
         <div className="flex gap-5 items-center">
  {[
    { Icon: FaFacebook, link: "https://web.facebook.com/tadbeerofficial1" },
    { Icon: FaInstagram, link: "https://www.instagram.com/tadbeerofficial?fbclid=IwY2xjawNLDYpleHRuA2FlbQIxMABicmlkETA4bVFLeW5paHZYeHdVUmRLAR7hJvaG86pORayMMZe_8ZkoK0NS0Zi4MRwa2MFt6sznMnjeIp7ZhzLEdi4dfA_aem_AHhYs999ZunLiRTZvMYG_g" },
    { Icon: FaLinkedin, link: "https://www.linkedin.com/company/tadbeerofficial/?viewAsMember=true" },
   
        { Icon: FaXTwitter, link: "https://x.com/CentreTadb42387" }, // ✅ X icon
  ].map(({ Icon, link }, idx) => (
    <a
      key={idx}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-[var(--accent-color)] transition-all duration-300 transform hover:scale-110"
    >
      <Icon className="w-5 h-5" />
    </a>
  ))}
</div>

        </div>
      </div>

      {/* 🔹 Main Navbar */}
      <header
        className={`fixed w-full z-[999] transition-all duration-300 ${
          topBarVisible ? "top-10 md:top-10" : "top-0"
        } ${
          isScrolled
            ? "bg-[var(--surface-color)]/95 backdrop-blur-lg border-b border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
            : "bg-[var(--background-color)]/60 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 font-poppins">
          {/* ✅ Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-44 h-20 flex items-center justify-center">
              <Image
                src="/vedios/logo.jpg"
                alt="Tadbeer Logo"
                fill
                className="object-contain drop-shadow-[0_0_12px_rgba(143,194,65,0.4)] hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>
          </Link>

          {/* Menu Links */}
          <nav className="hidden md:flex items-center gap-10 text-[var(--text-color)] font-semibold text-lg">
            <Link
              href="/"
              className="relative group hover:text-[var(--accent-color)] transition-colors"
            >
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[var(--accent-color)] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-[var(--accent-color)] transition-colors text-lg">
                Services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mt-[2px] transition-transform duration-200 group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute left-0 mt-3 w-56 bg-[var(--surface-color)] border border-white/10 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {["Scholarships", "Grants", "Consultation"].map((item) => (
                  <Link
                    key={item}
                    href={`/user/${item.toLowerCase().replace(" ", "-")}`}
                    className="block px-6 py-3 text-base font-medium text-[var(--text-color)] hover:bg-[var(--accent-color)] hover:text-white transition-colors rounded-md"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className="relative group hover:text-[var(--accent-color)] transition-colors"
            >
              Contact
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[var(--accent-color)] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* ✅ Login / Logout */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2 border border-[var(--accent-color)] text-[var(--accent-color)] rounded-md 
                hover:bg-[var(--accent-color)] hover:text-white hover:shadow-[0_0_12px_rgba(24,186,214,0.5)] transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="px-5 py-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-md 
                hover:bg-[var(--primary-color)] hover:text-white hover:shadow-[0_0_12px_rgba(143,194,65,0.5)] transition-all duration-300"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
