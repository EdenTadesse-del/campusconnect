import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000"
});

export const getStudents = async () => {
  const response = await API.get("/students");

  return response.data;
};

export const createStudent = async (
  student
) => {
  const response = await API.post(
    "/students",
    student
  );

  return response.data;
};

export const updateStudent = async (
  id,
  student
) => {
  const response = await API.put(
    `/students/${id}`,
    student
  );

  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await API.delete(
    `/students/${id}`
  );

  return response.data;
};

export default API;