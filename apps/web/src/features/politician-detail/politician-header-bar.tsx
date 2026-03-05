import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  parliament: string;
};

export function PoliticianHeaderBar({ parliament }: Props) {
  return (
    <div className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href={"/politicians"}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="uppercase tracking-widest">{parliament}</span>
          <span>·</span>
          <span className="uppercase tracking-widest">Kenya</span>
        </div>
      </div>
    </div>
  );
}
