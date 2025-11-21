import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FacebookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FacebookDialog = ({ open, onOpenChange }: FacebookDialogProps) => {
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
          <p>Facebook trigger</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
