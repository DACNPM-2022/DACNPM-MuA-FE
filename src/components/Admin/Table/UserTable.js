import React,{ useEffect, useState }  from "react";
import { Tabs, Button, Modal, Form, Input,Select } from "antd";
import UserView from "./UserView/UserView";

import PageHeader from "../PageHeader/PageHeader";

import { useDispatch, useSelector } from "react-redux";
import { createUser, listUser  } from "../../../actions/adminActions";
import UserBlockView from "./UserView/UserBlockView";

const { TabPane } = Tabs;
const { Option } = Select;
export default function UserTable() {
  const dispatch = useDispatch();
  const userCreate = useSelector((state) => state.userCreate);
  const { success } = userCreate;
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [ email ] = useState('');
  // const [ password ] = useState('');
  // const [ confirmPassword ] = useState('');
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (e) => {
    const user = {
      username: e.username,
      email: e.email,
      password: e.password,
      role: e.role,
    };
    dispatch(createUser(user));
  };
  const componentSize="default";
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    if (success) {
      setIsModalVisible(false);
      dispatch(listUser())
    }
  }, [dispatch]);

  return (
    <>
      <PageHeader title={"Quản lý người dùng"}></PageHeader>
      <Button type="primary" onClick={showModal} style={{ textAlign: "right" }}>
        Thêm 1 người dùng mới
      </Button>
      <Modal
        title="Thêm mới 1 khách hàng"
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            size: componentSize,
          }}
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tên"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              { min: 5, message: "Username must be minimum 5 characters." },
              {
                pattern: new RegExp(
                  /^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\\"\\/?>.<,-]+$/i
                ),
                message: "Field does not accept numbers",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Enter a valid email address!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Nhập lại"
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="role"
            label="Vai trò"
            rules={[
              {
                required: true,
                message: "Please select role!",
              },
            ]}
          >
            <Select placeholder="select role">
              <Option value={true}>Admin</Option>
              <Option value={false}>User</Option>
            </Select>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Người dùng" key="1">
          <UserView />
        </TabPane>
        <TabPane tab="Người dùng bị khóa" key="2">
          <UserBlockView></UserBlockView>
        </TabPane>
      </Tabs>
    </>
  );
}
