"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const mx = useRef(0);
  const my = useRef(0);
  const rx = useRef(0);
  const ry = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
    };

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = mx.current + "px";
        cursorRef.current.style.top  = my.current + "px";
      }
      rx.current += (mx.current - rx.current) * 0.12;
      ry.current += (my.current - ry.current) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx.current + "px";
        ringRef.current.style.top  = ry.current + "px";
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const grow = () => {
      cursorRef.current?.classList.add("cursor-enlarged");
      ringRef.current?.classList.add("ring-enlarged");
    };
    const shrink = () => {
      cursorRef.current?.classList.remove("cursor-enlarged");
      ringRef.current?.classList.remove("ring-enlarged");
    };

    document.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);

    const targets = document.querySelectorAll<HTMLElement>(
      "a, button, .proj-card, .skill-card, .exp-item"
    );
    targets.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef}   className="cursor-ring" />
    </>
  );
}
