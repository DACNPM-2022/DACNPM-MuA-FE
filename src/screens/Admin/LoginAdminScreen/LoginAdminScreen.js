import React  from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Layout,  Row,
  Col,
  Form,
  Input,
  Button,

} from "antd";
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '../../../actions/adminActions'
import { Image,Title } from "../admin.style";

import "antd/dist/antd.min.css";


export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const adminSignin = useSelector(state => state.adminSignin);
  const { adminInfo } = adminSignin;
  
  const dispatch = useDispatch();
  const onFinish = (e) => {
    dispatch(signin(e.email, e.password));
    if(adminInfo) {
      const retUrl = location.state?.from?.pathname || "/dashboard/users";
          navigate(retUrl);
    }
    
  };
  const onFinishFailed = () => {
    console.log("Failed:");
  };
  return (
    <Layout>

      <Row>
        <Col span={16}>
          <Image src="https://img.freepik.com/free-photo/admin-login-sign-made-wood-table_292052-431.jpg?size=626&ext=jpg&ga=GA1.1.772362833.1646932962" />
        </Col>
        <Col span={8}>
          <Title style={{textAlign:"center",marginTop:"40%"}}>Trang quản lý của Admin</Title>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          
            autoComplete="off"
            style={{marginTop:"50px"}}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your username!" },
               
              ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 12, span: 12 }}>
              <Button type="primary" htmlType="submit">
                Log In
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
}