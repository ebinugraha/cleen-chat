"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const ClientGreeting = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.getUser.queryOptions());

  return (
    <div>
      <Button>test</Button>
      Hello, {data.map((item) => item.name) ?? "Guest"}!
    </div>
  );
};
