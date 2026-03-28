import Text "mo:core/Text";
import List "mo:core/List";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Grade = {
    #nursery;
    #lkg;
    #ukg;
  };

  type Student = {
    id : Text;
    name : Text;
    grade : Text;
    rollNumber : Text;
    contactNumber : Text;
    createdAt : Int;
  };

  module Student {
    func validGrade(student : Student) : Bool {
      switch (student.grade.trimStart(#char ' ').trimEnd(#char ' ')) {
        case ("Nursery") { true };
        case ("LKG") { true };
        case ("UKG") { true };
        case (_) { false };
      };
    };

    func validRollNumber(student : Student) : Bool {
      let r = student.rollNumber.trimStart(#char ' ').trimEnd(#char ' ');
      r.size() > 0;
    };

    public func isValid(student : Student) : Bool {
      validGrade(student) and validRollNumber(student);
    };

    public func compare(student1 : Student, student2 : Student) : Order.Order {
      Text.compare(student1.id, student2.id);
    };
  };

  type StudentInput = {
    name : Text;
    grade : Text;
    rollNumber : Text;
    contactNumber : Text;
  };

  type BulkCreateResult = {
    success : Bool;
    student : ?Student;
    message : Text;
  };

  public type UserProfile = {
    name : Text;
    studentId : ?Text;
  };

  let students = Map.empty<Text, Student>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let studentPrincipals = Map.empty<Text, Principal>();

  let idCounter = Map.empty<Text, Int>();

  // User Profile Management (required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Admin-only: Check for duplicate roll numbers
  public query ({ caller }) func isRollNumberDuplicate(rollNumber : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    students.values().toArray().any(
      func(s) { Text.equal(s.rollNumber, rollNumber) }
    );
  };

  // Helper to generate unique student ID
  func generateStudentId(grade : Text) : Text {
    let count = switch (idCounter.get(grade)) {
      case (null) { 1 };
      case (?c) { c + 1 };
    };
    let id = grade # "-" # count.toText();
    idCounter.add(grade, count);
    id;
  };

  // Add new student (Admin only)
  public shared ({ caller }) func addStudent(student : StudentInput) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    // Check if roll number already exists
    if (students.values().toArray().any(func(s) { Text.equal(s.rollNumber, student.rollNumber) })) {
      Runtime.trap("Student with same roll number already exists. ");
    };

    let id = generateStudentId(student.grade);
    let newStudent : Student = {
      id;
      name = student.name;
      grade = student.grade;
      rollNumber = student.rollNumber;
      contactNumber = student.contactNumber;
      createdAt = Time.now();
    };

    students.add(id, newStudent);
    id;
  };

  // Add multiple students (Admin only)
  public shared ({ caller }) func addStudents(studentInputs : [StudentInput]) : async [BulkCreateResult] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let results = List.empty<BulkCreateResult>();

    for (input in studentInputs.values()) {
      if (
        students.values().toArray().any(
          func(s) { Text.equal(s.rollNumber, input.rollNumber) }
        )
      ) {
        results.add({
          success = false;
          student = null;
          message = "Duplicate roll number found";
        });
      } else {
        let id = generateStudentId(input.grade);
        let newStudent : Student = {
          id;
          name = input.name;
          grade = input.grade;
          rollNumber = input.rollNumber;
          contactNumber = input.contactNumber;
          createdAt = Time.now();
        };

        students.add(id, newStudent);

        results.add({
          success = true;
          student = ?newStudent;
          message = "Student added successfully";
        });
      };
    };

    results.toArray();
  };

  // Get all students (Admin only)
  public query ({ caller }) func getAllStudents() : async [Student] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    students.values().toArray().sort();
  };

  // Get students by grade (Admin only)
  public query ({ caller }) func getStudentsByGrade(grade : Text) : async [Student] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    students.values().toArray().filter(
      func(student) {
        Text.equal(student.grade, grade);
      }
    );
  };

  // Delete student (Admin only)
  public shared ({ caller }) func deleteStudent(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    if (not students.containsKey(id)) {
      Runtime.trap("Student does not exist! ");
    };
    students.remove(id);
    
    // Also remove the principal mapping if exists
    studentPrincipals.remove(id);
  };

  // Student login - returns student data and associates principal with student
  // Students can only login as themselves (verified by roll number + grade)
  public shared ({ caller }) func studentLogin(rollNumber : Text, grade : Text) : async Student {
    // Find the student by roll number and grade
    switch (students.values().toArray().find(func(stud) { Text.equal(stud.rollNumber, rollNumber) and Text.equal(stud.grade, grade) })) {
      case (null) { Runtime.trap("Roll no. and grade are not correct! ") };
      case (?student) {
        // Associate this principal with the student ID for future authorization
        studentPrincipals.add(student.id, caller);
        
        // Create or update user profile
        let profile : UserProfile = {
          name = student.name;
          studentId = ?student.id;
        };
        userProfiles.add(caller, profile);
        
        student;
      };
    };
  };

  // Get student by ID - students can only view their own data, admins can view all
  public query ({ caller }) func getStudentById(id : Text) : async ?Student {
    // Check if caller is admin
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return students.get(id);
    };
    
    // Check if caller is the student themselves
    switch (studentPrincipals.get(id)) {
      case (?studentPrincipal) {
        if (Principal.equal(caller, studentPrincipal)) {
          return students.get(id);
        };
      };
      case (null) {};
    };
    
    // Not authorized
    Runtime.trap("Unauthorized: Can only view your own student record");
  };

  // Helper function to get only valid students (Admin only)
  public query ({ caller }) func getAllValidStudents() : async [Student] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    students.values().toArray().filter(func(s) { Student.isValid(s) });
  };
};
