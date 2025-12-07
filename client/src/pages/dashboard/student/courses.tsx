import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen,
  Search,
  User,
  Clock,
  GraduationCap,
  Plus,
  CheckCircle,
} from "lucide-react";

const availableCourses = [
  { id: "1", code: "CS401", name: "Machine Learning", lecturer: "Dr. Anderson", credits: 4, seats: 30, enrolled: 25, category: "Computer Science", isEnrolled: false },
  { id: "2", code: "CS402", name: "Artificial Intelligence", lecturer: "Dr. Williams", credits: 4, seats: 25, enrolled: 20, category: "Computer Science", isEnrolled: false },
  { id: "3", code: "MATH301", name: "Linear Algebra", lecturer: "Prof. Taylor", credits: 3, seats: 40, enrolled: 35, category: "Mathematics", isEnrolled: false },
  { id: "4", code: "PHY301", name: "Quantum Mechanics", lecturer: "Dr. Miller", credits: 4, seats: 20, enrolled: 18, category: "Physics", isEnrolled: false },
  { id: "5", code: "ENG201", name: "Technical Writing", lecturer: "Ms. Garcia", credits: 2, seats: 35, enrolled: 30, category: "English", isEnrolled: false },
  { id: "6", code: "CS301", name: "Database Systems", lecturer: "Dr. Smith", credits: 3, seats: 30, enrolled: 30, category: "Computer Science", isEnrolled: true },
  { id: "7", code: "MATH201", name: "Calculus II", lecturer: "Prof. Johnson", credits: 4, seats: 40, enrolled: 40, category: "Mathematics", isEnrolled: true },
];

const categories = ["All Categories", "Computer Science", "Mathematics", "Physics", "English"];

export default function StudentCourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [courses, setCourses] = useState(availableCourses);
  const { toast } = useToast();

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.lecturer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEnroll = (courseId: string) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? { ...course, isEnrolled: true, enrolled: course.enrolled + 1 }
          : course
      )
    );
    const course = courses.find((c) => c.id === courseId);
    toast({
      title: "Enrollment Requested",
      description: `Your enrollment request for ${course?.code} - ${course?.name} has been submitted.`,
    });
  };

  const getAvailabilityColor = (seats: number, enrolled: number) => {
    const remaining = seats - enrolled;
    if (remaining === 0) return "text-destructive";
    if (remaining <= 5) return "text-chart-3";
    return "text-chart-4";
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">
            Course Selection
          </h1>
          <p className="mt-1 text-muted-foreground">
            Browse and enroll in available courses for the semester
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-chart-4" />
              Available Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by course name, code, or lecturer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-search-courses"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48" data-testid="select-category-filter">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} data-testid={`option-category-${category.toLowerCase().replace(/\s+/g, "-")}`}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {filteredCourses.length === 0 ? (
              <div className="py-12 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No courses found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex flex-col gap-4 rounded-md border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                    data-testid={`course-row-${course.id}`}
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{course.code} - {course.name}</p>
                        <Badge variant="outline" size="sm">{course.credits} Credits</Badge>
                        <Badge variant="secondary" size="sm">{course.category}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {course.lecturer}
                        </span>
                        <span className={`flex items-center gap-1 ${getAvailabilityColor(course.seats, course.enrolled)}`}>
                          <GraduationCap className="h-3 w-3" />
                          {course.seats - course.enrolled} seats available
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {course.isEnrolled ? (
                        <Badge className="bg-chart-4/20 text-chart-4">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Enrolled
                        </Badge>
                      ) : course.seats - course.enrolled === 0 ? (
                        <Badge variant="destructive">Full</Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleEnroll(course.id)}
                          data-testid={`button-enroll-${course.id}`}
                        >
                          <Plus className="mr-1 h-4 w-4" />
                          Enroll
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredCourses.length} of {courses.length} courses
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
