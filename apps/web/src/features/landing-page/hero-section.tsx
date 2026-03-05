import { Button } from "@repo/ui/web/components/ui/button";
import { Input } from "@repo/ui/web/components/ui/input";
import { Search } from "lucide-react";
import HeroBg from "public/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${HeroBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative h-[60vh] mt-24 px-6 mx-auto text-center text-white flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/65" />
      <div className="relative z-10 w-full flex flex-col gap-4">
        <h3 className="capitalize text-4xl font-bold">Track the power, account the spending</h3>
        <p className="text-white/80 text-sm">
          Verify the public funds allocated to your Kenyan MPs and Governors
        </p>
        <div className="flex w-full mt-2 items-center max-w-2xl self-center">
          <Input
            type="text"
            placeholder="Search by MP name, county, or constituency..."
            className="rounded-none bg-background dark:bg-white text-foreground dark:text-black h-10 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button className="rounded-none h-11 px-5 gap-2 dark:bg-black dark:text-white">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
