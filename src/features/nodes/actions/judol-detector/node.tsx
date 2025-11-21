import { memo, useState } from "react";
import { JudolDetectorDialog } from "./dialog";
import { BaseActionsNode } from "../base-actions-node";
import { SparkleIcon } from "lucide-react";
import { NodeProps } from "@xyflow/react";
import { NodeStatus } from "@/components/react-flow/node-status-indicator";

export const JudolDetectorNode = memo((props: NodeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const status: NodeStatus = "success";

  const handleSetting = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <JudolDetectorDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <BaseActionsNode
        {...props}
        id={props.id}
        Icon={SparkleIcon}
        status={status}
        name="Cek teks judi online"
        onSettings={handleSetting}
        onDoubleClick={handleSetting}
      />
    </>
  );
});

JudolDetectorNode.displayName = "JudolDetectorNode";
