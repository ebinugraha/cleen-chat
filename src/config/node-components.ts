import { JudolDetectorNode } from "@/features/nodes/actions/judol-detector/node";
import { InitialNode } from "@/features/nodes/initial/base-initial-node";
import { FacebookTriggerNode } from "@/features/nodes/trigger/facebook-trigger/node";
import { NodeType } from "@/generated/prisma/enums";
import { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.FACEBOOK_TRIGGER]: FacebookTriggerNode,
  [NodeType.JUDOL_DETECTOR]: JudolDetectorNode,
} as const satisfies NodeTypes;

export type RegisterdNodeType = keyof typeof nodeComponents;
