"use client";

import { MotionConfig } from "framer-motion";

// "user": when the OS asks for reduced motion, Framer drops transform animations
// but keeps opacity — fewer, gentler animations instead of none.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
