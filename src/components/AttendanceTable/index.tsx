import { Table, Tag } from "antd";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useEmployeeStore } from "../../store/uistate/employee";

dayjs.extend(utc);
dayjs.extend(timezone);

// Define the type for better safety
interface Employee {
  id: number;
  name: string;
  timezone: string;
  checked_in_at: string;
  checked_out_at?: string;
  checkout_message?: string;
}

const AttendanceTable = ({ employees }: { employees: Employee[] }) => {
  const { setEmployeeId, setVisible } = useEmployeeStore();

  function handleEmployeeInfo(id: number) {
    setEmployeeId(id);
    setVisible(true);
  }

  const columns = [
    {
      title: <span className="font-semibold">Name</span>,
      dataIndex: 'name',
      sorter: (a: Employee, b: Employee) => a.name.localeCompare(b.name),
      render: (text: string, record: Employee) => (
        <div
          onClick={() => handleEmployeeInfo(record.id)}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          {text}
        </div>
      ),
    },
    {
      title: <span className="font-semibold">Time Zone</span>,
      dataIndex: 'timezone',
      sorter: (a: Employee, b: Employee) => a.timezone.localeCompare(b.timezone),
    },
    {
      title: <span className="font-semibold">Checked In</span>,
      dataIndex: 'checked_in_at',
      render: (time: string, record: Employee) => (
        <span>
          {record.timezone ? dayjs(time).tz(record.timezone).format('HH:mm:ss') : 'N/A'}
        </span>
      ),
      sorter: (a: Employee, b: Employee) =>
        dayjs(a.checked_in_at).isBefore(dayjs(b.checked_in_at)) ? -1 : 1,
    },
    {
      title: <span className="font-semibold">Checked Out</span>,
      dataIndex: 'checked_out_at',
      render: (time: string | undefined, record: Employee) =>
        time ? (
          <span>
            {record.timezone ? dayjs(time).tz(record.timezone).format('HH:mm:ss') : 'N/A'}
          </span>
        ) : (
          <Tag color="orange">Not yet</Tag>
        ),
      sorter: (a: Employee, b: Employee) => {
        if (!a.checked_out_at && !b.checked_out_at) return 0;
        if (!a.checked_out_at) return -1;
        if (!b.checked_out_at) return 1;
        return dayjs(a.checked_out_at).isBefore(dayjs(b.checked_out_at)) ? -1 : 1;
      },
    },
    {
      title: <span className="font-semibold">Checkout Message</span>,
      dataIndex: 'checkout_message',
      render: (msg: string | undefined) =>
        msg ? <span>{msg}</span> : <Tag color="gray">No message</Tag>,
      sorter: (a: Employee, b: Employee) =>
        (a.checkout_message || '').localeCompare(b.checkout_message || ''),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={employees}
      rowKey="id"
      pagination={false}
      locale={{ emptyText: 'No attendance records found' }}
    />
  );
};

export default AttendanceTable;
