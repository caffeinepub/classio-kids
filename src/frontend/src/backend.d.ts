import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface StudentInput {
    name: string;
    grade: string;
    rollNumber: string;
    contactNumber: string;
}
export interface BulkCreateResult {
    message: string;
    student?: Student;
    success: boolean;
}
export interface UserProfile {
    studentId?: string;
    name: string;
}
export interface Student {
    id: string;
    name: string;
    createdAt: bigint;
    grade: string;
    rollNumber: string;
    contactNumber: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addStudent(student: StudentInput): Promise<string>;
    addStudents(studentInputs: Array<StudentInput>): Promise<Array<BulkCreateResult>>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteStudent(id: string): Promise<void>;
    getAllStudents(): Promise<Array<Student>>;
    getAllValidStudents(): Promise<Array<Student>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getStudentById(id: string): Promise<Student | null>;
    getStudentsByGrade(grade: string): Promise<Array<Student>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isRollNumberDuplicate(rollNumber: string): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    studentLogin(rollNumber: string, grade: string): Promise<Student>;
}
