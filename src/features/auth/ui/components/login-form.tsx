"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues } from "../../types";
import { loginSchema } from "../../schema";
import { authClient } from "@/lib/auth-client";

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (error) => {
          toast.error(`${error.error.message}`);
        },
      }
    );
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Social Login */}
          <div className="grid gap-3">
            <Button variant="outline" className="w-full gap-2 py-5">
              <Image
                src="/logos/github.svg"
                alt="github"
                width={20}
                height={20}
              />
              Masuk dengan GitHub
            </Button>

            <Button variant="outline" className="w-full gap-2 py-5">
              <Image
                src="/logos/google.svg"
                alt="google"
                width={20}
                height={20}
              />
              Masuk dengan Google
            </Button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="h-px w-full bg-border" />
            <span className="absolute px-2 text-xs bg-card text-foreground/70">
              atau
            </span>
          </div>

          {/* Input Fields */}
          <div className="grid gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan email anda"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan password anda"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full py-5 text-base">
              Masuk
            </Button>
          </div>

          <p className="text-center text-sm opacity-80 pt-2">
            Belum punya akun?{" "}
            <Link href="/register" className="text-primary underline">
              Daftar disini
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};
