import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import { getStudentById, updateStudent } from "../../services/api";
import Modal from "../../components/Modal";
import { Student } from "../../types/types";
import Link from "next/link";

const StudentDetail = ({ student }: { student: Student }) => {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState(student);

  const handleUpdate = async () => {
    try {
      await updateStudent(student.id, updatedStudent);
      setUpdateModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update student", error);
    }
  };

  return (
    <div className="p-4 ">
      <div>
        <Link
          href="/students"
          className="absolute top-4 right-4 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Go to Student page
        </Link>

        <h1 className="text-2xl font-bold mb-4">Student Details</h1>
      </div>

      <div className="mb-4">
        <p>
          <strong>ID:</strong> {student.id}
        </p>
        <p>
          <strong>Student Name:</strong> {student.studentName}
        </p>
        <p>
          <strong>Class Name:</strong> {student.className}
        </p>
      </div>

      <button
        onClick={() => setUpdateModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Update
      </button>

      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
      >
        <h2 className="text-xl font-bold mb-4">Update Student</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <div className="mb-4">
            <label className="block font-medium">Student Name</label>
            <input
              type="text"
              value={updatedStudent.studentName}
              onChange={(e) =>
                setUpdatedStudent({
                  ...updatedStudent,
                  studentName: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Class Name</label>
            <input
              type="text"
              value={updatedStudent.className}
              onChange={(e) =>
                setUpdatedStudent({
                  ...updatedStudent,
                  className: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;

  try {
    const student = await getStudentById(Number(id));
    if (!student) {
      return { notFound: true };
    }
    return { props: { student }, revalidate: 20 };
  } catch (error) {
    console.error("Failed to fetch student:", error);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export default StudentDetail;
