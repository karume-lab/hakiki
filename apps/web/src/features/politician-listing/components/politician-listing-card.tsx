import { Badge } from "@repo/ui/web/components/ui/badge";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";

interface PoliticianCardProps {
  fullName: string;
  position: string;
  image?: string | null;
  constituency?: {
    name: string;
    county: string;
  } | null;
}

const PoliticianCard: FC<PoliticianCardProps> = ({ constituency, position, fullName, image }) => {
  return (
    <div className="group flex items-center gap-4 hover:bg-muted/60 dark:hover:bg-muted/30 p-4 transition-colors duration-200 cursor-pointer">
      <div className="relative w-16 h-20 shrink-0 overflow-hidden bg-muted flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt={fullName}
            fill
            className="object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <UserIcon className="w-8 h-8 text-muted-foreground/40" />
        )}
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <Badge variant="secondary" className="self-start rounded-none text-[10px] px-1.5 py-0">
          {position}
        </Badge>
        <p className="font-semibold text-sm text-foreground leading-snug line-clamp-2">
          {fullName}
        </p>
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-xs truncate">
            {constituency ? `${constituency.name}, ${constituency.county}` : "Nationwide"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PoliticianCard;
