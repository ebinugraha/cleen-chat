import { prefetch, trpc } from "@/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

export type InputGetMany = inferInput<typeof trpc.workflows.getMany>;
export type InputGetOne = inferInput<typeof trpc.workflows.getOne>;

export const prefetchWorkflows = async (params: InputGetMany) => {
  return await prefetch(trpc.workflows.getMany.queryOptions(params));
};

export const prefetchWorkflow = async (params: InputGetOne) => {
  return await prefetch(trpc.workflows.getOne.queryOptions(params));
};
