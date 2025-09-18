import { useEffect, useState } from 'react';
import { Table, Tag, Button } from 'antd';
import { deleteUser, getUsers } from '../../api/apiUser';
import { authProvider } from '../../context/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '../../types/user';


export default function AdminDashboard () {
  const [nameUser, setNameUser] = useState<string | null>('');
  const queryClient = useQueryClient();

  const {data: users} = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    select: res => res.data
  });
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
  const columnsUser = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: User["role"]) => (
        <Tag color={role === "admin" ? "geekblue" : "volcano"}>{role}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: User) => (
        <Button disabled onClick={() => handleDeleteUser(record._id)} >Xóa</Button>
      ),
    },
  ];
  const handleDeleteUser = async (id: string) => {
    try {
     deleteUserMutation.mutate(id);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(()=> {
    setNameUser(authProvider?.user?.name ?? null);
  }, [])
  return (
    <div className="flex flex-col min-h-screen">
      <h2 className="text-4xl mt-10 mb-15 font-bold text-[#6700A3]">👋 Xin chào, {nameUser}!</h2>
      <Table rowKey="_id" columns={columnsUser} dataSource={users} className="shadow-2xl"/>
    </div>
  );
}
