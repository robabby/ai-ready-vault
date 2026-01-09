import { CRTScreen } from "@/components/ui/CRTScreen";
import { CommandHeader } from "@/components/ui/CommandHeader";

const OBJECTIONS = [
  {
    question: "I already have a working system",
    answer:
      "AI-readiness is additive. Add CLAUDE.md (5 min), memory folders (2 min), run /hydrate. Your notes stay exactly where they are.",
  },
  {
    question: "AI is just a search tool",
    answer:
      "Search finds files. Comprehension connects ideas. An AI-ready vault enables cross-note synthesis—answers that no single note contains.",
  },
  {
    question: "I don't want to restructure my vault",
    answer:
      "You don't have to. Start with just CLAUDE.md. Adopt the memory system later. It's incremental.",
  },
  {
    question: "What if Claude changes?",
    answer:
      "Your vault is Markdown files. Portable. Readable by any future AI. You own the structure, not the tool.",
  },
] as const;

/**
 * Addresses common objections from PKM enthusiasts
 * before they download the vault.
 */
export function ObjectionHandling() {
  return (
    <CRTScreen forceMinimal showBezel={false} className="p-6">
      <CommandHeader level={2}>Common Concerns</CommandHeader>

      <div className="mt-6 space-y-6">
        {OBJECTIONS.map((objection, i) => (
          <div key={i} className="font-mono">
            <div className="text-phosphor-bright">
              &gt; &quot;{objection.question}&quot;
            </div>
            <div className="mt-2 text-text pl-4">{objection.answer}</div>
          </div>
        ))}
      </div>
    </CRTScreen>
  );
}
