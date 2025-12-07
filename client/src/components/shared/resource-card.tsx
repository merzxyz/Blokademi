import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Users, GraduationCap, BookOpen, Edit, Eye, Trash2 } from "lucide-react";

interface RoomCardProps {
  id: string;
  name: string;
  building: string;
  floor: number;
  capacity: number;
  facilities: string;
  isAvailable: boolean;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
}

interface ClassCardProps {
  id: string;
  name: string;
  code: string;
  credits: number;
  semester: string;
  maxStudents: number;
  description?: string | null;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
}

interface LecturerCardProps {
  id: string;
  name: string;
  department: string;
  specialization?: string | null;
  walletAddress: string;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
}

export function RoomCard({ id, name, building, floor, capacity, facilities, isAvailable, onEdit, onView }: RoomCardProps) {
  return (
    <Card className="hover-elevate" data-testid={`card-room-${id}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-1/20">
              <Building2 className="h-5 w-5 text-chart-1" />
            </div>
            <div>
              <CardTitle className="text-base">{name}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {building}, Floor {floor}
              </p>
            </div>
          </div>
          <Badge variant={isAvailable ? "default" : "secondary"}>
            {isAvailable ? "Available" : "In Use"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>Capacity: {capacity} students</span>
        </div>
        {facilities && (
          <div className="flex flex-wrap gap-1">
            {facilities.split(",").map((facility, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {facility.trim()}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex gap-2 pt-2">
          {onView && (
            <Button variant="outline" size="sm" className="flex-1" onClick={() => onView(id)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
          )}
          {onEdit && (
            <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(id)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function ClassCard({ id, name, code, credits, semester, maxStudents, description, onEdit, onView }: ClassCardProps) {
  return (
    <Card className="hover-elevate" data-testid={`card-class-${id}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-2/20">
              <BookOpen className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <CardTitle className="text-base">{name}</CardTitle>
              <p className="font-mono text-xs text-muted-foreground">{code}</p>
            </div>
          </div>
          <Badge variant="outline">{semester}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span>{credits} Credits</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>Max {maxStudents}</span>
          </div>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}
        <div className="flex gap-2 pt-2">
          {onView && (
            <Button variant="outline" size="sm" className="flex-1" onClick={() => onView(id)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
          )}
          {onEdit && (
            <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(id)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function LecturerCard({ id, name, department, specialization, walletAddress, onEdit, onView }: LecturerCardProps) {
  const truncatedAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
  
  return (
    <Card className="hover-elevate" data-testid={`card-lecturer-${id}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-3/20">
            <span className="text-sm font-semibold text-chart-3">
              {name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </span>
          </div>
          <div className="flex-1">
            <CardTitle className="text-base">{name}</CardTitle>
            <p className="text-xs text-muted-foreground">{department}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {specialization && (
          <Badge variant="outline" className="text-xs">
            {specialization}
          </Badge>
        )}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Wallet:</span>
          <code className="font-mono text-xs">{truncatedAddress}</code>
        </div>
        <div className="flex gap-2 pt-2">
          {onView && (
            <Button variant="outline" size="sm" className="flex-1" onClick={() => onView(id)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
          )}
          {onEdit && (
            <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(id)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
