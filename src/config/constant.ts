import { FolderOpenIcon, HistoryIcon, KeyIcon } from "lucide-react";

/**
 * @constant menuItems untuk items yang ada di sidebar
 */
export const menuItems = [
  {
    title: "Workflows",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        url: "/workflows",
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials",
      },
      {
        title: "Executions",
        icon: HistoryIcon,
        url: "/executions",
      },
    ],
  },
];

/**
 * @constant PAGINATION constant pagination
 *
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 5,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 1,
};
