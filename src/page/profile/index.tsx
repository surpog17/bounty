import React from "react";
import { FiLogOut, FiPhone } from "react-icons/fi";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useSignOut } from "../../store/server/registaration/mutation";
import { useGetUsersById } from "../../store/server/users/queries";
import { Card } from "antd";



const ProfilePage: React.FC = () => {
const { signOut } = useSignOut();
const id = localStorage.getItem("userId") || undefined;

const {data:user,isLoading} = useGetUsersById(id);

  const handleSignOut = () => {
    signOut()
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <Card loading={isLoading} className="bg-white h-full rounded-xl shadow-lg max-w-md w-full p-6 overflow-y-hidden">
        <h2 className="text-2xl font-bold mb-6 text-center text-tech-primary">User Profile</h2>

        <div className="space-y-4 mb-6">
          <ProfileItem label="First Name" value={user?.first_name} icon={<FaUser />} />
          <ProfileItem label="Last Name" value={user?.last_name} icon={<FaUser />} />
          <ProfileItem label="Username" value={user?.username} icon={<FaUserCircle />} />
          <ProfileItem label="Phone" value={user?.phone} icon={<FiPhone />} />
          <ProfileItem label="Email" value={user?.email} icon={<HiOutlineMail />} />
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
        >
          <FiLogOut className="w-5 h-5" />
          Sign Out
        </button>
      </Card>
    </div>
  );
};

interface ProfileItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ label, value, icon }) => (
  <div className="flex items-start gap-3">
    <div className="text-tech-primary mt-1">{icon}</div>
    <div className="flex flex-col">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-base font-medium">{value}</span>
    </div>
  </div>
);

export default ProfilePage;
