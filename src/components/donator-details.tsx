import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Mail, PhoneIcon } from "lucide-react";
import { Card, CardTitle, CardContent, CardHeader } from "./ui/card";
interface DonatorDetails {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: {
    donorName: string;
    city: string;
    image: string;
    rank: string;
    email: string;
    phone: string;
  };
}

export function DonatorDetails({
  open,
  onOpenChange,
  request,
}: DonatorDetails) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <Card className="mt-6 border-gray-500/50">
          <CardHeader>
            <CardTitle>About the Donator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src="/placeholder.svg?height=48&width=48"
                  alt={request.image}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{request.donorName}</p>
                <p className="text-sm text-gray-500">Member since 2022</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Rank</span>
                <span className="font-medium">{request.rank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">City</span>
                <span className="font-medium">{request.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="font-medium">{request.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span className="font-medium">{request.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
