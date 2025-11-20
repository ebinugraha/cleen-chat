import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";

export const AddNoteButton = memo(() => {
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <Button variant={"outline"} size={"icon-lg"} className="bg-background">
      <PlusIcon />
    </Button>
  );
});

AddNoteButton.displayName = "AddNodeButton";
