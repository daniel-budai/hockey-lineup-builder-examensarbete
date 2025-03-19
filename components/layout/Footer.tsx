import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-[#334155]/30">
      <div className="container flex flex-col gap-2 py-4 md:h-16 md:flex-row md:items-center md:justify-between md:py-0">
        <p className="text-center text-sm leading-loose text-slate-400 md:text-left">
          © {new Date().getFullYear()} Hockey Lineup Builder. All rights
          reserved.
        </p>
        <nav className="flex items-center justify-center gap-4 md:justify-end md:gap-6">
          <Link
            href="#"
            className="text-sm font-medium text-slate-400 hover:text-white hover:underline underline-offset-4"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-slate-400 hover:text-white hover:underline underline-offset-4"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-slate-400 hover:text-white hover:underline underline-offset-4"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
