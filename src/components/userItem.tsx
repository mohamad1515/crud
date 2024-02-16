import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserItem } from "../services/users";
import { IUser } from "../types/IUser";
import { Card, Input } from "antd";
import {
  CaretLeftOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";

const UserItem = () => {
  const { id } = useParams<"id">();
  const idAsNumber: number | undefined = id ? parseInt(id, 10) : undefined;
  const [state, setState] = useState<IUser>({
    id: 0,
    name: "name",
    username: "username",
    email: "email",
    address: {
      street: "address",
    },
    phone: "phone",
  });

  useEffect(() => {
    if (idAsNumber) {
      getUserItem(idAsNumber).then((res) => {
        setState(res);
      });
    }
  }, []);
  return (
    <div className="background">
      <div className="container center col">
        <Card title={state.username} type="inner" className="card">
          <div className="card-item">
            <UserOutlined /> <Input type="text" value={state.name} disabled />
          </div>
          <div className="card-item">
            <MailOutlined /> <Input type="text" value={state.email} disabled />
          </div>
          <div className="card-item">
            <EnvironmentOutlined />{" "}
            <Input type="text" value={state.address?.street} disabled />
          </div>
          <div className="card-item">
            <GlobalOutlined />{" "}
            <Input type="text" value={state.username} disabled />
          </div>
          <div className="card-item">
            <PhoneOutlined /> <Input type="text" value={state.phone} disabled />
          </div>
          <div style={{ marginTop: 15 }}>
            <Link to={"/"} className="center">
              <CaretLeftOutlined style={{ marginRight: 10 }} />
              <span>Back to Main Page</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserItem;
