"use client";

import { useTRPC } from "@/trpc/client";
import { useWorkflowsParams } from "./use-workflows-params";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

/**
 *
 * @callback useSuspenseWorkflows
 * untuk melakukan get data dari seluruh workflows
 */

export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  const [params] = useWorkflowsParams();

  return useSuspenseQuery(
    trpc.workflows.getMany.queryOptions({
      page: params.page,
      pageSize: params.pageSize,
      search: params.search,
    })
  );
};

/**
 *
 * @callback useSuspenseWorkflow
 * untuk melakukan get data dari satu workflow
 */
export const useSuspenseWorkflow = ({ workflowId }: { workflowId: string }) => {
  const trpc = useTRPC();
  return useSuspenseQuery(
    trpc.workflows.getOne.queryOptions({ workflowId: workflowId })
  );
};

/**
 *
 * @callback useCreateWorkflow
 * untuk membuat workflow
 */

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
        await queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({
            workflowId: data.id,
          })
        );
      },
    })
  );
};

/**
 *
 * @callback useDeleteWorkflow
 * Menghapus workflow
 */

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

/**
 *
 * @callback useUpdateWorkflowName
 * Menghapus workflow
 */

export const useUpdateWorkflowName = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.updateName.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.workflows.getMany.queryOptions({})
        );
        await queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({
            workflowId: data.id,
          })
        );
        toast.success(`${data.name} berhasil diubah`);
      },
      onError: async () => {
        toast.error(`Gagal mengubah name workflow`);
      },
    })
  );
};
