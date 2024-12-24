import { useState } from "react";
import { useRouter } from "next/router";
import { createClass } from "../../services/api";
import Link from "next/link";

const RegisterClass = () => {
  const router = useRouter();
  const [className, setClassName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createClass({ className });
      router.push("/classes"); 
    } catch (error) {
      console.error("Failed to create class", error);
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

        <h1 className="text-2xl font-bold mb-4">Register Class</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Class Name</label>
          <input
            type="text"
            placeholder="Enter class name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Register Class
        </button>
      </form>
    </div>
  );
};

export default RegisterClass;
