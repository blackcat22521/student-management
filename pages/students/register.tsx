import { useState } from "react";
import { useRouter } from "next/router";
import { createStudent } from "../../services/api";
import Link from "next/link";
const RegisterStudent = () => {
  const [studentName, setStudentName] = useState("");
  const [className, setClassName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createStudent({ studentName, className });
      router.push("/students"); 
    } catch (error) {
      console.error("Failed to register student", error);
    }
  };

  return (
    <div className="p-4 relative">
      <div>
        <Link
          href="/students"
          className="absolute top-4 right-4 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Go to Student page
        </Link>

        <h1 className="text-2xl font-bold mb-4">Register Student</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Student Name</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter student name"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Class Name</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Enter class name"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterStudent;
