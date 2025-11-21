import { PAGINATION } from "@/config/constant";
import { NodeType } from "@/generated/prisma/enums";
import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { generateSlug } from "random-word-slugs";
import type { Node, Edge } from "@xyflow/react";
import z from "zod";

export const workflowRouter = createTRPCRouter({
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
            type: NodeType.INITIAL,
            position: { x: 0, y: 0 },
            name: NodeType.INITIAL,
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
  /**
   * @function update untuk melakukan update value, dan juga untuk save nodes
   * @example
   * ```
   *  json
   *  {
   *    workflowId: 123,
   *    nodes: {
   *       [
   *        id: 123
   *        ...
   *       ]
   *    },
   *    edges: {
   *        [
   *
   *        ]
   *    }
   *  }
   * ```
   *
   */
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        nodes: z.array(
          z.object({
            id: z.string(),
            type: z.string().nullish(),
            data: z.record(z.string(), z.any()),
            position: z.object({
              x: z.number(),
              y: z.number(),
            }),
          })
        ),
        edges: z.array(
          z.object({
            source: z.string(),
            target: z.string(),
            sourceHandle: z.string().nullish(),
            targetHandle: z.string().nullish(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { edges, id, nodes } = input;

      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: {
          id,
          userId: ctx.auth.user.id,
        },
      });

      // Transaction untuk memastikan konsistensi
      return await prisma.$transaction(async (tx) => {
        // hapus semua node terlebih dahulu
        await tx.node.deleteMany({
          where: {
            workflowId: id,
          },
        });

        // masukan lagi node terbaru
        await tx.node.createMany({
          data: nodes.map((node) => ({
            id: node.id,
            name: node.type || "unknown",
            type: node.type as NodeType,
            position: node.position,
            data: node.data || {},
            workflowId: id,
          })),
        });

        // membuat connection
        await tx.connection.createMany({
          data: edges.map((edge) => ({
            workflowId: id,
            fromNodeId: edge.source,
            toNodeId: edge.target,
            fromOutput: edge.sourceHandle || "main",
            toInput: edge.targetHandle || "main",
          })),
        });

        // update kolom updatedAt di workflow
        await tx.workflow.update({
          data: {
            updatedAt: new Date(),
          },
          where: {
            id,
          },
        });

        return workflow;
      });
    }),
  /**
   * @function updateName untuk melakukan update value, dan juga untuk save nodes
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
