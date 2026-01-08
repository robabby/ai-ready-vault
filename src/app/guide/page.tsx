import { PageWrapper } from "@/components/layout";
import { CommandHeader } from "@/components/ui/CommandHeader";
import { CRTScreen } from "@/components/ui/CRTScreen";

export default function GuidePage() {
  return (
    <PageWrapper>
      <CRTScreen className="p-8">
        <CommandHeader level={1}>Guide</CommandHeader>
        <p className="mt-6 text-text-muted">Coming soon.</p>
      </CRTScreen>
    </PageWrapper>
  );
}
