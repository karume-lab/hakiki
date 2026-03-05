"use client";
import { usePolitician } from "@/features/politician-detail/hooks/usePolitician";
import { PoliticianCampaignFinance } from "@/features/politician-detail/politician-campaign-finance";
import { PoliticianHeaderBar } from "@/features/politician-detail/politician-header-bar";
import { PoliticianHero } from "@/features/politician-detail/politician-hero";
import { PoliticianSidebar } from "@/features/politician-detail/politician-sidebar";
import { PoliticianTermHistory } from "@/features/politician-detail/politician-term-history";

type Props = {
  params: { slug: string };
};

const PoliticianDetailPage = ({ params }: Props) => {
  const {
    politician: p,
    termHistory,
    socials,
    incomeExpenditure,
    spendingBreakdown,
  } = usePolitician(params.slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PoliticianHeaderBar parliament="13th Parliament" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <PoliticianSidebar
            fullName={p.fullName}
            image={p.image ?? null}
            position={p.position}
            constituency={p.constituency ?? null}
            party={p.party ?? null}
            gender={p.gender ?? null}
            email={p.email ?? null}
            phone={p.phone ?? null}
            socials={socials}
          />

          <div className="flex flex-col gap-8">
            <PoliticianHero
              fullName={p.fullName}
              position={p.position}
              constituencyName={p.constituency?.name}
              bio={p.bio}
            />
            <PoliticianTermHistory termHistory={termHistory} />
            <PoliticianCampaignFinance
              incomeExpenditure={incomeExpenditure}
              spendingBreakdown={spendingBreakdown}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticianDetailPage;
