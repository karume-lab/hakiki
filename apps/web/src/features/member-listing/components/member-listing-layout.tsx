import { Button } from "@repo/ui/web/components/ui/button";
import { Users } from "lucide-react";
import type { FC } from "react";
import type { Member } from "../data";
import MemberCard from "./member-listing-card";

interface MemberListingLayoutProps {
  members: Member[];
  onClearFilters?: () => void;
}

const MemberListingLayout: FC<MemberListingLayoutProps> = ({ members, onClearFilters }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {members.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
          <Users className="w-10 h-10 text-muted-foreground/40" />
          <p className="text-lg font-semibold text-foreground">No members found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
          <Button variant="outline" className="rounded-none mt-2" onClick={onClearFilters}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
          {members.map((member) => (
            <MemberCard key={member.id} {...member} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberListingLayout;
