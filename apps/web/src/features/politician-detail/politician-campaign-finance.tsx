import { AlertTriangle, BarChart3 } from "lucide-react";
import type { FC } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type {
  IncomeExpenditureEntry,
  SpendingBreakdownEntry,
} from "@/features/politician-detail/types";

interface PoliticianCampaignFinanceProps {
  incomeExpenditure: IncomeExpenditureEntry[];
  spendingBreakdown: SpendingBreakdownEntry[];
}

export const PoliticianCampaignFinance: FC<PoliticianCampaignFinanceProps> = ({
  incomeExpenditure,
  spendingBreakdown,
}) => {
  const totalIncome = incomeExpenditure.reduce((s, r) => s + r.income, 0);
  const totalExpenditure = incomeExpenditure.reduce((s, r) => s + r.expenditure, 0);
  const overspendQuarters = incomeExpenditure.filter((r) => r.expenditure > r.income);
  const hasOverspend = overspendQuarters.length > 0;

  return (
    <div>
      <SectionLabel icon={<BarChart3 className="w-4 h-4" />} label="Campaign Finance" />

      {/* Summary stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 mb-1">
        <StatCard
          label="Total Declared Income"
          value={`KES ${(totalIncome / 1_000_000).toFixed(1)}M`}
          sub="2022 Campaign Period"
        />
        <StatCard
          label="Total Expenditure"
          value={`KES ${(totalExpenditure / 1_000_000).toFixed(1)}M`}
          sub="2022 Campaign Period"
          flagged={totalExpenditure > totalIncome}
        />
        <StatCard
          label="Overspend Quarters"
          value={
            hasOverspend ? `${overspendQuarters.length} of ${incomeExpenditure.length}` : "None"
          }
          sub="Expenditure exceeded income"
          flagged={hasOverspend}
          className="col-span-2 sm:col-span-1"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <div className="border border-border bg-card p-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4">
            Income vs Expenditure
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={incomeExpenditure} barGap={2}>
              <XAxis dataKey="period" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis
                tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`}
                tick={{ fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={45}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 11,
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                  borderRadius: 0,
                }}
              />
              <Bar dataKey="income" name="Income" fill="#006600" radius={0} />
              <Bar dataKey="expenditure" name="Expenditure" fill="#BB0000" radius={0} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2">
            <LegendDot color="#006600" label="Income" />
            <LegendDot color="#BB0000" label="Expenditure" />
          </div>
        </div>

        <div className="border border-border bg-card p-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4">
            Spending Breakdown
          </p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie
                  data={spendingBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {spendingBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-1.5">
              {spendingBreakdown.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 shrink-0" style={{ backgroundColor: entry.color }} />
                  <span className="text-xs text-muted-foreground">{entry.name}</span>
                  <span className="text-xs font-medium text-foreground ml-auto pl-4">
                    {entry.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {hasOverspend && (
        <div
          className="flex items-start gap-3 border px-4 py-3 mt-1 text-sm"
          style={{ borderColor: "#BB0000", backgroundColor: "rgba(187,0,0,0.04)" }}
        >
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#BB0000" }} />
          <p className="text-sm text-foreground">
            <span className="font-semibold">Overspend detected.</span> In Q2 2022, declared
            expenditure exceeded declared income by <span className="font-semibold">KES 1.1M</span>.
            This may indicate undisclosed funding sources.
          </p>
        </div>
      )}
    </div>
  );
};

function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
      <span className="text-muted-foreground">{icon}</span>
      <p className="text-xs uppercase tracking-widest font-medium text-muted-foreground">{label}</p>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  flagged,
  className,
}: {
  label: string;
  value: string;
  sub?: string;
  flagged?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`border border-border bg-card px-4 py-4 ${className ?? ""}`}
      style={
        flagged
          ? { borderLeftWidth: 3, borderLeftColor: "#BB0000" }
          : { borderLeftWidth: 3, borderLeftColor: "#006600" }
      }
    >
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-bold" style={flagged ? { color: "#BB0000" } : {}}>
        {value}
      </p>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 shrink-0" style={{ backgroundColor: color }} />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
