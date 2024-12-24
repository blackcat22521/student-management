const API_BASE_URL = "http://localhost:4000";
import { Class } from "../types/types";
import { ApiStudent, Student, BackendClass } from "../types/types";
import axios from "axios";
// STUDENT APIs

export const getStudents = async (): Promise<Student[]> => {
  const response = await fetch(`${API_BASE_URL}/students`);
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  const data: ApiStudent[] = await response.json();

  return data.map((student) => ({
    id: student.ID,
    studentName: student.Name,
    className: student.Class,
  }));
};

export const getStudentById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/students/${id}`);
  const data = response.data;

  return {
    id: data.ID,
    studentName: data.Name,
    className: data.Class,
  };
};

export const getStudentsByClassName = async (className: string) => {
  const response = await fetch(`${API_BASE_URL}/students/class/${className}`);
  if (!response.ok) {
    throw new Error("Failed to fetch students by class name");
  }
  return response.json();
};

export const searchStudentsByName = async (name: string) => {
  const response = await fetch(`${API_BASE_URL}/students/search/${name}`);
  if (!response.ok) {
    throw new Error("Failed to fetch students by name");
  }
  return response.json();
};

export const createStudent = async (student: {
  studentName: string;
  className: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/students`, {
    Name: student.studentName,
    Class: student.className,
  });

  return response.data;
};

export const updateStudent = async (
  id: number,
  student: {
    studentName: string;
    className: string;
  }
) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/students/${id}`, {
      Name: student.studentName,
      Class: student.className,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed to update student:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.error ||
          "An error occurred while updating the student."
      );
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const deleteStudent = async (id: number) => {
  console.log(`Deleting student with ID: ${id}`);
  const response = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: "DELETE",
  });
  console.log(`Response status: ${response.status}`);
  if (!response.ok) {
    console.error(`Failed to delete student: ${await response.text()}`);
    throw new Error(`Failed to delete student with ID ${id}`);
  }
  return response.json();
};

//Class API

export const registerClass = async (classData: { className: string }) => {
  const response = await fetch(`${API_BASE_URL}/classes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classData),
  });

  if (!response.ok) {
    throw new Error("Failed to create class");
  }

  return response.json();
};

// Ensure it's exported

export const getClasses = async (): Promise<Class[]> => {
  const response = await axios.get(`${API_BASE_URL}/classes`);
  const data: BackendClass[] = response.data; 

  return data.map((cls: BackendClass) => ({
    id: cls.ID, 
    className: cls.ClassName, 
  }));
};

export const getClassById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/classes/${id}`);
  const data = response.data;

  return {
    id: data.ID,
    className: data.ClassName,
  };
};

export const createClass = async (classData: { className: string }) => {
  const response = await axios.post(`${API_BASE_URL}/classes`, {
    ClassName: classData.className,
  });

  if (response.status !== 201) {
    throw new Error("Failed to create class");
  }

  return response.data;
};

export const updateClass = async (id: number, cls: { className: string }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/classes/${id}`, {
      ClassName: cls.className, 
    });
    return response.data; 
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed to update class:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.error ||
          "An error occurred while updating the class."
      );
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const deleteClass = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/classes/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete class");
  }
  return response.json();
};
