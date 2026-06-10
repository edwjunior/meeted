"use client";

import { useState } from "react";

const links = ["About", "Work", "Personal", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#07091c]/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-tight text-white">
          Eduard<span className="text-[#2d5ec8]">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-[#8090b8] hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:edupuigjunior.6@gmail.com"
          className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#c91029] hover:bg-[#ab0d22] text-white text-sm font-semibold rounded transition-colors duration-200 cursor-pointer"
        >
          Hire Me
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-[#8090b8] hover:text-white transition-colors cursor-pointer"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#07091c] px-6 py-5 space-y-4">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="block text-[#8090b8] hover:text-white transition-colors cursor-pointer py-1"
            >
              {link}
            </a>
          ))}
          <a
            href="mailto:edupuigjunior.6@gmail.com"
            className="inline-flex items-center mt-2 px-5 py-2.5 bg-[#c91029] hover:bg-[#ab0d22] text-white text-sm font-semibold rounded transition-colors cursor-pointer"
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
}
