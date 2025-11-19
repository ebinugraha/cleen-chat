"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export const AuthFormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-border/50 backdrop-blur">
      <CardContent className="pt-2">{children}</CardContent>
    </Card>
  );
};
