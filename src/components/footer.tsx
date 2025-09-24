import Link from "next/link";
import { Mountain } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold font-headline text-foreground">Tiri Tara</span>
        </div>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Tiri Tara. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary" prefetch={false}>
            Privacy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary" prefetch={false}>
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
