import { Form, Input, Button } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRegisterUser } from "../../store/server/registaration/mutation";
import { useGetUsersData } from "../../store/server/users/queries";
import { MessageService } from "../../components/MessageService";

export function RegisterComponent() {
  const { mutate: RegisterUser, isPending } = useRegisterUser();
  const { data: user } = useGetUsersData();
  interface FormValues {
    first_name: string;
    last_name: string;
    username: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const onFinish = (values: FormValues) => {
    RegisterUser(values, {
      onSuccess: () => {
        MessageService.success("Registration successful!");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      },
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-tech-primary text-tech-text font-poppins ">
      <div className="flex w-full  bg-tech-secondary rounded-lg shadow-lg min-h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1629995015838-ea0e985d8d1a?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
          }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">

          <p className="mt-3 text-xl text-center text-tech-accent ">Welcome </p>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  lg:w-1/4"></span>

            <a
              href="#"
              className="text-xs text-center text-gray-500 uppercase  hover:underline"
            >
              login with email
            </a>

            <span className="w-1/5 border-b  lg:w-1/4"></span>
          </div>

          <Form
            layout="vertical"
            onFinish={onFinish}
            className="grid grid-cols-1 gap-x-2 mt-8 md:grid-cols-2"
          >
            <Form.Item
              label={<span className="text-tech-accent">First Name</span>}
              name="first_name"
              rules={[
                { required: true, message: "Please enter your first name!" },
              ]}
            >
              <Input
                placeholder="Shown"
                className="block w-full px-5 py-3  bg-primary text-tech-accent placeholder-gray-400  border border-gray-200 rounded-lg     focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-tech-accent">Last Name</span>}
              name="last_name"
              rules={[
                { required: true, message: "Please enter your last name!" },
              ]}
            >
              <Input
                placeholder="Dan"
                className="block w-full px-5 py-3  bg-primary text-tech-accent placeholder-gray-400  border border-gray-200 rounded-lg     focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </Form.Item>
            <Form.Item
              label={<span className="text-tech-accent">User Name</span>}
              className="col-span-2"
              name="username"
              rules={[
                { required: true, message: "Please enter your username!" },
              ]}
            >
              <Input
                placeholder="example17"
                className="block w-full px-5 py-3  bg-primary text-tech-accent placeholder-gray-400  border border-gray-200 rounded-lg     focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-tech-accent">Phone Number</span>}
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number!" },
              ]}
            >
              <Input
                placeholder="XXX-XX-XXXX-XXX"
                className="block w-full px-5 py-3  bg-primary text-tech-accent placeholder-gray-400  border border-gray-200 rounded-lg     focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-tech-accent">Email Address</span>}
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Enter a valid email!" },
              ]}
            >
              <Input
                placeholder="johnsnow@example.com"
                className="block w-full px-5 py-3  bg-primary text-tech-accent placeholder-gray-400  border border-gray-200 rounded-lg     focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-tech-accent">Password</span>}
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                className=" w-full px-5 py-3  bg-primary text-tech-accent placeholder-gray-400  border border-gray-200 rounded-lg     focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-tech-accent">Confirm Password</span>}
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="  w-full px-5 py-3  bg-primary text-tech-accent placeholder-gray-400  border border-gray-200 rounded-lg     focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </Form.Item>

            <Form.Item className="col-span-2">
              <Button
                loading={isPending}
                iconPosition="end"
                type="primary"
                htmlType="submit"
                icon={<FaArrowRightLong />}
                className="flex w-[17.5rem] items-center justify-between px-6 py-5 text-sm tracking-wide text-tech-accent capitalize transition-colors duration-300 transform bg-tech-primary border border-tech-accent rounded-lg hover:!bg-tech-accent hover:!text-tech-primary focus:outline-none focus:ring focus:ring-tech-highlight focus:ring-opacity-50"
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  md:w-1/4"></span>

            <a
              href="login"
              className="text-xs text-gray-500 uppercase  hover:underline"
            >
              or sign in
            </a>

            <span className="w-1/5 border-b  md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
