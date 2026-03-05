import { FileText, Shield } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Politicians", href: "/politicians" },
    { label: "Report an Incident", href: "/" },
    { label: "Journalist Registration", href: "/" },
    { label: "Contact", href: "/" },
  ] as const;

  return (
    <footer className="bg-black text-white border-t-0">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand + integrity notice */}
          <div className="flex flex-col gap-3">
            <p className="font-bold  text-lg tracking-tight">Hakiki</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Hakiki is an independent transparency tool operated by{" "}
              <span className=" font-medium">Transparency International Kenya (TI-Kenya)</span>. It
              is not affiliated with any political party, candidate, or government agency.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Shield className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground uppercase tracking-widest">
                Independent · Non-partisan
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Quick Links
            </p>
            <nav className="flex flex-col gap-2">
              {links.map((link, i) => (
                <Link
                  key={`${link.label}-${i}`}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Data sources */}
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Data Sources
            </p>
            <div className="flex flex-col gap-2">
              {[
                "IEBC Candidate Declarations",
                "ORPP Party Finance Audits",
                "Kenya Gazette",
                "Mzalendo Parliamentary Database",
              ].map((src) => (
                <div key={src} className="flex items-center gap-2">
                  <FileText className="w-3 h-3 text-muted-foreground shrink-0" />
                  <span className="text-xs text-muted-foreground">{src}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer + legal */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
            <span className="font-medium ">Data Disclaimer:</span> Official data is sourced from
            government filings and is reproduced as-is. Citizen reports represent unverified
            allegations unless explicitly marked as verified. Hakiki does not guarantee the accuracy
            of third-party submissions.
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-white transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
