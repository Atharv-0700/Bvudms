import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from 'sonner';
import { Login } from './components/Login';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Syllabus } from './components/Syllabus';
import { QRScan } from './components/QRScan';
import { AttendanceHistory } from './components/AttendanceHistory';
import { StartLecture } from './components/StartLecture';
import { TeacherReports } from './components/TeacherReports';
import { TeacherSettings } from './components/TeacherSettings';
import { DeviceManagement } from './components/DeviceManagement';

// Smart Attendance System - Updated
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  semester?: number;
  subjects?: string[];
  rollNumber?: string;
  division?: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Display helpful setup message in console
    console.log('%c🎓 Smart Attendance System', 'font-size: 20px; font-weight: bold; color: #2563EB;');
    console.log('%c📊 Bharati Vidyapeeth University - BCA', 'font-size: 14px; color: #06B6D4;');
    console.log('');
    console.log('%c⚠️ IF YOU SEE FIREBASE ERRORS:', 'font-size: 16px; font-weight: bold; color: #EF4444;');
    console.log('');
    console.log('%c🔥 QUICK FIX (3 minutes):', 'font-weight: bold; color: #EAB308;');
    console.log('1. Go to: https://console.firebase.google.com/project/athgo-5b01d/database/athgo-5b01d-default-rtdb/rules');
    console.log('2. Delete all old rules');
    console.log('3. Copy from: /COPY_PASTE_FIREBASE_RULES.txt');
    console.log('4. Paste in Firebase editor');
    console.log('5. Click "Publish"');
    console.log('');
    console.log('%c📖 Detailed guides:', 'font-weight: bold; color: #22C55E;');
    console.log('   • Super Simple: /HOW_TO_FIX_FIREBASE_ERROR.md');
    console.log('   • Visual Guide: /FIREBASE_FIX_VISUAL_GUIDE.md');
    console.log('   • Complete: /FIREBASE_RULES_FIX_NOW.md');
    console.log('');
    console.log('%c✅ Your app works without this, but better with it!', 'color: #10B981;');
    console.log('');
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to={`/${user.role}`} replace />} />
          
          {/* Student Routes */}
          <Route path="/student" element={user?.role === 'student' ? <StudentDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
          <Route path="/student/qr-scan" element={user?.role === 'student' ? <QRScan user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
          <Route path="/student/attendance" element={user?.role === 'student' ? <AttendanceHistory user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
          <Route path="/student/syllabus" element={user?.role === 'student' ? <Syllabus user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
          
          {/* Teacher Routes */}
          <Route path="/teacher" element={user?.role === 'teacher' ? <TeacherDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
          <Route path="/teacher/start-lecture" element={user?.role === 'teacher' ? <StartLecture user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
          <Route path="/teacher/reports" element={user?.role === 'teacher' ? <TeacherReports user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
          <Route path="/teacher/syllabus" element={user?.role === 'teacher' ? <Syllabus user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
          <Route path="/teacher/settings" element={user?.role === 'teacher' ? <TeacherSettings user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
          <Route path="/teacher/device-management" element={user?.role === 'teacher' ? <DeviceManagement user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}