import { User } from '../App';
import { DashboardLayout } from './DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Home, PlayCircle, BarChart3, BookOpen, Download, Filter, Users, TrendingDown, TrendingUp, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface TeacherReportsProps {
  user: User;
  onLogout: () => void;
}

export function TeacherReports({ user, onLogout }: TeacherReportsProps) {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');

  const navItems = [
    { label: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/teacher' },
    { label: 'Start Lecture', icon: <PlayCircle className="w-5 h-5" />, path: '/teacher/start-lecture' },
    { label: 'Reports', icon: <BarChart3 className="w-5 h-5" />, path: '/teacher/reports' },
    { label: 'BCA Syllabus', icon: <BookOpen className="w-5 h-5" />, path: '/teacher/syllabus' },
    { label: 'Device Security', icon: <Shield className="w-5 h-5" />, path: '/teacher/device-management' },
  ];

  const students = [
    { id: 1, name: 'Aarav Kumar', semester: 3, attendance: 85, status: 'good', trend: 'up' },
    { id: 2, name: 'Diya Patel', semester: 3, attendance: 78, status: 'good', trend: 'stable' },
    { id: 3, name: 'Arjun Singh', semester: 3, attendance: 68, status: 'warning', trend: 'down' },
    { id: 4, name: 'Ananya Sharma', semester: 5, attendance: 92, status: 'excellent', trend: 'up' },
    { id: 5, name: 'Rohan Gupta', semester: 5, attendance: 65, status: 'risk', trend: 'down' },
    { id: 6, name: 'Ishita Verma', semester: 3, attendance: 88, status: 'good', trend: 'up' },
    { id: 7, name: 'Kabir Reddy', semester: 5, attendance: 72, status: 'warning', trend: 'stable' },
    { id: 8, name: 'Myra Joshi', semester: 3, attendance: 95, status: 'excellent', trend: 'up' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-success/10 text-success border-success/20';
      case 'good':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'risk':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (attendance: number) => {
    if (attendance >= 90) return 'Excellent';
    if (attendance >= 75) return 'Good';
    if (attendance >= 70) return 'Warning';
    return 'At Risk';
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout} navItems={navItems}>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Student Reports</h1>
            <p className="text-muted-foreground mt-1">Track and analyze student attendance</p>
          </div>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <CardTitle>Filters</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {user.subjects?.map((subject) => (
                    <SelectItem key={subject} value={subject.toLowerCase()}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="All Semesters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  {[1, 2, 3, 4, 5, 6].map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold mt-2">{students.length}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Attendance</p>
                  <p className="text-3xl font-bold mt-2">80%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Above 75%</p>
                  <p className="text-3xl font-bold mt-2">6</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">At Risk</p>
                  <p className="text-3xl font-bold mt-2">2</p>
                </div>
                <TrendingDown className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student List */}
        <Card>
          <CardHeader>
            <CardTitle>Student Attendance List</CardTitle>
            <CardDescription>Detailed attendance records for all students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">Semester {student.semester}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold">{student.attendance}%</p>
                      <p className="text-xs text-muted-foreground">Attendance</p>
                    </div>

                    <Badge className={getStatusColor(student.status)} variant="outline">
                      {getStatusLabel(student.attendance)}
                    </Badge>

                    <div className="w-6">
                      {student.trend === 'up' && <TrendingUp className="w-5 h-5 text-success" />}
                      {student.trend === 'down' && <TrendingDown className="w-5 h-5 text-destructive" />}
                      {student.trend === 'stable' && <div className="w-5 h-px bg-muted-foreground" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}