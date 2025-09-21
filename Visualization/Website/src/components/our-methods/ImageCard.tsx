"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { useSpotlight } from "./useSpotlight";

export type ImageCardHandle = {
  open: () => void;
};

type ImageCardProps = {
  src: string;
  alt: string;
  caption: string;
  annotation: string;
  className?: string;
};

export const ImageCard = React.forwardRef<ImageCardHandle, ImageCardProps>(
  ({ src, alt, caption, annotation, className }, externalRef) => {
  const shouldReduceMotion = useReducedMotion();
  const { ref: triggerRef, handleMove, reset, style } = useSpotlight<HTMLButtonElement>();
  const [open, setOpen] = React.useState(false);
  const closeRef = React.useRef<HTMLButtonElement | null>(null);
  const scrollingRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    return () => {
      if (scrollingRef.current) {
        document.body.style.overflow = scrollingRef.current.dataset.prevOverflow || "";
      }
    };
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (scrollingRef.current) scrollingRef.current.dataset.prevOverflow = previousOverflow;
    const id = window.requestAnimationFrame(() => {
      closeRef.current?.focus();
    });
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(id);
    };
  }, [open]);

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current && !open) {
      triggerRef.current?.focus();
    }
    prevOpen.current = open;
  }, [open, triggerRef]);

  React.useImperativeHandle(externalRef, () => ({ open: () => setOpen(true) }), []);

  return (
    <>
      <motion.button
        ref={triggerRef}
        type="button"
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onClick={() => setOpen(true)}
        style={style}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -3 }}
        transition={shouldReduceMotion ? undefined : { type: "spring", stiffness: 250, damping: 18 }}
        className={cn(
          "group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
          className,
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(320px circle at var(--x) var(--y), rgba(129,140,248,0.25), transparent 70%)",
          }}
        />
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="relative z-[1] px-4 py-3 text-sm font-medium text-slate-100">
          {caption}
        </div>
      </motion.button>

      {open ? (
        <div
          ref={scrollingRef}
          role="dialog"
          aria-modal="true"
          aria-label={caption}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-[90vw] max-w-3xl rounded-2xl border border-white/10 bg-[#0f1625] p-6 text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">{caption}</h2>
                <p className="mt-1 text-sm text-slate-300">{annotation}</p>
              </div>
              <Button
                ref={closeRef}
                variant="ghost"
                className="border border-white/10 px-3 py-1.5"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
            <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl border border-white/10">
              <Image src={src} alt={alt} fill className="object-contain" sizes="100vw" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
});

ImageCard.displayName = "ImageCard";
