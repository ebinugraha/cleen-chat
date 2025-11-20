"use client";

import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflow";

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow({ workflowId: workflowId });

  return <div>{JSON.stringify(workflow)}</div>;
};
