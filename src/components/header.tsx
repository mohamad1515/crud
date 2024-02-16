import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div
      className="center row space-between container"
      style={{ background: "white" }}
    >
      <Link to="/" className="mainLink">
        <h2>Users List</h2>
      </Link>

      <Button type="primary" disabled={path === "/add"}>
        <Link to={"/add"}>
          <PlusOutlined /> Add User
        </Link>
      </Button>
    </div>
  );
};

export default Header;
