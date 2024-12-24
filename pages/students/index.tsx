import { GetServerSideProps } from "next";
import { useState } from "react";
import { getStudents, deleteStudent } from "../../services/api";
import { Student } from "../../types/types";
import router from "next/router";
import Link from "next/link";
const StudentList = ({ students }: { students: Student[] }) => {
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredStudents(
      students.filter(
        (student) =>
          student.studentName.toLowerCase().includes(query) ||
          student.className.toLowerCase().includes(query)
      )
    );
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id);
      window.location.reload(); 
    } catch (error) {
      console.error("Failed to delete student", error);
    }
  };

  return (
    <div className="p-4">
      <div>
        <Link
          href="/classes"
          className="absolute top-4 right-4 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Go to Class Management page
        </Link>

        <h1 className="text-2xl font-bold mb-4">Student Management</h1>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or class"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left py-2 px-4">No</th>
            <th className="text-left py-2 px-4">Student Name</th>
            <th className="text-left py-2 px-4">Class Name</th>
            <th className="text-left py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student.id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{student.studentName}</td>
              <td className="py-2 px-4">{student.className}</td>
              <td className="py-2 px-4">
                <Link
                  href={`/students/${student.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Details
                </Link>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="text-red-500 hover:underline ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button
          onClick={() => router.push("/students/register")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Student
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const students = await getStudents();
  return { props: { students } };
};

export default StudentList;
