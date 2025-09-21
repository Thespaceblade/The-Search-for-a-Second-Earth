import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

type RuleRow = {
  variable: string;
  pass: number;
  fail: number;
};

type RuleTableProps = {
  rows: RuleRow[];
};

export function RuleTable({ rows }: RuleTableProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-300">
        We label each planet per variable using conservative thresholds; medians/percentiles are computed per planet when multiple rows exist.
      </p>
      <Table className="rounded-xl border border-white/10 bg-white/[0.03]">
        <TableHeader>
          <TableRow>
            <TableHead>Variable</TableHead>
            <TableHead className="text-right">Pass (True)</TableHead>
            <TableHead className="text-right">Fail (False)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.variable}>
              <TableCell className="font-medium text-white">{row.variable}</TableCell>
              <TableCell className="text-right font-semibold text-emerald-300">{row.pass}</TableCell>
              <TableCell className="text-right text-rose-300">{row.fail}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

