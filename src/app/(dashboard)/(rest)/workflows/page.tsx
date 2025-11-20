import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { WorkflowList } from "@/features/workflows/ui/components/workflow-list";
import { WorkflowsLayout } from "@/features/workflows/ui/layout/workflow-layout";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: Props) => {
  await requireAuth();

  const params = await workflowsParamsLoader(searchParams);

  await prefetchWorkflows(params);

  return (
    <WorkflowsLayout>
      <HydrateClient>
        <ErrorBoundary fallback={<p>error...</p>}>
          <Suspense fallback={<p>loading...</p>}>
            <WorkflowList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsLayout>
  );
};

export default Page;
