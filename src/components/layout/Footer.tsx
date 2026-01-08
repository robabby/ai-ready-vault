import { Link } from "@/components/ui/Link";

/**
 * Minimal site footer.
 * Metatron Collective link + copyright year.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 md:px-8 border-t border-border">
      <div className="max-w-4xl mx-auto text-center text-text-muted text-sm">
        <p>
          Built for the{" "}
          <Link href="https://metatron.sh" external>
            Metatron Collective
          </Link>
        </p>
        <p className="mt-2">{currentYear}</p>
      </div>
    </footer>
  );
}
