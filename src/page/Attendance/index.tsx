import { Tabs, Spin } from 'antd';
import { useGetUsers } from '../../store/server/users/queries';
import AttendanceTable from '../../components/AttendanceTable';
import EmployeeDetail from './employeeDetail';
import { useEmployeeStore } from '../../store/uistate/employee';

const EmployeeAttendance = () => {
  const {data:employees,isLoading} = useGetUsers();
    const { employeeId,setActiveTab } = useEmployeeStore();
  
 function handleTab(e:string) {
    if (e === '1') {
      setActiveTab('1');
    } else if (e === '2') {
      setActiveTab('2');
    }
  }
  return (
    <>
     {isLoading ?
     <div className='min-h-screen flex justify-center items-center'> <Spin size="large" /></div>: 
     <div className="p-6 h-screen overflow-y-auto">
    
      <h1 className="text-2xl font-semibold mb-4 font-poppins">{employees.team.name} - Attendance</h1>
      <Tabs onChange={(key) => handleTab(key)} defaultActiveKey="1">
        <Tabs.TabPane  tab={`Today (${employees?.attendance_data?.current_day.date})`} key="1">
          <AttendanceTable employees={employees?.attendance_data?.current_day.employees} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={`Yesterday (${employees?.attendance_data?.yesterday.date})`} key="2">
          <AttendanceTable employees={employees?.attendance_data?.yesterday.employees} />
        </Tabs.TabPane>
      </Tabs>
      <EmployeeDetail id={employeeId}  />
    </div>
}
    </>
   
  );
};

export default EmployeeAttendance;
