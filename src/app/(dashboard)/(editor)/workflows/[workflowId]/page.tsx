import { Editor } from "@/features/ editor/ui/components/editor";
import { EditorHeader } from "@/features/ editor/ui/components/editor-header";
import { prefetchWorkflow } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageWorkflowProps {
  params: Promise<{ workflowId: string }>;
}

const Page = async ({ params }: PageWorkflowProps) => {
  await requireAuth();

  const { workflowId } = await params;
  await prefetchWorkflow({ workflowId: workflowId });

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<p>Error..</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <EditorHeader workflowId={workflowId} />
          <main className="flex-1">
            <Editor workflowId={workflowId} />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default Page;
