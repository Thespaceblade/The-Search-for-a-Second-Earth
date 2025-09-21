"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { ImageCard, ImageCardHandle } from "./ImageCard";

type ChartCardProps = {
  src: string;
  alt: string;
  caption: string;
  annotation: string;
};

export function ChartCard({ src, alt, caption, annotation }: ChartCardProps) {
  const cardRef = React.useRef<ImageCardHandle>(null);

  return (
    <div className="space-y-3">
      <ImageCard ref={cardRef} src={src} alt={alt} caption={caption} annotation={annotation} />
      <Button
        variant="ghost"
        className="w-full border border-white/15 px-4 py-2 text-sm font-medium"
        onClick={() => cardRef.current?.open()}
      >
        View {caption}
      </Button>
    </div>
  );
}

