import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardTitle, CardContent } from "./ui/card";

interface ProjectDetails {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: {
    id: string;
    title: string;
    cover: string;
    description: string;
    dateStarted: string;
  };
}

export function ProjectDialog({
  open,
  onOpenChange,
  request,
}: ProjectDetails) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <Card className="border-gray-500/50">
          <div className="aspect-video overflow-hidden bg-gray-100">
            <img src={request.cover} className="h-full w-full" />
          </div>
          <CardContent className="px-5 pt-4">
            <CardTitle className="font-semibold text-3xl text-black mb-1">
              {request.title}
            </CardTitle>
            <p className="text-sm text-gray-600 mb-4">    {request.description}</p>
            <span className=" text-sm">Date Started: {request.dateStarted}</span>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
