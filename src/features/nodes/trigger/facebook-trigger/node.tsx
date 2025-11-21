"use client";

import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { FacebookDialog } from "./dialog";
import { BaseTriggerNode } from "../base-trigger-node";
import { NodeStatus } from "@/components/react-flow/node-status-indicator";

export const FacebookTriggerNode = memo((props: NodeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const status: NodeStatus = "success";

  const handleSetting = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <FacebookDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <BaseTriggerNode
        {...props}
        id={props.id}
        Icon={"/logos/facebook.svg"}
        status={status}
        name="Ketika komen masuk"
        onSettings={handleSetting}
        onDoubleClick={handleSetting}
      />
    </>
  );
});

FacebookTriggerNode.displayName = "ManualTriggerNode";
