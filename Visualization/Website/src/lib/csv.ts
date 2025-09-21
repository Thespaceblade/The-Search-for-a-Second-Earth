import fs from "node:fs";
import path from "node:path";
import type { PlanetRawRow } from "../types/planets";

export function splitCSVLine(line: string): string[] {
  const parts = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
  return parts.map((s) => s.replace(/^"|"$/g, "").replace(/""/g, '"'));
}

export function readCSVRecords(filePath: string): PlanetRawRow[] {
  const raw = fs.readFileSync(filePath, "utf-8");
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];
  const headers = splitCSVLine(lines[0]);
  const records: PlanetRawRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = splitCSVLine(lines[i]);
    const row: PlanetRawRow = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = cols[j] ?? "";
    }
    records.push(row);
  }
  return records;
}

export function resolveSelectedCSV(): string | null {
  const candidates = [
    path.join(process.cwd(), "public", "data", "selected_planets_full.csv"),
    path.join(process.cwd(), "public", "selected_planets_full.csv"),
    path.join(process.cwd(), "selected_planets_full.csv"),
  ];
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) return p;
    } catch {}
  }
  return null;
}

