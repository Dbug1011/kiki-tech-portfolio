"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Soft glowing orb that trails the pointer.
 *
 * - Over anything marked `data-cursor="magnet"` (glass cards, the video,
 *   skill chips) it swells and is pulled part-way toward the element's
 *   centre, so it feels like it snaps to it.
 * - Over ordinary buttons/links it grows a little.
 * - It is purely decorative: the real cursor stays visible, it never
 *   intercepts clicks, and it only mounts for a fine pointer (mouse or
 *   trackpad) with motion allowed. Touch devices and reduced-motion users
 *   get nothing, and nothing is lost.
 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);
  const springX = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });
  const springScale = useSpring(scale, { stiffness: 300, damping: 22 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      setVisible(true);

      const target = event.target as Element | null;
      const magnet = target?.closest?.('[data-cursor="magnet"]');
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        // Pull 18% of the way toward the centre: noticeable, never sticky.
        x.set(event.clientX + (cx - event.clientX) * 0.18);
        y.set(event.clientY + (cy - event.clientY) * 0.18);
        scale.set(2.4);
        return;
      }

      x.set(event.clientX);
      y.set(event.clientY);
      scale.set(target?.closest?.("a, button, [role=tab], [role=switch]") ? 1.6 : 1);
    };
    const onLeave = () => setVisible(false);
    const onDown = () => scale.set(scale.get() * 0.8);
    const onUp = () => scale.set(scale.get() / 0.8);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, x, y, scale]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[10002] h-7 w-7 rounded-full mix-blend-screen"
      style={{
        x: springX,
        y: springY,
        scale: springScale,
        translateX: "-50%",
        translateY: "-50%",
        opacity: visible ? 1 : 0,
        background:
          "radial-gradient(circle, rgba(121,69,255,0.45) 0%, rgba(206,198,238,0.22) 45%, transparent 70%)",
        boxShadow: "0 0 24px 6px rgba(121,69,255,0.3)",
        transition: "opacity 200ms ease",
      }}
    />
  );
}
