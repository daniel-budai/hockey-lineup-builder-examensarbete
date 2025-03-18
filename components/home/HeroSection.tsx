import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                Digital Hockey Lineup Management
              </h1>
              <p className="max-w-[600px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Create, manage, and optimize your hockey team lineups with our
                intuitive drag-and-drop interface.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/dashboard">
                <Button className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#0f172a] shadow-md hover:shadow-lg transition-all">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
              <div className="hockey-rink h-full w-full shadow-lg bg-[#e2e8f0] border-2 border-white/50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="h-24 w-24 text-white opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
