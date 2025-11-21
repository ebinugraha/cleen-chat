import { NodeTypeOption } from "@/components/node-selector";
import { NodeType } from "@/generated/prisma/enums";
import {
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  SparkleIcon,
} from "lucide-react";

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

export const triggerNodes: NodeTypeOption[] = [
  {
    label: "Facebook Trigger",
    description:
      "Gunakan simpul Pemicu Facebook untuk memicu alur kerja saat peristiwa terjadi di Facebook.",
    icon: "/logos/facebook.svg",
    type: NodeType.FACEBOOK_TRIGGER,
  },
];

export const actionsNodes: NodeTypeOption[] = [
  {
    label: "Judol Detector",
    description: "Cek teks apakah ini komentar judi online atau bukan",
    icon: SparkleIcon,
    type: NodeType.JUDOL_DETECTOR,
  },
];
