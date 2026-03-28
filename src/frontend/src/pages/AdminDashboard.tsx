import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  Loader2,
  LogOut,
  Plus,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { StudentInput } from "../backend.d";
import {
  useAddStudent,
  useAddStudents,
  useAllStudents,
  useDeleteStudent,
} from "../hooks/useQueries";

interface Props {
  onLogout: () => void;
}

const GRADE_COLORS: Record<string, string> = {
  Nursery: "bg-amber-100 text-amber-800",
  LKG: "bg-orange-100 text-orange-800",
  UKG: "bg-green-100 text-green-800",
};

function StudentsTab() {
  const { data: students = [], isLoading } = useAllStudents();
  const deleteStudent = useDeleteStudent();
  const [gradeFilter, setGradeFilter] = useState("all");

  const filtered =
    gradeFilter === "all"
      ? students
      : students.filter((s) => s.grade === gradeFilter);

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Delete student ${name}? This cannot be undone.`))
      return;
    try {
      await deleteStudent.mutateAsync(id);
      toast.success(`${name} deleted successfully.`);
    } catch {
      toast.error("Failed to delete student.");
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <h2 className="text-xl font-extrabold text-gray-800">
          All Students ({filtered.length})
        </h2>
        <Select value={gradeFilter} onValueChange={setGradeFilter}>
          <SelectTrigger
            className="w-44 rounded-xl"
            data-ocid="students.grade_filter.select"
          >
            <SelectValue placeholder="Filter by grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            <SelectItem value="Nursery">🌱 Nursery</SelectItem>
            <SelectItem value="LKG">🌿 LKG</SelectItem>
            <SelectItem value="UKG">🌳 UKG</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div
          className="flex justify-center py-16"
          data-ocid="students.loading_state"
        >
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="text-center py-16 text-gray-400"
          data-ocid="students.empty_state"
        >
          <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">No students found</p>
        </div>
      ) : (
        <div
          className="overflow-x-auto rounded-2xl border border-gray-100 shadow-card"
          data-ocid="students.table"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-extrabold">#</TableHead>
                <TableHead className="font-extrabold">Name</TableHead>
                <TableHead className="font-extrabold">Grade</TableHead>
                <TableHead className="font-extrabold">Roll No.</TableHead>
                <TableHead className="font-extrabold">Contact</TableHead>
                <TableHead className="font-extrabold">Student ID</TableHead>
                <TableHead className="font-extrabold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((student, i) => (
                <TableRow key={student.id} data-ocid={`students.row.${i + 1}`}>
                  <TableCell className="text-gray-400 text-sm">
                    {i + 1}
                  </TableCell>
                  <TableCell className="font-bold text-gray-800">
                    {student.name}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${GRADE_COLORS[student.grade] ?? "bg-gray-100 text-gray-700"}`}
                    >
                      {student.grade}
                    </span>
                  </TableCell>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>{student.contactNumber}</TableCell>
                  <TableCell>
                    <code className="text-xs bg-gray-100 rounded px-2 py-1">
                      {student.id.slice(0, 12)}...
                    </code>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="rounded-full text-xs"
                      onClick={() => handleDelete(student.id, student.name)}
                      disabled={deleteStudent.isPending}
                      data-ocid={`students.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function AddStudentTab() {
  const addStudent = useAddStudent();
  const [form, setForm] = useState<StudentInput>({
    name: "",
    grade: "",
    rollNumber: "",
    contactNumber: "",
  });
  const [createdId, setCreatedId] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<keyof StudentInput, string>>
  >({});

  function validate() {
    const e: Partial<Record<keyof StudentInput, string>> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.grade) e.grade = "Grade is required";
    if (!form.rollNumber.trim()) e.rollNumber = "Roll Number is required";
    if (!form.contactNumber.trim())
      e.contactNumber = "Contact Number is required";
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});
    try {
      const id = await addStudent.mutateAsync(form);
      setCreatedId(id);
      setForm({ name: "", grade: "", rollNumber: "", contactNumber: "" });
      toast.success("Student added successfully!");
    } catch {
      toast.error("Failed to add student. Roll number might be duplicate.");
    }
  }

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-extrabold text-gray-800 mb-6">
        Add New Student
      </h2>

      {createdId && (
        <div
          className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-5"
          data-ocid="add_student.success_state"
        >
          <p className="font-bold text-green-800">✅ Student added!</p>
          <p className="text-sm text-green-700 mt-1">
            Student ID:{" "}
            <code className="bg-white px-2 py-0.5 rounded font-mono">
              {createdId}
            </code>
          </p>
        </div>
      )}

      <div className="space-y-5 bg-white rounded-2xl shadow-card p-6">
        <div>
          <Label className="font-bold text-gray-700 mb-1 block">Name *</Label>
          <Input
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="rounded-xl"
            data-ocid="add_student.name.input"
          />
          {errors.name && (
            <p
              className="text-red-500 text-xs mt-1"
              data-ocid="add_student.name_error"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <Label className="font-bold text-gray-700 mb-1 block">Grade *</Label>
          <Select
            value={form.grade}
            onValueChange={(v) => setForm((f) => ({ ...f, grade: v }))}
          >
            <SelectTrigger
              className="rounded-xl"
              data-ocid="add_student.grade.select"
            >
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nursery">🌱 Nursery</SelectItem>
              <SelectItem value="LKG">🌿 LKG</SelectItem>
              <SelectItem value="UKG">🌳 UKG</SelectItem>
            </SelectContent>
          </Select>
          {errors.grade && (
            <p
              className="text-red-500 text-xs mt-1"
              data-ocid="add_student.grade_error"
            >
              {errors.grade}
            </p>
          )}
        </div>

        <div>
          <Label className="font-bold text-gray-700 mb-1 block">
            Roll Number *
          </Label>
          <Input
            placeholder="e.g. NUR-001"
            value={form.rollNumber}
            onChange={(e) =>
              setForm((f) => ({ ...f, rollNumber: e.target.value }))
            }
            className="rounded-xl"
            data-ocid="add_student.roll_number.input"
          />
          {errors.rollNumber && (
            <p
              className="text-red-500 text-xs mt-1"
              data-ocid="add_student.roll_error"
            >
              {errors.rollNumber}
            </p>
          )}
        </div>

        <div>
          <Label className="font-bold text-gray-700 mb-1 block">
            Contact Number *
          </Label>
          <Input
            placeholder="Parent/Guardian contact"
            value={form.contactNumber}
            onChange={(e) =>
              setForm((f) => ({ ...f, contactNumber: e.target.value }))
            }
            className="rounded-xl"
            data-ocid="add_student.contact.input"
          />
          {errors.contactNumber && (
            <p
              className="text-red-500 text-xs mt-1"
              data-ocid="add_student.contact_error"
            >
              {errors.contactNumber}
            </p>
          )}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={addStudent.isPending}
          className="w-full rounded-full h-11 font-extrabold"
          data-ocid="add_student.submit.button"
        >
          {addStudent.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Plus className="w-4 h-4 mr-2" />
          )}
          {addStudent.isPending ? "Adding..." : "Add Student"}
        </Button>
      </div>
    </div>
  );
}

function BulkUploadTab() {
  const addStudents = useAddStudents();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [parsed, setParsed] = useState<StudentInput[]>([]);
  const [parseError, setParseError] = useState("");
  const [results, setResults] = useState<{
    success: number;
    failed: number;
    errors: string[];
  } | null>(null);
  const [dragging, setDragging] = useState(false);

  function parseCSV(text: string) {
    setParseError("");
    setParsed([]);
    setResults(null);
    const lines = text.trim().split("\n").filter(Boolean);
    if (lines.length < 2) {
      setParseError("CSV must have a header row and at least one data row.");
      return;
    }

    const rows: StudentInput[] = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(",").map((c) => c.trim());
      if (cols.length < 4) {
        setParseError(`Row ${i + 1}: not enough columns (expected 4).`);
        return;
      }
      rows.push({
        name: cols[0],
        grade: cols[1],
        rollNumber: cols[2],
        contactNumber: cols[3],
      });
    }
    setParsed(rows);
  }

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => parseCSV(e.target?.result as string);
    reader.readAsText(file);
  }

  async function handleUpload() {
    if (parsed.length === 0) return;
    try {
      const res = await addStudents.mutateAsync(parsed);
      const success = res.filter((r) => r.success).length;
      const failed = res.filter((r) => !r.success).length;
      const errors = res.filter((r) => !r.success).map((r) => r.message);
      setResults({ success, failed, errors });
      setParsed([]);
      toast.success(`Bulk upload: ${success} added, ${failed} failed.`);
    } catch {
      toast.error("Bulk upload failed.");
    }
  }

  function downloadTemplate() {
    const csv =
      "Name,Grade,RollNumber,ContactNumber\nAnya Sharma,Nursery,NUR-001,9876543210\nRohan Verma,LKG,LKG-001,9876543211\n";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-gray-800">
          Bulk Upload Students
        </h2>
        <Button
          variant="outline"
          onClick={downloadTemplate}
          className="rounded-full text-xs font-bold"
          data-ocid="bulk_upload.template.button"
        >
          <Download className="w-3.5 h-3.5 mr-1" /> Download Template
        </Button>
      </div>

      {/* Format Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-5">
        <p className="font-bold text-blue-800 text-sm mb-2">
          📋 Expected CSV Format:
        </p>
        <code className="text-xs text-blue-700 block">
          Name, Grade, RollNumber, ContactNumber
        </code>
        <code className="text-xs text-blue-600 block mt-1">
          Anya Sharma, Nursery, NUR-001, 9876543210
        </code>
        <p className="text-xs text-blue-600 mt-2">
          Grade must be: Nursery, LKG, or UKG
        </p>
      </div>

      {/* Drop zone */}
      <button
        type="button"
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files[0];
          if (f) handleFile(f);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full border-2 border-dashed rounded-2xl p-10 flex flex-col items-center cursor-pointer transition-colors ${
          dragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/30"
        }`}
        data-ocid="bulk_upload.dropzone"
      >
        <Upload className="w-10 h-10 text-gray-400 mb-3" />
        <p className="font-bold text-gray-600">Drag & drop CSV file here</p>
        <p className="text-sm text-gray-400 mt-1">or click to browse</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
          data-ocid="bulk_upload.upload_button"
        />
      </button>

      {parseError && (
        <div
          className="bg-red-50 border border-red-200 rounded-xl p-3 mt-4 text-red-700 text-sm font-semibold"
          data-ocid="bulk_upload.error_state"
        >
          ⚠️ {parseError}
        </div>
      )}

      {parsed.length > 0 && (
        <div className="mt-6">
          <h3 className="font-extrabold text-gray-700 mb-3">
            Preview ({parsed.length} students)
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-card mb-4">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Roll No.</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parsed.map((s, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: CSV preview row
                  <TableRow key={i} data-ocid={`bulk_upload.row.${i + 1}`}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-bold ${GRADE_COLORS[s.grade] ?? "bg-gray-100 text-gray-700"}`}
                      >
                        {s.grade}
                      </span>
                    </TableCell>
                    <TableCell>{s.rollNumber}</TableCell>
                    <TableCell>{s.contactNumber}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button
            onClick={handleUpload}
            disabled={addStudents.isPending}
            className="rounded-full font-extrabold"
            data-ocid="bulk_upload.submit.button"
          >
            {addStudents.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {addStudents.isPending
              ? "Uploading..."
              : `Upload ${parsed.length} Students`}
          </Button>
        </div>
      )}

      {results && (
        <div
          className="mt-6 bg-white rounded-2xl shadow-card p-5"
          data-ocid="bulk_upload.success_state"
        >
          <h3 className="font-extrabold text-gray-700 mb-3">Upload Results</h3>
          <div className="flex gap-4 mb-3">
            <div className="bg-green-50 rounded-xl px-4 py-2 text-center">
              <p className="text-2xl font-black text-green-700">
                {results.success}
              </p>
              <p className="text-xs text-green-600 font-semibold">Added</p>
            </div>
            <div className="bg-red-50 rounded-xl px-4 py-2 text-center">
              <p className="text-2xl font-black text-red-700">
                {results.failed}
              </p>
              <p className="text-xs text-red-600 font-semibold">Failed</p>
            </div>
          </div>
          {results.errors.length > 0 && (
            <div className="space-y-1">
              {results.errors.map((e, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: error list
                <p key={i} className="text-xs text-red-600">
                  • {e}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard({ onLogout }: Props) {
  return (
    <div className="min-h-screen font-nunito bg-background">
      <header className="bg-black text-white shadow-hero sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/assets/generated/classio-kids-logo-transparent.dim_400x120.png"
              alt="Classio Kids"
              className="h-12 w-auto object-contain"
            />
          </div>
          <Button
            variant="outline"
            onClick={onLogout}
            className="rounded-full text-xs font-bold bg-white/10 border-white/30 text-white hover:bg-white/20"
            data-ocid="admin.logout.button"
          >
            <LogOut className="w-3.5 h-3.5 mr-1" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Tabs defaultValue="students">
            <TabsList
              className="mb-6 rounded-2xl p-1 bg-white shadow-card"
              data-ocid="admin.tabs"
            >
              <TabsTrigger
                value="students"
                className="rounded-xl font-bold"
                data-ocid="admin.students.tab"
              >
                <Users className="w-4 h-4 mr-2" /> Students
              </TabsTrigger>
              <TabsTrigger
                value="add"
                className="rounded-xl font-bold"
                data-ocid="admin.add_student.tab"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Student
              </TabsTrigger>
              <TabsTrigger
                value="bulk"
                className="rounded-xl font-bold"
                data-ocid="admin.bulk_upload.tab"
              >
                <Upload className="w-4 h-4 mr-2" /> Bulk Upload
              </TabsTrigger>
            </TabsList>

            <TabsContent value="students">
              <StudentsTab />
            </TabsContent>
            <TabsContent value="add">
              <AddStudentTab />
            </TabsContent>
            <TabsContent value="bulk">
              <BulkUploadTab />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
