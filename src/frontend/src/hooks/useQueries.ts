import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Student, StudentInput } from "../backend.d";
import { useActor } from "./useActor";

export function useAllStudents() {
  const { actor, isFetching } = useActor();
  return useQuery<Student[]>({
    queryKey: ["students"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStudents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useStudentsByGrade(grade: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Student[]>({
    queryKey: ["students", grade],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStudentsByGrade(grade);
    },
    enabled: !!actor && !isFetching && !!grade,
  });
}

export function useAddStudent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (student: StudentInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.addStudent(student);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
}

export function useAddStudents() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (students: StudentInput[]) => {
      if (!actor) throw new Error("Not connected");
      return actor.addStudents(students);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
}

export function useDeleteStudent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteStudent(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
}
