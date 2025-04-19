import { Drawer, Empty } from 'antd';
import { useGetUsers } from '../../store/server/users/queries';
import { useEmployeeStore } from '../../store/uistate/employee';
import { AiOutlineClockCircle, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { BsChatLeftText } from 'react-icons/bs';

type Employee = {
  id: number | string;
  name: string;
  timezone: string;
  checked_in_at?: string;
  checked_out_at?: string;
  checkout_message?: string;
};

const EmployeeDetail = ({ id }: { id: number }) => {
  const { visible,setVisible,activeTab } = useEmployeeStore();
  const { data: employeesAttendance, isLoading } = useGetUsers();

  const employeeList = activeTab==='1'
  ? (employeesAttendance?.attendance_data?.current_day?.employees || [])
  : (employeesAttendance?.attendance_data?.yesterday?.employees || []);

const employeeData = employeeList.find((emp: Employee) => (emp.id) === id);

  const handleClose = () => {
    setVisible(false);
  };


  return (
    <Drawer
      title={<span className='text-end'>{employeeData?.name} </span>}
      placement="right"
      onClose={handleClose}
      open={visible}
      width={400}
      loading={isLoading}
    >
      {!employeeData?
      <Empty description="Employee not found" />:

      <div className="space-y-4">
        <p className="flex items-center gap-2">
          <AiOutlineClockCircle /> <strong>Time Zone:</strong> {employeeData.timezone}
        </p>
        <p className="flex items-center gap-2">
          <AiOutlineCheckCircle className="text-green-600" />
          <strong>Checked In At:</strong> {employeeData.checked_in_at || 'Not yet'}
        </p>
        <p className="flex items-center gap-2">
          <AiOutlineCloseCircle className="text-red-500" />
          <strong>Checked Out At:</strong> {employeeData.checked_out_at || 'Not yet'}
        </p>
        <p className="flex items-center gap-2">
          <BsChatLeftText /> <strong>Message:</strong> {employeeData.checkout_message || 'No message'}
        </p>
      </div>}
    </Drawer>
  );
};

export default EmployeeDetail;
