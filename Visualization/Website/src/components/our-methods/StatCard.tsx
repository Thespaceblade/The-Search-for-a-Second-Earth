"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../components/ui/tooltip";
import { cn } from "../../lib/utils";
import { useSpotlight } from "./useSpotlight";

type StatCardProps = {
  name: string;
  code: string;
  description: string;
  units: string;
  range: string;
  rationale: string;
  className?: string;
};

export function StatCard({ name, code, description, units, range, rationale, className }: StatCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const { ref, handleMove, reset, style } = useSpotlight<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={style}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -3 }}
      transition={shouldReduceMotion ? undefined : { type: "spring", stiffness: 250, damping: 18 }}
      className={cn(
        "group relative h-full",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--x) var(--y), rgba(99,102,241,0.25), transparent 70%)",
        }}
      />
      <Card className="relative flex h-full flex-col justify-between overflow-hidden border-white/10 bg-white/[0.04] backdrop-blur-sm">
        <CardHeader className="space-y-3 pb-0">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <Badge className="bg-indigo-500/20 text-indigo-100">{code}</Badge>
          </div>
          <p className="text-sm leading-relaxed text-slate-300">{description}</p>
        </CardHeader>
        <CardContent className="mt-4 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-xs uppercase tracking-wide text-slate-400">Units</span>
              <Badge className="bg-white/10 text-white">{units}</Badge>
            </div>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex cursor-help items-center gap-2 text-slate-300">
                  <span className="text-xs uppercase tracking-wide text-slate-400">Range</span>
                  <Badge className="bg-indigo-500/20 text-indigo-100">{range}</Badge>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-justify" side="top">
                {rationale}
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
