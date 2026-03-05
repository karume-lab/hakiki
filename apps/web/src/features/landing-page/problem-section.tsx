import { Badge } from "@repo/ui/web/components/ui/badge";
import { AlertTriangle, Database, Eye } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: <Database className="w-5 h-5" />,
      label: "Opacity",
      heading: "Scattered official data",
      body: "Finance declarations from IEBC, ORPP, and the Kenya Gazette live in difficult-to-parse PDFs and government portals. No single place exists for citizens to look up how a candidate in their constituency funds their campaign.",
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      label: "Under-reporting",
      heading: "What never gets declared",
      body: "Vote buying, undisclosed donor networks, and cash-in-hand transactions happen openly but go completely untracked. A significant share of actual campaign financing never appears in any official record.",
    },
    {
      icon: <Eye className="w-5 h-5" />,
      label: "No Accountability Loop",
      heading: "Patterns with no audience",
      body: "Even when suspicious patterns exist in public data, there is no accessible tool that surfaces them for ordinary citizens, journalists, or regulators who could act on them.",
    },
  ];
  return (
    <section className="border-t border-border bg-secondary dark:bg-card">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">
            The Problem
          </p>
          <h2 className="text-3xl font-bold text-foreground max-w-xl">
            The Hidden Cost of Campaigns
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border bg-card">
          {problems.map((pillar, i) => (
            <div
              key={`${pillar.label}-${i}`}
              className={`p-8 flex flex-col gap-4 ${i < 2 ? "border-b md:border-b-0 md:border-r border-border" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 border border-border text-muted-foreground">{pillar.icon}</div>
                <Badge
                  variant="ghost"
                  className="rounded-none text-[10px] uppercase tracking-wide px-1.5 py-0"
                >
                  {pillar.label}
                </Badge>
              </div>
              <h3 className="font-bold text-lg text-foreground leading-snug">{pillar.heading}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
