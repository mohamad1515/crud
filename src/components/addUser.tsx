import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IAddUser } from "../types/IUser";
import { addNewUser } from "../services/users";
import { CaretLeftOutlined } from "@ant-design/icons";

const AddTask = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<IAddUser>({
    id: parseInt(uuidv4().replace(/-/g, "").substring(0, 3)),
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
    },
    phone: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value: string = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    let data = { ...form };
    addNewUser(data).then((res) => {
      if (res.status === 201) {
        navigate("/");
      } else {
        alert("خطایی از سمت سرور به وجود آمده");
      }
    });
  };

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      sm: { span: 25 },
    },
  };

  return (
    <div className="background">
      <div className="container center col">
        <h2>Add User</h2>

        <Form
          {...formItemLayoutWithOutLabel}
          className="addForm"
          onFinish={handleSubmit}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item label="ID">
            <Input value={form.id} disabled />
          </Form.Item>
          <Form.Item label="Name">
            <Input
              onChange={handleInputChange}
              placeholder="Enter Name"
              name="name"
            />
          </Form.Item>
          <Form.Item label="Username">
            <Input
              onChange={handleInputChange}
              placeholder="Enter Username"
              name="username"
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              onChange={handleInputChange}
              placeholder="Enter Email"
              name="email"
            />
          </Form.Item>
          <Form.Item label="Address">
            <Input
              onChange={handleInputChange}
              placeholder="Enter Address"
              name="address"
            />
          </Form.Item>
          <Form.Item label="Phone">
            <Input
              onChange={handleInputChange}
              placeholder="Enter Phone"
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

export default AddTask;
