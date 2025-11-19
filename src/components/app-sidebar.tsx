"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Image from "next/image";
import { menuItems } from "@/config/constant";
import { usePathname, useRouter } from "next/navigation";
import { CreditCardIcon, LogOutIcon, StarIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export const AppSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton className="gap-x-4 h-10 px-4" asChild>
            <Link href="/">
              <Image
                src={"/logos/logo.svg"}
                alt="logo"
                width={30}
                height={30}
              />
              <span className="text-sm font-medium">CleenChat</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="gap-x-4 h-10 px-4"
                    tooltip={item.title}
                    isActive={
                      item.url === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.url)
                    }
                  >
                    <Link href={item.url}>
                      <item.icon className="size-2" />
                      <span className="text-xs">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="gap-x-4 h-10 px-4"
              tooltip={"Upgrade to pro"}
            >
              <StarIcon className="size-4" />
              <span className="text-xs">Upgrade to pro</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={"Billing portal"}
              className="gap-x-4 h-10 px-4"
            >
              <CreditCardIcon className="size-4" />
              <span className="text-xs">Billing Portal</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/login");
                    },
                  },
                });
              }}
              tooltip={"Logout"}
              className="gap-x-4 h-10 px-4"
            >
              <LogOutIcon className="size-4" />
              <span className="text-xs">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
