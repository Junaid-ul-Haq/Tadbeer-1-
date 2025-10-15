"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";
import "./globals.css";
import Navbar from "../app/components/layout/Navbar";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // ✅ Show navbar ONLY on landing page
  const showNavbar = pathname === "/";

  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        <Provider store={store}>
          {showNavbar && <Navbar />}
          {children}
        </Provider>
      </body>
    </html>
  );
}
