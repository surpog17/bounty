import { Form, Input, Button } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";
import { useLogin } from "../../store/server/registaration/mutation";
import sk from "../../assets/png/sk.png"
export function LoginComponent() {
  const { mutate: login, isPending } = useLogin();

  interface LoginFormValues {
    email: string;
    password: string;
  }

  const onFinish = (values: LoginFormValues) => {
    login(values);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-tech-primary font-poppins text-tech-text">
      <div className="flex min-h-screen mx-auto overflow-hidden bg-tech-secondary shadow-lg lg:w-full md:w-full">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1629995015838-ea0e985d8d1a?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3")`,
          }}
        ></div>

        <div className="w-full px-6 py-4 md:px-8 lg:w-1/2">
        <div className="w-full flex justify-center">
            <img className="w-32 h-32" src={sk} alt="" />
          </div>
          <p className="mt-3 text-xl text-center text-tech-accent">
            Welcome Back!
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b border-tech-muted lg:w-1/4"></span>

            <span className="text-xs text-center text-tech-muted uppercase">
            </span>

            <span className="w-1/5 border-b border-tech-muted lg:w-1/4"></span>
          </div>

          <Form
            layout="vertical"
            onFinish={onFinish}
            className="grid grid-cols-1 gap-x-2 mt-3 md:grid-cols-2"
          >
            <Form.Item
              label={<span className="text-tech-accent">Email Address</span>}
              className="col-span-2"
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
              className="col-span-2"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="w-full px-5 py-3 bg-tech-primary text-tech-accent placeholder-tech-muted border border-tech-muted rounded-lg focus:border-tech-accent focus:ring-tech-accent focus:outline-none focus:ring focus:ring-opacity-40"
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
                Sign in
              </Button>
            </Form.Item>
          </Form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b border-tech-muted md:w-1/4"></span>

            <a
              href="signup"
              className="text-xs text-tech-muted uppercase hover:underline"
            >
              or sign up
            </a>

            <span className="w-1/5 border-b border-tech-muted md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
