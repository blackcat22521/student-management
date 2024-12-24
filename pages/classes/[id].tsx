import { useState } from "react";
import { useRouter } from "next/router";
import { getClassById, updateClass } from "../../services/api";
import { GetServerSideProps } from "next";
import { Class } from "../../types/types";
import Link from "next/link";

const ClassDetails = ({ cls }: { cls: Class }) => {
  const [className, setClassName] = useState(cls.className);
  const router = useRouter();

  const handleUpdate = async () => {
    try {
      await updateClass(cls.id, { className });
      alert("Class updated successfully");
      router.push("/classes"); 
    } catch (error) {
      console.error("Failed to update class:", error);
      alert("Failed to update class. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <div>
        <Link
          href="/classes"
          className="absolute top-4 right-4 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Go to Class page
        </Link>
        <h1 className="text-2xl font-bold mb-4">Class Details</h1>
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Class Name</label>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Update Class
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const cls = await getClassById(Number(id)); 
    return {
      props: { cls },
    };
  } catch (error) {
    console.error("Failed to fetch class:", error);
    return {
      notFound: true, 
    };
  }
};

export default ClassDetails;
