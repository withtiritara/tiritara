import Link from "next/link";
import { Mountain } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Mountain className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold font-headline text-foreground">Tiri Tara</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="#destinations"
            className="transition-colors hover:text-primary"
            prefetch={false}
          >
            Destinations
          </Link>
          <Link
            href="#booking"
            className="transition-colors hover:text-primary"
            prefetch={false}
          >
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
