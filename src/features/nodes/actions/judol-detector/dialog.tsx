import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface JudolDetectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const JudolDetectorDialog = ({
  open,
  onOpenChange,
}: JudolDetectorDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Facebook Trigger</DialogTitle>
          <DialogDescription>
            Konfigurasi setting facebook trigger anda
          </DialogDescription>
        </DialogHeader>
        <div>
          <p>Judol detector trigger</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
