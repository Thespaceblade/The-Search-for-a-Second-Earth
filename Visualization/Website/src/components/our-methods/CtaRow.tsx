"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../components/ui/tooltip";
import { useSpotlight } from "./useSpotlight";
import { cn } from "../../lib/utils";

type CtaRowProps = {
  hasSelectedCsv: boolean;
  hasRawCsv: boolean;
};

export function CtaRow({ hasSelectedCsv, hasRawCsv }: CtaRowProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <HoverCard
        shouldReduceMotion={shouldReduceMotion}
        className="bg-gradient-to-br from-indigo-600/20 via-indigo-500/10 to-sky-500/5"
      >
        <CardContent className="flex h-full flex-col gap-6 pt-6">
          <div>
            <h3 className="text-xl font-semibold text-white">See the Featured Planets</h3>
            <p className="mt-2 text-sm text-slate-300">
              Explore the curated shortlist of worlds closest to Earth along with the generator-backed variations.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="ghost" className="border border-white/20 px-5 py-2">
              <Link href="/planets" prefetch={false}>
                Browse Featured Set
              </Link>
            </Button>
          </div>
        </CardContent>
      </HoverCard>

      <HoverCard shouldReduceMotion={shouldReduceMotion} className="bg-white/[0.03]">
        <CardContent className="flex h-full flex-col gap-6 pt-6">
          <div>
            <h3 className="text-xl font-semibold text-white">Download Methods &amp; Data</h3>
            <p className="mt-2 text-sm text-slate-300">
              Take the CSVs to validate our screening thresholds or feed your own visual experiments.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <DownloadButton
              href="/data/selected_planets_full.csv"
              label="Featured CSV"
              enabled={hasSelectedCsv}
            />
            <DownloadButton href="/data/rawdata.csv" label="Raw Archive" enabled={hasRawCsv} />
          </div>
        </CardContent>
      </HoverCard>
    </div>
  );
}

type HoverCardProps = {
  children: React.ReactNode;
  shouldReduceMotion: boolean | null;
  className?: string;
};

function HoverCard({ children, shouldReduceMotion, className }: HoverCardProps) {
  const { ref, handleMove, reset, style } = useSpotlight<HTMLDivElement>();
  const prefersReducedMotion = !!shouldReduceMotion;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={style}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.02, y: -3 }}
      transition={prefersReducedMotion ? undefined : { type: "spring", stiffness: 250, damping: 18 }}
      className="group relative"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--x) var(--y), rgba(56,189,248,0.2), transparent 70%)",
        }}
      />
      <Card className={cn("relative h-full border-white/10", className)}>{children}</Card>
    </motion.div>
  );
}

type DownloadButtonProps = {
  href: string;
  label: string;
  enabled: boolean;
};

function DownloadButton({ href, label, enabled }: DownloadButtonProps) {
  if (enabled) {
    return (
      <Button asChild variant="ghost" className="border border-white/20 px-5 py-2">
        <Link href={href} prefetch={false}>
          {label}
        </Link>
      </Button>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <span>
          <Button variant="ghost" className="border border-white/10 px-5 py-2 opacity-60" disabled>
            {label}
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent side="top">Add CSVs to /public/data</TooltipContent>
    </Tooltip>
  );
}
