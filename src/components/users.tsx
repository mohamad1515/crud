import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "../types/IUser";
import { getUsersList, removeUserItem } from "../services/users";
import {
  Alert,
  Button,
  Flex,
  Input,
  Popconfirm,
  Select,
  Space,
  Spin,
  Table,
  TableProps,
} from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const UsersList = () => {
  const [msg, setMsg] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const {
    isLoading,
    data: dataTable,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersList,
  });

  if (isLoading)
    return (
      <Flex gap="small" vertical>
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </Flex>
    );

  if (error) return <div>{`${error}`}</div>;

  const handleRemoveUserItem = (id: number) => {
    removeUserItem(id).then((res) => {
      if (res.status === 200) {
        setMsg(true);
        setTimeout(() => {
          setMsg(false);
        }, 3000);
      }
    });
  };

  const handleSearch = (value: string) => {
    if (value.length > 3) {
      setSearchTerm(value);
    } else if (value.length <= 3) {
      setSearchTerm("");
    }
  };

  const filteredTableData = dataTable?.filter(
    (item: any) =>
      item.name.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
      item.username.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.street.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: TableProps<IUser>["columns"] = [
    { title: "Index", dataIndex: "id", rowScope: "row" },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Address",
      dataIndex: ["address", "street"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/${record.id}`} style={{ color: "black" }}>
            <EyeOutlined />
          </Link>
          <Link to={`/edit/${record.id}`}>
            <EditOutlined />
          </Link>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleRemoveUserItem(record.id)}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="background">
      <div className="container">
        {msg && <Alert message="Success" type="success" showIcon />}
        <div className="search-box">
          <Input
            style={{ width: 300 }}
            placeholder="Search"
            onChange={(e) => handleSearch(e.target.value)}
          />

          <div>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a value"
              optionFilterProp="children"
              filterOption={(input, option) =>
                typeof input === "string" && typeof option?.value === "string"
                  ? option?.value?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  : false
              }
            >
              {dataTable?.map((item: any) => (
                <Option key={item.id} value={item.username}>
                  <span onClick={() => setSearchTerm(item.username)}>
                    {item.username}
                  </span>
                </Option>
              ))}
            </Select>
            <Button type="default" onClick={() => setSearchTerm("")}>
              Clear
            </Button>
          </div>
        </div>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredTableData}
          bordered
        />
      </div>
    </div>
  );
};

export default UsersList;
