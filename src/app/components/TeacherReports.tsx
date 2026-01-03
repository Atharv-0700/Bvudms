/* =====================================================
   DEPLOY CHECK – UPDATED REPORTS (REMOVE AFTER CONFIRM)
   ===================================================== */

import { User } from '../App';
import { DashboardLayout } from './DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Home, PlayCircle, BarChart3, BookOpen, Download, Filter, Users, TrendingDown, TrendingUp, Shield, Loader2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { useState, useEffect } from 'react';
import { database } from '../../config/firebase';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { toast } from 'sonner';

interface TeacherReportsProps {
  user: User;
  onLogout: () => void;
}

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  semester: number;
  division: string;
  rollNumber: string;
  attendance: number;
  totalLectures: number;
  attendedLectures: number;
  status: string;
  trend: 'up' | 'down' | 'stable';
}

export function TeacherReports({ user, onLogout }: TeacherReportsProps) {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [avgAttendance, setAvgAttendance] = useState(0);
  const [studentsAbove75, setStudentsAbove75] = useState(0);
  const [studentsAtRisk, setStudentsAtRisk] = useState(0);

  const navItems = [
    { label: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/teacher' },
    { label: 'Start Lecture', icon: <PlayCircle className="w-5 h-5" />, path: '/teacher/start-lecture' },
    { label: 'Reports', icon: <BarChart3 className="w-5 h-5" />, path: '/teacher/reports' },
    { label: 'BCA Syllabus', icon: <BookOpen className="w-5 h-5" />, path: '/teacher/syllabus' },
    { label: 'Device Security', icon: <Shield className="w-5 h-5" />, path: '/teacher/device-management' },
  ];

  useEffect(() => {
    loadStudentReports();
  }, [user.id, selectedSubject, selectedSemester]);

  const loadStudentReports = async () => {
    setLoading(true);
    try {
      const lecturesRef = ref(database, 'lectures');
      const teacherLecturesQuery = query(lecturesRef, orderByChild('teacherId'), equalTo(user.id));
      const lecturesSnapshot = await get(teacherLecturesQuery);

      if (!lecturesSnapshot.exists()) {
        setStudents([]);
        setTotalStudents(0);
        setAvgAttendance(0);
        setStudentsAbove75(0);
        setStudentsAtRisk(0);
        return;
      }

      const lecturesData = lecturesSnapshot.val();
      const filteredLectures: any = {};

      Object.entries(lecturesData).forEach(([lectureId, lecture]: [string, any]) => {
        if (
          (selectedSubject === 'all' || lecture.subject?.toLowerCase() === selectedSubject) &&
          (selectedSemester === 'all' || lecture.semester === parseInt(selectedSemester))
        ) {
          filteredLectures[lectureId] = lecture;
        }
      });

      const attendanceMap: any = {};
      Object.values(filteredLectures).forEach((lecture: any) => {
        if (lecture.students) {
          Object.keys(lecture.students).forEach(id => {
            attendanceMap[id] = (attendanceMap[id] || 0) + 1;
          });
        }
      });

      const usersSnapshot = await get(ref(database, 'users'));
      if (!usersSnapshot.exists()) return;

      const records: StudentRecord[] = [];
      Object.entries(usersSnapshot.val()).forEach(([id, u]: [string, any]) => {
        if (u.role !== 'student') return;
        const total = Object.keys(filteredLectures).length;
        if (!total) return;

        const attended = attendanceMap[id] || 0;
        const percent = Math.round((attended / total) * 100);
        records.push({
          id,
          name: u.name || 'Unknown',
          email: u.email || '',
          semester: u.semester,
          division: u.division || '',
          rollNumber: u.rollNumber || '',
          attendance: percent,
          totalLectures: total,
          attendedLectures: attended,
          status: percent >= 90 ? 'excellent' : percent >= 75 ? 'good' : percent >= 70 ? 'warning' : 'risk',
          trend: percent >= 80 ? 'up' : percent < 70 ? 'down' : 'stable',
        });
      });

      setStudents(records.sort((a, b) => a.attendance - b.attendance));
      setTotalStudents(records.length);
      setAvgAttendance(records.length ? Math.round(records.reduce((s, r) => s + r.attendance, 0) / records.length) : 0);
      setStudentsAbove75(records.filter(r => r.attendance >= 75).length);
      setStudentsAtRisk(records.filter(r => r.attendance < 70).length);
    } catch {
      toast.error('Failed to load student reports');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout} navItems={navItems}>
      <h1 style={{ color: "red", fontSize: "32px" }}>
        DEPLOY CHECK – UPDATED REPORTS
      </h1>
    </DashboardLayout>
  );
}
