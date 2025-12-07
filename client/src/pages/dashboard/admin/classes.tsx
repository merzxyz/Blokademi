import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ClassCard } from "@/components/shared/resource-card";
import { Plus, Search, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockClasses = [
  { id: "1", name: "Introduction to Programming", code: "CS101", credits: 3, semester: "2024-1", maxStudents: 40, description: "Fundamental programming concepts using Python" },
  { id: "2", name: "Calculus II", code: "MATH201", credits: 4, semester: "2024-1", maxStudents: 60, description: "Advanced calculus including integration techniques" },
  { id: "3", name: "Physics I", code: "PHY101", credits: 3, semester: "2024-1", maxStudents: 45, description: "Mechanics and thermodynamics fundamentals" },
  { id: "4", name: "Database Systems", code: "CS301", credits: 3, semester: "2024-1", maxStudents: 35, description: "Relational database design and SQL" },
  { id: "5", name: "English Composition", code: "ENG101", credits: 2, semester: "2024-1", maxStudents: 30, description: "Academic writing and communication skills" },
  { id: "6", name: "Linear Algebra", code: "MATH202", credits: 3, semester: "2024-1", maxStudents: 50, description: "Vector spaces, matrices, and linear transformations" },
];

export default function AdminClasses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredClasses = mockClasses.filter((cls) =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateClass = () => {
    toast({
      title: "Class Created",
      description: "The class has been recorded on the blockchain.",
    });
    setCreateDialogOpen(false);
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">Class Management</h1>
            <p className="text-muted-foreground">Create and manage course classes</p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" data-testid="button-create-class">
                <Plus className="h-4 w-4" />
                Add Class
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Class</DialogTitle>
                <DialogDescription>
                  Add a new course class. Class data will be stored on the blockchain.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Class Name</Label>
                  <Input placeholder="e.g., Introduction to Programming" data-testid="input-class-name" />
                </div>
                <div className="space-y-2">
                  <Label>Course Code</Label>
                  <Input placeholder="e.g., CS101" data-testid="input-class-code" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Credits</Label>
                    <Input type="number" placeholder="3" data-testid="input-credits" />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Students</Label>
                    <Input type="number" placeholder="40" data-testid="input-max-students" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Semester</Label>
                  <Input placeholder="e.g., 2024-1" data-testid="input-semester" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Brief description of the course..." data-testid="input-description" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateClass} data-testid="button-submit-class">
                  Add Class
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
                placeholder="Search classes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-search-classes"
              />
            </div>
          </CardContent>
        </Card>

        {filteredClasses.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredClasses.map((cls) => (
              <ClassCard key={cls.id} {...cls} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <BookOpen className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold">No Classes Found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                No classes match your search criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
