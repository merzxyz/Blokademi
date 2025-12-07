import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { RoomCard } from "@/components/shared/resource-card";
import { Plus, Search, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockRooms = [
  { id: "1", name: "Room A101", building: "Main Building", floor: 1, capacity: 40, facilities: "Projector, Whiteboard, AC", isAvailable: true },
  { id: "2", name: "Room A105", building: "Main Building", floor: 1, capacity: 60, facilities: "Projector, Whiteboard, AC, Sound System", isAvailable: true },
  { id: "3", name: "Room B201", building: "Science Building", floor: 2, capacity: 35, facilities: "Projector, Lab Equipment, AC", isAvailable: false },
  { id: "4", name: "Room B205", building: "Science Building", floor: 2, capacity: 50, facilities: "Projector, Whiteboard, AC", isAvailable: true },
  { id: "5", name: "Room C301", building: "Engineering Building", floor: 3, capacity: 80, facilities: "Projector, Whiteboard, AC, Computers", isAvailable: true },
  { id: "6", name: "Room C305", building: "Engineering Building", floor: 3, capacity: 45, facilities: "Projector, Whiteboard", isAvailable: true },
];

export default function AdminRooms() {
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredRooms = mockRooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.building.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateRoom = () => {
    toast({
      title: "Room Created",
      description: "The room has been recorded on the blockchain.",
    });
    setCreateDialogOpen(false);
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">Room Management</h1>
            <p className="text-muted-foreground">Create and manage classroom resources</p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" data-testid="button-create-room">
                <Plus className="h-4 w-4" />
                Add Room
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Room</DialogTitle>
                <DialogDescription>
                  Add a new classroom to the system. Room data will be stored on the blockchain.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Room Name</Label>
                  <Input placeholder="e.g., Room A101" data-testid="input-room-name" />
                </div>
                <div className="space-y-2">
                  <Label>Building</Label>
                  <Input placeholder="e.g., Main Building" data-testid="input-building" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Floor</Label>
                    <Input type="number" placeholder="1" data-testid="input-floor" />
                  </div>
                  <div className="space-y-2">
                    <Label>Capacity</Label>
                    <Input type="number" placeholder="40" data-testid="input-capacity" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Facilities</Label>
                  <Input placeholder="e.g., Projector, Whiteboard, AC" data-testid="input-facilities" />
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="available" defaultChecked />
                  <Label htmlFor="available">Available for scheduling</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateRoom} data-testid="button-submit-room">
                  Add Room
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-search-rooms"
              />
            </div>
          </CardContent>
        </Card>

        {filteredRooms.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} {...room} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Building2 className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold">No Rooms Found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                No rooms match your search criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
