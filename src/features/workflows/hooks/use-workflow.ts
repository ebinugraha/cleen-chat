"use client";

import { useTRPC } from "@/trpc/client";
import { useWorkflowsParams } from "./use-workflows-params";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  const [params] = useWorkflowsParams();

  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
};

export const useCreateWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: async (data) => {
        toast.success(`Workflow ${data.name} telah dibuat`);
        await queryClient.invalidateQueries(
          trpc.workflows.getMany.queryOptions({})
        );
        await queryClient
          .invalidateQueries
          // TODO get one
          ();
      },
    })
  );
};

export const useDeleteWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.remove.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.workflows.getMany.queryOptions({})
        );
        toast.success(`${data.name} berhasil di hapus`);
      },
      onError: async () => {
        toast.error(`Gagal menghapus workflow`);
      },
    })
  );
};
