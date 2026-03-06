import type { FC } from "react";

interface PoliticianHeroProps {
  fullName: string;
  position: string;
  constituencyName: string | null | undefined;
  bio: string | null | undefined;
}

export const PoliticianHero: FC<PoliticianHeroProps> = ({
  fullName,
  position,
  constituencyName,
  bio,
}) => {
  return (
    <div className="border-b border-border pb-6">
      <p
        className="text-xs uppercase tracking-widest font-medium mb-2"
        style={{ color: "#006600" }}
      >
        {position} &#183; {constituencyName ?? "—"} Constituency
      </p>
      <h1 className="text-4xl font-bold text-foreground mb-3">{fullName}</h1>
      {bio && <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{bio}</p>}
    </div>
  );
};
