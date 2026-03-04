import { Badge } from "@repo/ui/web/components/ui/badge";
import { MapPin } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";
import type { Member } from "../data/index";

const MemberCard: FC<Member> = ({ constituency, role, name, imageUrl }) => {
  return (
    <div className="group flex items-center gap-4  hover:bg-muted/60 dark:hover:bg-muted/30 p-4 transition-colors duration-200 cursor-pointer">
      <div className="relative w-16 h-20 shrink-0 overflow-hidden bg-muted">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-300"
        />
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <Badge variant="secondary" className="self-start rounded-none text-[10px] px-1.5 py-0">
          {role}
        </Badge>
        <p className="font-semibold text-sm text-foreground leading-snug line-clamp-2">{name}</p>
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="text-xs truncate">{constituency}</span>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
