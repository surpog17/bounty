import { Button } from "antd";
import sk from "../../assets/png/sk-black.png";
import { FaArrowLeftLong } from "react-icons/fa6";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-poppins">
      <img src={sk} className="w-20 mb-4" alt="Not Found" />
      <h2 className="text-3xl font-bold mb-2">404 Not Found</h2>
      <p className="text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button
        className={
          "px-4 py-2 my-3 flex-shrink-0  bg-ask_darkBlue rounded-full font-poppins text-white text-[12px] "
        }
        title=" Home page "
        type="link"
        href="/attendance"
        icon={<FaArrowLeftLong />}
      />
    </div>
  );
};

export default NotFound;
