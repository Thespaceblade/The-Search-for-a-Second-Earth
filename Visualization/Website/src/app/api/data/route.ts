import { NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

type PlanetRow = Record<string, string>;

export async function GET() {
  try {
    const csvPath = join(process.cwd(), 'public', 'data', 'rawdata.csv');
    const csv = readFileSync(csvPath, 'utf-8');
    const rows = parse(csv, { columns: true, skip_empty_lines: true, trim: true }) as PlanetRow[];
    const data = rows
      .map((r) => ({
        pl_name: r.pl_name ?? r.planet_name ?? r.name ?? '',
        pl_orbsmax: Number(r.pl_orbsmax ?? r.a ?? r.semimajor_axis ?? r['semi-major axis']),
        pl_insol: Number(r.pl_insol ?? r.insolation ?? r.flux ?? r['stellar flux']),
      }))
      .filter((d) => d.pl_name && Number.isFinite(d.pl_orbsmax) && Number.isFinite(d.pl_insol));
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Failed to load CSV' }, { status: 500 });
  }
}

