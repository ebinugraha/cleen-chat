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

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/login"),
      },
    });
  };

  return (
    <Sidebar collapsible="icon" className="backdrop-blur-xl bg-sidebar/70">
      {/* HEADER */}
      <SidebarHeader className="bg-linear-to-r from-primary/10 to-primary/5 border-b">
        <SidebarMenuItem>
          <SidebarMenuButton
            className="gap-x-3 h-10 px-4 hover:bg-primary/10 transition-all"
            asChild
          >
            <Link href="/" aria-label="Go to home">
              <Image
                src="/logos/logo.svg"
                alt="CleenChat Logo"
                width={32}
                height={32}
                className="rounded-md shadow-sm"
              />
              <span className="text-sm font-semibold tracking-wide">
                CleenChat
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="pt-2">
        {menuItems.map((group, groupIndex) => (
          <SidebarGroup key={groupIndex}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive =
                    item.url === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.url);

                  return (
                    <SidebarMenuItem key={item.title} className="relative">
                      {isActive && (
                        <span className="absolute left-0 top-0 h-full w-[3px] bg-primary rounded-r-md" />
                      )}

                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        aria-current={isActive ? "page" : undefined}
                        className={`
                          group gap-x-4 h-11 px-4 rounded-md transition-all
                          ${
                            isActive
                              ? "bg-primary/15 text-primary"
                              : "hover:bg-muted/40"
                          }
                        `}
                      >
                        <Link href={item.url}>
                          <item.icon
                            className={`size-4 transition-all ${
                              isActive
                                ? "text-primary"
                                : "opacity-70 group-hover:opacity-100"
                            }`}
                            aria-hidden="true"
                          />
                          <span className="text-xs font-medium tracking-wide">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t pt-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="gap-x-4 h-10 px-4 hover:bg-primary/10 transition-all"
              tooltip="Upgrade to Pro"
            >
              <Link href="/upgrade">
                <StarIcon className="size-4 opacity-70 group-hover:opacity-100 transition-all" />
                <span className="text-xs font-medium tracking-wide">
                  Upgrade to Pro
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="gap-x-4 h-10 px-4 hover:bg-primary/10 transition-all"
              tooltip="Billing Portal"
            >
              <Link href="/billing">
                <CreditCardIcon className="size-4 opacity-70 group-hover:opacity-100 transition-all" />
                <span className="text-xs font-medium tracking-wide">
                  Billing
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              className="gap-x-4 h-10 px-4 text-destructive hover:bg-destructive/20 transition-all"
              tooltip="Log out"
            >
              <LogOutIcon className="size-4" />
              <span className="text-xs font-medium tracking-wide">Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
