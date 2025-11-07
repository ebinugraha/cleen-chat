import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import prisma from "@/lib/db";
export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  getUser: baseProcedure.query(async () => {
    const user = await prisma.user.findMany();
    return user;
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
