import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import type { Student } from "./backend.d";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import type { Page } from "./pages/LandingPage";
import StudentDashboard from "./pages/StudentDashboard";
import StudentLogin from "./pages/StudentLogin";

export default function App() {
  const { clear } = useInternetIdentity();
  const [page, setPage] = useState<Page>("student-login");
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>();
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  function navigate(newPage: Page, grade?: string) {
    setPage(newPage);
    if (grade) setSelectedGrade(grade);
  }

  function handleStudentLogin(student: Student) {
    setCurrentStudent(student);
    setPage("student-dashboard");
  }

  function handleStudentLogout() {
    setCurrentStudent(null);
    setPage("student-login");
  }

  function handleAdminLogin() {
    setPage("admin-dashboard");
  }

  function handleAdminLogout() {
    clear();
    setPage("student-login");
  }

  return (
    <>
      <Toaster richColors position="top-right" />
      {page === "student-login" && (
        <StudentLogin
          initialGrade={selectedGrade}
          onLogin={handleStudentLogin}
          onBack={() => setPage("student-login")}
          onNavigate={navigate}
        />
      )}
      {page === "student-dashboard" && currentStudent && (
        <StudentDashboard
          student={currentStudent}
          onLogout={handleStudentLogout}
        />
      )}
      {page === "admin-login" && (
        <AdminLogin
          onAdminLogin={handleAdminLogin}
          onBack={() => setPage("student-login")}
          onNavigate={navigate}
        />
      )}
      {page === "admin-dashboard" && (
        <AdminDashboard onLogout={handleAdminLogout} />
      )}
    </>
  );
}
