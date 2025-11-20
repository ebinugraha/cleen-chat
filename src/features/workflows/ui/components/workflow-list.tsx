"use client";

import {
  EmptyView,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from "@/components/entity";
import {
  useCreateWorkflow,
  useSuspenseWorkflows,
} from "../../hooks/use-workflow";
import { Workflow } from "@/generated/prisma/client";
import { formatDistanceToNow } from "date-fns";
import { WorkflowIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useWorkflowsParams } from "../../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { useDeleteWorkflow } from "../../hooks/use-workflow";

export const WorkflowSearch = () => {
  const [params, setParams] = useWorkflowsParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });

  return (
    <EntitySearch
      value={searchValue}
      onChange={(value) => onSearchChange(value)}
      placeholder="Search workflow"
    />
  );
};

export const WorkflowList = () => {
  const { data: workflows } = useSuspenseWorkflows();

  return (
    <EntityList
      items={workflows.items}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => <WorkflowItem data={workflow} />}
      emptyView={<p>empty</p>}
    />
  );
};

export const WorkflowItem = ({ data }: { data: Workflow }) => {
  const removeWorkflow = useDeleteWorkflow();

  const handleRemove = () => {
    removeWorkflow.mutate({
      workflowId: data.id,
    });
  };

  return (
    <EntityItem
      href={`/workflows/${data.id}`}
      title={data.name}
      onRemove={handleRemove}
      isRemoving={removeWorkflow.isPending}
      subtitle={
        <>
          Update {formatDistanceToNow(data.updatedAt, { addSuffix: true })}{" "}
          &bull; Created{" "}
          {formatDistanceToNow(data.updatedAt, { addSuffix: true })}
        </>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <WorkflowIcon className="size-5 text-muted-foreground" />
        </div>
      }
    />
  );
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorklow = useCreateWorkflow();
  const router = useRouter();

  const handleCreate = () => {
    createWorklow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        toast.error("error");
      },
    });
  };

  return (
    <>
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows content"
        onNew={handleCreate}
        newButtonLabel="New Workflow"
        disabled={disabled}
        isCreating={createWorklow.isPending}
      />
    </>
  );
};

export const WorkflowsPagination = () => {
  const workflows = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowsParams();

  return (
    <EntityPagination
      disabled={workflows.isFetching}
      totalPages={workflows.data.totalPages}
      page={workflows.data.page}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
};

export const WorkflowsLoading = () => {
  return <LoadingView message="Loading workflows..." />;
};

export const WorkflowsError = () => {
  return <ErrorView message="Workflows Error..." />;
};

export const WorkflowsEmpty = () => {
  const createWorkflow = useCreateWorkflow();
  const router = useRouter();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: (error) => {
        toast("error");
      },
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
    });
  };

  return (
    <>
      <EmptyView
        onNew={handleCreate}
        message="You haven't created any workflows"
      />
    </>
  );
};
