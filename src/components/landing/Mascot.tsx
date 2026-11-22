import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Mascot({ size = 180, onPoke }: { size?: number; onPoke?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const ex = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const ey = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const [pokes, setPokes] = useState(0);
  const [burst, setBurst] = useState(0);
  useEffect(() => {
    const h = (e: PointerEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.max(1, Math.hypot(dx, dy));
      ex.set((dx / d) * 5);
      ey.set((dy / d) * 5);
    };
    window.addEventListener("pointermove", h);
    return () => window.removeEventListener("pointermove", h);
  }, [ex, ey]);
  const poke = () => { setPokes((p) => p + 1); setBurst((b) => b + 1); onPoke?.(); };
  return (
    <div ref={ref} className="relative select-none" style={{ width: size, height: size }}>
      <motion.button
        type="button"
        aria-label="Dê um toque no rato"
        onClick={poke}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileTap={{ scale: 0.85, rotate: -8 }}
        className="h-full w-full cursor-pointer"
      >
        <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-[0_20px_40px_color-mix(in_oklab,var(--primary)_45%,transparent)]">
          <circle cx="50" cy="60" r="34" fill="var(--primary)" />
          <circle cx="150" cy="60" r="34" fill="var(--primary)" />
          <circle cx="50" cy="60" r="18" fill="var(--primary-glow)" />
          <circle cx="150" cy="60" r="18" fill="var(--primary-glow)" />
          <ellipse cx="100" cy="115" rx="68" ry="62" fill="var(--primary)" />
          <ellipse cx="100" cy="140" rx="36" ry="24" fill="var(--primary-glow)" />
          <circle cx="76" cy="105" r="15" fill="var(--foreground)" />
          <circle cx="124" cy="105" r="15" fill="var(--foreground)" />
          <motion.circle cx="76" cy="105" r="7" fill="var(--background)" style={{ x: ex, y: ey }} />
          <motion.circle cx="124" cy="105" r="7" fill="var(--background)" style={{ x: ex, y: ey }} />
          <ellipse cx="100" cy="132" rx="8" ry="6" fill="var(--background)" />
          <path d="M88 148 Q100 158 112 148" stroke="var(--background)" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      </motion.button>
      <AnimatePresence>
        {burst > 0 && (
          <motion.div key={burst} className="pointer-events-none absolute inset-0">
            {Array.from({ length: 14 }).map((_, i) => {
              const a = (i / 14) * Math.PI * 2;
              return (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-sm"
                  style={{ background: i % 3 === 0 ? "var(--accent)" : i % 3 === 1 ? "var(--primary-glow)" : "var(--primary)" }}
                  initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                  animate={{ x: Math.cos(a) * 120, y: Math.sin(a) * 120, opacity: 0, rotate: 360 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      {pokes > 0 && (
        <motion.div key={pokes} initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute -top-14 left-1/2 w-max max-w-[220px] -translate-x-1/2 rounded-2xl bg-foreground px-4 py-2 text-center text-sm font-bold text-background">
          {pokes < 3 ? "Ei! Bora escalar? 🐭" : pokes < 6 ? "Cada toque = 1 post que você não agendou 😅" : "Tá bom, tá bom… cria a conta! 🔥"}
        </motion.div>
      )}
    </div>
  );
}
