import { InitialNode } from "@/features/nodes/initial/base-initial-node";
import { NodeType } from "@/generated/prisma/enums";
import { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
  [NodeType.INTITAL]: InitialNode,
} as const satisfies NodeTypes;

export type RegisterdNodeType = keyof typeof nodeComponents;
