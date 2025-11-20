import { PAGINATION } from "@/config/constant";
import { NodeType } from "@/generated/prisma/enums";
import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { generateSlug } from "random-word-slugs";
import type { Node, Edge } from "@xyflow/react";
import z from "zod";

export const workflowRouter = createTRPCRouter({
  //   TODO 1: add initial node here
  //   TODO 2: change protectedProcedures to premiumProcedures
  /**
   *    @function create to create procedures
   */
  create: protectedProcedure.mutation(async ({ ctx, input }) => {
    return prisma.workflow.create({
      data: {
        name: generateSlug(3),
        userId: ctx.auth.user.id,
        nodes: {
          create: {
            type: NodeType.INTITAL,
            position: { x: 0, y: 0 },
            name: NodeType.INTITAL,
          },
        },
      },
    });
  }),
  /**
   * @function remove to remove a procedure by id
   */
  remove: protectedProcedure
    .input(
      z.object({
        workflowId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { workflowId } = input;

      return prisma.workflow.delete({
        where: {
          id: workflowId,
          userId: ctx.auth.user.id,
        },
      });
    }),
  // TODO 1: tambah untuk save nodes
  /**
   * @function update untuk melakukan update value, dan juga untuk save nodes
   *
   */
  updateName: protectedProcedure
    .input(
      z.object({
        workflowId: z.string(),
        workflowName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { workflowId, workflowName } = input;

      return prisma.workflow.update({
        where: {
          id: workflowId,
          userId: ctx.auth.user.id,
        },
        data: {
          name: workflowName,
        },
      });
    }),
  /**
   * @function getMany menampilkan semua workfow berserta paginationnya.
   *
   */
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .max(PAGINATION.MAX_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().default(""),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;

      const [items, totalCount] = await Promise.all([
        prisma.workflow.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          where: {
            userId: ctx.auth.user.id,
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
        prisma.workflow.count({
          where: {
            userId: ctx.auth.user.id,
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        }),
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      return {
        items,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage,
      };
    }),

  /**
   * @returns workflowGetOne
   */
  getOne: protectedProcedure
    .input(
      z.object({
        workflowId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { workflowId } = input;

      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: {
          id: workflowId,
          userId: ctx.auth.user.id,
        },
        include: {
          nodes: true,
          connections: true,
        },
      });

      // Mengubah node menjadi kompatibel dengan reactFLow
      const nodes: Node[] = workflow.nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position as { x: number; y: number },
        data: (node.data as Record<string, unknown>) || {},
      }));

      const edges: Edge[] = workflow.connections.map((connection) => ({
        id: connection.id,
        source: connection.fromNodeId,
        target: connection.toNodeId,
        sourceHandle: connection.fromOutput,
        targetHandle: connection.toInput,
      }));

      return {
        id: workflow.id,
        name: workflow.name,
        nodes,
        edges,
      };
    }),
});
