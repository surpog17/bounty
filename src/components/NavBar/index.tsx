import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiLogOut, FiChevronDown } from "react-icons/fi";
import surafelKifle from "../../assets/png/surafel-kifle.png";
import { useSignOut } from "../../store/server/registaration/mutation";
import { useGetUsersById } from "../../store/server/users/queries";


const Navbar  = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const id = localStorage.getItem("userId") || undefined;
  
  const {data:user} = useGetUsersById(id);
  const {signOut} = useSignOut();
  function handleSignOut() {
    signOut();
  }
  return (
    <nav className="bg-tech-primary text-tech-accent shadow-md">
      <div className="px-10">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex gap-5 items-center">
            <a href="/attendance" className="text-xl font-bold">
              <img className="w-28 h-16" src={surafelKifle} alt="Logo" />
            </a>
          </div>

          {/* User Info & Dropdown */}
          {user &&
          <div className="hidden md:flex items-center space-x-4 relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
             
                <div className="w-8 h-8  bg-tech-primary border border-tech-accent rounded-full flex items-center justify-center text-sm font-bold text-white">
                  {user?.first_name.charAt(0).toUpperCase()+" "+user?.last_name.charAt(0).toUpperCase()}
                </div>
              <span className="font-medium">{user?.first_name+" "+ user?.last_name}</span>
              <FiChevronDown className="w-4 h-4 text-white" />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 top-12 z-50 w-44 bg-white rounded-md shadow-lg py-2 text-gray-700">
                <a
                  href="/profile"
                  className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm gap-2"
                >
                  <FaUser className="w-4 h-4" />
                  Profile
                </a>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    handleSignOut();
                  }}
                  className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100 text-sm gap-2"
                >
                  <FiLogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
