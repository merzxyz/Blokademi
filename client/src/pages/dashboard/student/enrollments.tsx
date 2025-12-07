import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  GraduationCap,
  Search,
  User,
  Calendar,
  MapPin,
  CheckCircle,
  Clock,
  X,
} from "lucide-react";

const initialEnrollments = [
  { id: "1", code: "CS301", name: "Database Systems", lecturer: "Dr. Smith", room: "B201", schedule: "Mon/Wed 09:00-11:00", credits: 3, status: "confirmed", enrolledDate: "2024-01-15" },
  { id: "2", code: "MATH201", name: "Calculus II", lecturer: "Prof. Johnson", room: "A105", schedule: "Tue/Thu 13:00-15:00", credits: 4, status: "confirmed", enrolledDate: "2024-01-15" },
  { id: "3", code: "ENG101", name: "English Composition", lecturer: "Ms. Davis", room: "C301", schedule: "Wed/Fri 10:00-12:00", credits: 3, status: "confirmed", enrolledDate: "2024-01-16" },
  { id: "4", code: "PHY201", name: "Physics II", lecturer: "Dr. Brown", room: "D102", schedule: "Thu 14:00-16:00", credits: 4, status: "pending", enrolledDate: "2024-01-18" },
  { id: "5", code: "CS201", name: "Data Structures", lecturer: "Dr. Wilson", room: "B203", schedule: "Fri 08:00-10:00", credits: 3, status: "confirmed", enrolledDate: "2024-01-14" },
];

export default function StudentEnrollments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const { toast } = useToast();

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch =
      enrollment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enrollment.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enrollment.lecturer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleUnenroll = (enrollmentId: string) => {
    const enrollment = enrollments.find((e) => e.id === enrollmentId);
    setEnrollments((prev) => prev.filter((e) => e.id !== enrollmentId));
    toast({
      title: "Unenrolled Successfully",
      description: `You have been unenrolled from ${enrollment?.code} - ${enrollment?.name}.`,
    });
  };

  const confirmedCount = enrollments.filter((e) => e.status === "confirmed").length;
  const pendingCount = enrollments.filter((e) => e.status === "pending").length;
  const totalCredits = enrollments.reduce((sum, e) => sum + e.credits, 0);

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">
            My Enrollments
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your course enrollments and view enrollment status
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-4/20">
                <CheckCircle className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold">{confirmedCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-3/20">
                <Clock className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-1/20">
                <GraduationCap className="h-5 w-5 text-chart-1" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Credits</p>
                <p className="text-2xl font-bold">{totalCredits}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-chart-2" />
              Enrolled Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by course name, code, or lecturer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-search-enrollments"
                />
              </div>
            </div>

            {filteredEnrollments.length === 0 ? (
              <div className="py-12 text-center">
                <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No enrollments found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredEnrollments.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="flex flex-col gap-4 rounded-md border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                    data-testid={`enrollment-row-${enrollment.id}`}
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{enrollment.code} - {enrollment.name}</p>
                        <Badge variant="outline" size="sm">{enrollment.credits} Credits</Badge>
                        {enrollment.status === "confirmed" ? (
                          <Badge className="bg-chart-4/20 text-chart-4" size="sm">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Confirmed
                          </Badge>
                        ) : (
                          <Badge className="bg-chart-3/20 text-chart-3" size="sm">
                            <Clock className="mr-1 h-3 w-3" />
                            Pending
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {enrollment.lecturer}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {enrollment.room}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {enrollment.schedule}
                        </span>
                      </div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          data-testid={`button-unenroll-${enrollment.id}`}
                        >
                          <X className="mr-1 h-4 w-4" />
                          Unenroll
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Unenrollment</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to unenroll from {enrollment.code} - {enrollment.name}? 
                            This action cannot be undone and you may lose your spot in the class.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel data-testid={`button-cancel-unenroll-${enrollment.id}`}>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleUnenroll(enrollment.id)}
                            data-testid={`button-confirm-unenroll-${enrollment.id}`}
                          >
                            Unenroll
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredEnrollments.length} of {enrollments.length} enrollments
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
