import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { getClasses, deleteClass } from "../../services/api";
import { Class } from "../../types/types";
const ClassList = ({ classes }: { classes: Class[] }) => {
  const [filteredClasses, setFilteredClasses] = useState<Class[]>(classes);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredClasses(
      classes.filter((cls) => cls.className.toLowerCase().includes(query))
    );
  };

  // Handle Delete Class
  const handleDelete = async (id: number) => {
    try {
      await deleteClass(id);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete class", error);
    }
  };

  return (
    <div className="p-4">
      <div>
        <Link
          href="/students"
          className="absolute top-4 right-4 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Go to Student Management page
        </Link>

        <h1 className="text-2xl font-bold mb-4">Class Management</h1>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by class name"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Class Table */}
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left py-2 px-4">No</th>
            <th className="text-left py-2 px-4">Class Name</th>
            <th className="text-left py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredClasses.map((cls, index) => (
            <tr key={cls.id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{cls.className}</td>
              <td className="py-2 px-4">
                <Link
                  href={`/classes/${cls.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Details
                </Link>
                <button
                  onClick={() => handleDelete(cls.id)}
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
        <Link
          href="/classes/register"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Class
        </Link>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const classes = await getClasses();
  return { props: { classes } };
};

export default ClassList;
