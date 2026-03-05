import Image from "next/image";
import Heatmap from "public/heatmap.png";

const FeaturesSection = () => {
  const visualizations = [
    {
      title: "Spending Map",
      description: "County-level campaign expenditure across Kenya, interactive and filterable.",
    },
    {
      title: "Income vs Expenditure",
      description: "Visual flags for candidates whose spending exceeds declared income.",
    },
    {
      title: "Spending Breakdown",
      description: "Where the money goes — media, rallies, logistics, and more.",
    },
    {
      title: "Campaign Timeline",
      description: "Track financing acceleration across the campaign period week by week.",
    },
  ];

  return (
    <section className="border-t border-border bg-secondary dark:bg-card">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">
            Visualizations
          </p>
          <h2 className="text-3xl font-bold text-foreground">See the Money Move</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
          {visualizations.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className="group border border-border bg-card p-6 flex flex-col gap-4 hover:bg-muted/50 transition-colors duration-200 cursor-pointer"
            >
              {/* Image placeholder */}
              <div className="relative w-full h-28 overflow-hidden">
                <Image
                  src={Heatmap.src}
                  alt={`${item.title} preview`}
                  fill
                  className="object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                />
              </div>

              <div>
                <p className="font-semibold text-sm text-foreground mb-1">{item.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
