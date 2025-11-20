/**
 * @returns mengembalikan app header
 */

import { SidebarTrigger } from "./ui/sidebar";

export const AppHeader = () => {
  return (
    <header className="flex h-[57px] shrink-0 items-center border-b px-4 gap-2">
      <SidebarTrigger />
    </header>
  );
};
