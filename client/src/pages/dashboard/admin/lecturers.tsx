import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { LecturerCard } from "@/components/shared/resource-card";
import { Plus, Search, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockLecturers = [
  { id: "1", name: "Dr. John Smith", department: "Computer Science", specialization: "Artificial Intelligence", walletAddress: "0x1234567890abcdef1234567890abcdef12345678" },
  { id: "2", name: "Prof. Jane Doe", department: "Mathematics", specialization: "Applied Mathematics", walletAddress: "0xabcdef1234567890abcdef1234567890abcdef12" },
  { id: "3", name: "Dr. Robert Brown", department: "Physics", specialization: "Quantum Mechanics", walletAddress: "0x9876543210fedcba9876543210fedcba98765432" },
  { id: "4", name: "Ms. Emily White", department: "English", specialization: "Academic Writing", walletAddress: "0xfedcba9876543210fedcba9876543210fedcba98" },
  { id: "5", name: "Dr. Michael Green", department: "Computer Science", specialization: "Database Systems", walletAddress: "0x5678901234abcdef5678901234abcdef56789012" },
  { id: "6", name: "Prof. Sarah Johnson", department: "Mathematics", specialization: "Linear Algebra", walletAddress: "0x2468ace02468ace02468ace02468ace024680246" },
];

export default function AdminLecturers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredLecturers = mockLecturers.filter((lecturer) =>
    lecturer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lecturer.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (lecturer.specialization && lecturer.specialization.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateLecturer = () => {
    toast({
      title: "Lecturer Added",
      description: "The lecturer has been registered on the blockchain.",
    });
    setCreateDialogOpen(false);
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">Lecturer Management</h1>
            <p className="text-muted-foreground">Register and manage lecturer accounts</p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" data-testid="button-add-lecturer">
                <Plus className="h-4 w-4" />
                Add Lecturer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Lecturer</DialogTitle>
                <DialogDescription>
                  Register a new lecturer. Wallet address is required for authentication.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="e.g., Dr. John Smith" data-testid="input-lecturer-name" />
                </div>
                <div className="space-y-2">
                  <Label>Wallet Address</Label>
                  <Input placeholder="0x..." className="font-mono" data-testid="input-wallet-address" />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Input placeholder="e.g., Computer Science" data-testid="input-department" />
                </div>
                <div className="space-y-2">
                  <Label>Specialization</Label>
                  <Input placeholder="e.g., Artificial Intelligence" data-testid="input-specialization" />
                </div>
                <div className="space-y-2">
                  <Label>Email (Optional)</Label>
                  <Input type="email" placeholder="lecturer@university.edu" data-testid="input-email" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateLecturer} data-testid="button-submit-lecturer">
                  Add Lecturer
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
                placeholder="Search lecturers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-search-lecturers"
              />
            </div>
          </CardContent>
        </Card>

        {filteredLecturers.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLecturers.map((lecturer) => (
              <LecturerCard key={lecturer.id} {...lecturer} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold">No Lecturers Found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                No lecturers match your search criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
