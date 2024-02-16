import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IEditUser } from "../types/IUser";
import { editUserItem, getUserItem } from "../services/users";
import { CaretLeftOutlined } from "@ant-design/icons";

const UserEdit = () => {
  const { id } = useParams<"id">();
  const idAsNumber: number | undefined = id ? parseInt(id, 10) : undefined;
  const navigate = useNavigate();
  const [form, setForm] = useState<IEditUser>({
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
    },
    phone: "",
  });

  useEffect(() => {
    if (idAsNumber) {
      getUserItem(idAsNumber).then((res) => {
        setForm(res);
      });
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value: string = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    let data = { ...form, id: idAsNumber };
    editUserItem(data).then((res) => {
      if (res.status === 200) {
        navigate("/");
      } else {
        alert("خطا از سمت سرور");
      }
    });
  };

  return (
    <div className="background">
      <div className="container center col">
        <h2>
          Edit{" "}
          <span style={{ fontSize: "18px", color: "darkblue" }}>
            {form.username}
          </span>
        </h2>

        <Form
          className="editForm"
          onFinish={handleSubmit}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item label="Name">
            <Input
              type="text"
              value={form.name}
              onChange={handleInputChange}
              name="name"
            />
          </Form.Item>
          <Form.Item label="Username">
            <Input
              type="text"
              value={form.username}
              onChange={handleInputChange}
              name="username"
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              type="text"
              value={form.email}
              onChange={handleInputChange}
              name="email"
            />
          </Form.Item>
          <Form.Item label="Address">
            <Input
              type="text"
              value={form.address?.street}
              onChange={handleInputChange}
              name="address"
            />
          </Form.Item>
          <Form.Item label="Phone">
            <Input
              type="text"
              value={form.phone}
              onChange={handleInputChange}
              name="phone"
            />
          </Form.Item>
          <Form.Item className="center">
            <Button
              type="primary"
              htmlType="submit"
              style={{ minWidth: "150px" }}
            >
              Submit
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to={"/"} className="center">
              <CaretLeftOutlined style={{ marginRight: 10 }} />
              <span>Back to Main Page</span>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UserEdit;
