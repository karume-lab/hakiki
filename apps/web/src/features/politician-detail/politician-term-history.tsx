import { Badge } from "@repo/ui/web/components/ui/badge";
import { Calendar } from "lucide-react";
import type { FC } from "react";
import type { TermHistory } from "./types";

interface PoliticianTermHistoryProps {
  termHistory: TermHistory[];
}

export const PoliticianTermHistory: FC<PoliticianTermHistoryProps> = ({ termHistory }) => {
  return (
    <div>
      <SectionLabel icon={<Calendar className="w-4 h-4" />} label="Term History" />
      <div className="border border-border divide-y divide-border">
        {termHistory.length === 0 && (
          <p className="px-4 py-3 text-sm text-muted-foreground">No term history available.</p>
        )}
        {termHistory.map((t, i) => (
          <div
            key={`${t.from}-${t.to}-${i}`}
            className="flex items-center justify-between px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-1 self-stretch"
                style={{ backgroundColor: i === 0 ? "#006600" : "#BB0000" }}
              />
              <div>
                <p className="text-sm font-semibold text-foreground">{t.parliament}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(t.from).toLocaleDateString("en-KE", { dateStyle: "medium" })}
                  {" → "}
                  {t.to ? (
                    new Date(t.to).toLocaleDateString("en-KE", { dateStyle: "medium" })
                  ) : (
                    <span className="font-medium" style={{ color: "#006600" }}>
                      Present
                    </span>
                  )}
                </p>
              </div>
            </div>
            {!t.to && (
              <Badge
                variant="outline"
                className="rounded-none text-xs uppercase tracking-wide px-1.5 py-0"
              >
                Active
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const SectionLabel = ({ icon, label }: { icon: React.ReactNode; label: string }) => {
  return (
    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
      <span className="text-muted-foreground">{icon}</span>
      <p className="text-xs uppercase tracking-widest font-medium text-muted-foreground">{label}</p>
    </div>
  );
};
