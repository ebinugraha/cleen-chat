import { prefetch, trpc } from "@/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

export type Input = inferInput<typeof trpc.workflows.getMany>;

export const prefetchWorkflows = async (params: Input) => {
  return await prefetch(trpc.workflows.getMany.queryOptions(params));
};
