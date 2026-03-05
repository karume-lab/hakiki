import { Button } from "@repo/ui/web/components/ui/button";
import { ArrowRight, BarChart3, Users } from "lucide-react";

const ModulesSection = () => {
  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">
            How It Works
          </p>
          <h2 className="text-3xl font-bold text-foreground max-w-xl">
            How Hakiki Brings Data to Light
          </h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          Official data from government sources populates the dashboard. Citizens fill the gaps that
          official reporting misses. Together they create a comprehensive, living picture of how
          money moves in Kenyan politics.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {/* Module A */}
          <div className="border border-border p-8 flex flex-col gap-6 bg-card">
            <div className="p-3 border border-border self-start">
              <BarChart3 className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Politician Finance Dashboard
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A public-facing transparency layer that aggregates official finance data into
                searchable, visual candidate profiles. Track declared income, expenditure
                breakdowns, and flag anomalies — all from verified government filings.
              </p>
            </div>
            <Button variant="cta" className="rounded-none self-start group/btn">
              <span className="z-1  flex items-center gap-2">
                Explore Dashboard
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </span>
            </Button>
          </div>

          {/* Module B */}
          <div className="border border-border p-8 flex flex-col gap-6 bg-card">
            <div className="p-3 border border-border self-start">
              <Users className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Citizen Reporting Tool</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A crowdsourced intelligence layer that empowers citizens to report financing
                violations they observe on the ground. Every submission goes through a moderation
                workflow before being published publicly.
              </p>
            </div>
            <Button variant="cta" className="rounded-none self-start group/btn">
              <span className="z-1 flex items-center gap-2">
                Report an Incident
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
