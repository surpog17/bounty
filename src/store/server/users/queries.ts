import { useQuery } from "@tanstack/react-query";
import { BOUNTY_URL, USER_URL } from "../../../utils/constants";
import axios from "axios";
interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

export interface UserResponse {
  data: User[];
  // Add other response properties as needed
}
// Fetch user data function
const getUsers = async () => {
  const response = await axios.get(`${BOUNTY_URL}/`);
  return response?.data; // Return the user data directly
};
const getUsersData = async () => {
  const response = await axios.get(`${USER_URL}`);
  return response?.data; // Return the user data directly
};


export const useGetUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 60000,
  
  });
export const useGetUsersData = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: getUsersData,
    staleTime: 60000,
  
  });
  const getUsersById = async (id:string) => {
    const response = await axios.get(`${USER_URL}/${id}`);
  
    return response?.data; // Return the user data directly
  };
  
  // Custom hook to get user header
  export const useGetUsersById = (id: string | undefined) =>
    useQuery({
      queryKey: ["users", id],
      queryFn: () => (id ? getUsersById(id) : Promise.reject("ID is undefined")),
      staleTime: 60000,
    });