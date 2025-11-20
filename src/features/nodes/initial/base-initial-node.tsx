import { PlaceholderNode } from "@/components/react-flow/placeholder-node";
import { WorkflowNode } from "@/components/workflow-node";
import type { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { memo } from "react";

export const InitialNode = memo((props: NodeProps) => {
  return (
    <WorkflowNode name="Initial node" description="Klik untuk menambah node">
      <PlaceholderNode {...props} onClick={() => {}}>
        <div className="cursor-pointer flex items-center justify-center">
          <PlusIcon className="size-4" />
        </div>
      </PlaceholderNode>
    </WorkflowNode>
  );
});
