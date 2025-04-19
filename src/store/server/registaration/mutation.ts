import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_URL } from "../../../utils/constants";
import axios from "axios";
import useAuthenticationStore from "../../uistate/authentication";
import useData from "../../../../db.json"
import { MessageService } from "../../../components/MessageService";
interface RegisterUserData {
  email: string;
  password: string;
  name?: string; // Optional field if applicable
  [key: string]: any; // Additional fields if needed
  username: string;
  phone: string;
  first_name: string;
  last_name: string;
}

interface RegisterUserResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  [key: string]: any; // Additional fields if needed
}
interface CheckIfUserExistsParams {
  username: string;
  email: string;
}

function checkIfUserExists({ username, email }: CheckIfUserExistsParams): boolean {
  return useData.users.some(
    (user: { username: string; email: string }) => user.username === username || user.email === email
  );
}


const RegisterUser = async (
  values: RegisterUserData
): Promise<RegisterUserResponse> => {
  try {
    if (checkIfUserExists({ username: values.username, email: values.email })) {
      MessageService.error( "Username or email already exists");
      throw new Error("Username or email already exists");
    } else {
      const response = await axios.post<RegisterUserResponse>(
        `${USER_URL}`,
        values
      );
      return response.data;
    }
    
   
  } catch (error: any) {
    // Axios wraps errors in a response object
    if (error.response && error.response.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Registration failed');
  }
};
export const useLogin = () => {
  const { setToken, setLoading } = useAuthenticationStore();

  return useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      const foundUser = useData?.users.find(
        (user) =>
          (user.username === values.email || user.email === values.email) &&
          user.password === values.password
      );

      if (!foundUser) {
        throw new Error("Invalid username or password");
      }

      return foundUser;
    },

    onMutate: () => {
      setLoading(true);
    },

    onSuccess: (data) => {
      MessageService.success("Login Successful, Redirecting to home page");
      setTimeout(() => {
        localStorage.setItem("login", JSON.stringify(true));
        localStorage.setItem("userId",data.id);
        setToken(data.id); // optional: store user ID as token substitute
         window.location.href = "/attendance"; // Redirect to the desired page
      }, 2000);
    },

    onError: (error) => {
      MessageService.error(
        (error as any).response?.data?.message || error.message || "Login failed"
      );
    },

    onSettled: () => {
      setLoading(false);
    },
  });
};
export const useSignOut = () => {
  const { setToken, setLoading } = useAuthenticationStore();

  const signOut = () => {
    setLoading(true);
    
    // Clear local storage and reset any user-specific data
    localStorage.removeItem("login");
    localStorage.removeItem("userId");

    // Optionally, show a success message or redirect
    MessageService.success("You have been logged out successfully");

    setTimeout(() => {
      localStorage.removeItem("login");
      localStorage.removeItem("userId");
      setToken(""); // optional: store user ID as token substitute
       window.location.href = "/login"; // Redirect to the desired page
    }, 2000);
  };

  return { signOut };
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: RegisterUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      MessageService.success( "User created successfully");
    },
    onError: (error) => {
      MessageService.error(`${(error as any).response?.data?.message || error}`);
    },
  });
};
