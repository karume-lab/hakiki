import { Badge } from "@repo/ui/web/components/ui/badge";
import { Building2, Facebook, Mail, MapPin, Phone, Twitter, UserIcon, Users } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";
import type { Constituency, Party, Socials } from "@/features/politician-detail/types";

interface PolitcianSidebarProps {
  fullName: string;
  image: string | null;
  position: string;
  constituency: Constituency | null;
  party: Party | null;
  gender: string | null;
  email: string | null;
  phone: string | null;
  socials: Socials;
}

export const PoliticianSidebar: FC<PolitcianSidebarProps> = ({
  fullName,
  image,
  position,
  constituency,
  party,
  gender,
  email,
  phone,
  socials,
}) => {
  return (
    <aside className="flex flex-col gap-0">
      {/* Photo */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-muted border border-border flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt={fullName}
            fill
            className="object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <UserIcon className="size-24 text-muted-foreground/40" />
        )}
        {/* Kenyan flag accent strip */}
        <div className="absolute bottom-0 left-0 right-0 flex h-[4px]">
          <div className="flex-1" style={{ backgroundColor: "#006600" }} />
          <div className="flex-1" style={{ backgroundColor: "#000000" }} />
          <div className="flex-1" style={{ backgroundColor: "#BB0000" }} />
        </div>
      </div>

      {/* Quick facts */}
      <div className="border border-t-0 border-border divide-y divide-border">
        <div className="px-4 py-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
            Position
          </p>
          <Badge
            variant="outline"
            className="rounded-none text-[10px] uppercase tracking-wide px-1.5 py-0"
          >
            {position}
          </Badge>
        </div>

        {constituency && (
          <div className="px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
              Constituency
            </p>
            <div className="flex items-center gap-1.5 text-sm text-foreground font-medium">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              {constituency.name}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 pl-5">
              {constituency.county} County
            </p>
          </div>
        )}

        {party && (
          <div className="px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
              Party
            </p>
            <div className="flex items-center gap-1.5 text-sm text-foreground font-medium">
              <Building2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              {party.name}
            </div>
            {party.abbreviation && (
              <p className="text-xs text-muted-foreground mt-0.5 pl-5">{party.abbreviation}</p>
            )}
          </div>
        )}

        {gender && (
          <div className="px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
              Gender
            </p>
            <div className="flex items-center gap-1.5 text-sm text-foreground">
              <Users className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              {gender}
            </div>
          </div>
        )}

        {(email || phone) && (
          <div className="px-4 py-3 flex flex-col gap-2">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Contact</p>
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{email}</span>
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                {phone}
              </a>
            )}
          </div>
        )}

        {(socials.twitter || socials.facebook) && (
          <div className="px-4 py-3 flex gap-2">
            {socials.twitter && (
              <a
                href={`https://twitter.com/${socials.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border px-2 py-1"
              >
                <Twitter className="w-3 h-3" /> Twitter
              </a>
            )}
            {socials.facebook && (
              <a
                href={`https://facebook.com/${socials.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border px-2 py-1"
              >
                <Facebook className="w-3 h-3" /> Facebook
              </a>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
