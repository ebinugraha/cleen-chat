"use client";

import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type NodeChange,
  type Node,
  type Edge,
  EdgeChange,
  Connection,
  Background,
  Controls,
  MiniMap,
  Panel,
} from "@xyflow/react";
// @ts-ignore: side-effect CSS import without type declarations
import "@xyflow/react/dist/style.css";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflow";
import { AddNoteButton } from "./add-node-button";
import { nodeComponents } from "@/config/node-components";

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow({ workflowId });

  const [nodes, setNodes] = useState<Node[]>(workflow.nodes);
  const [edges, setEdges] = useState<Edge[]>(workflow.edges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return (
    <div className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        proOptions={{
          hideAttribution: true,
        }}
        snapGrid={[10, 10]}
        nodeTypes={nodeComponents}
        snapToGrid
        panOnScroll
        panOnDrag={false}
        selectionOnDrag
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-right">
          <AddNoteButton />
        </Panel>
      </ReactFlow>
    </div>
  );
};
