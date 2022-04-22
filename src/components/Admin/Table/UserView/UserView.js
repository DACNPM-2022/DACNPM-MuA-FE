import React, { useState,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Drawer, Modal ,Descriptions,Badge} from "antd";
import { listUser } from '../../../../actions/adminActions'
export default function UserView() {
 
  const dispatch = useDispatch();
  const userList = useSelector(state => state.usersList);
  const { users } = userList;

  useEffect(() => {
    dispatch(listUser())
  }, [dispatch])
  const [state] = useState({
    user: {},
    iddelete:null
  });
  const [visible, setVisible] = useState(false);
  const [visibleBlockModal, setVisibleBlockModal] = useState(false);
  const showBlockModal = () => {
    setVisibleBlockModal(true);
  };
  const onCloseBlockModal = () => {
    setVisibleBlockModal(false);
  };
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const columns = [
    
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Action",
      dataIndex: "action",
      width: "45%",
      render: (_, record) => (
        <>
          {record.name === "initial" && <Button icon="plus" shape="circle" />}
          {record.name !== "initial" && (
            <>
              <Button
           
                type="primary"
                shape="round"
                style={{ marginRight: "10px", border: "none" }}
                onClick={()=>{
                  state.user = record;
                  showDrawer()}}
              >
                Chi tiết
              </Button>
              <Button
            
                type="primary"
                shape="round"
                style={{ marginRight: "10px", border: "none" }}
                onClick={showBlockModal}
              >
                Khoá tài khoản
              </Button>
              <Button shape="round" type="danger">
                Xóa
              </Button>
            </>
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <Table dataSource={users} rowKey="_id" columns={columns} pagination={{ defaultPageSize: 4, showSizeChanger: true}} />
      <Drawer
        title="Thông tin khách hàng"
        placement="right"
        onClose={onClose}
        visible={visible}
        size="large"
      >
        <Descriptions  bordered>
          <Descriptions.Item label="Username" span={1}>{state.user.username}</Descriptions.Item>
          <Descriptions.Item label="Email" span={2}>{state.user.email}</Descriptions.Item>
      
          <Descriptions.Item label="Status" span={3}>
            <Badge status="processing" text="Activate" />
          </Descriptions.Item>
          <Descriptions.Item label="Type User">

          </Descriptions.Item>
        
          <Descriptions.Item label="Config Info">
            Data disk type: MongoDB
            <br />
            Database version: 3.4
            <br />
            Package: dds.mongo.mid
            <br />
            Storage space: 10 GB
            <br />
            Replication factor: 3
            <br />
            Region: East China 1<br />
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
      <Modal
        title="Xác nhận khóa tài khoản người dùng"
        visible={visibleBlockModal}
        onCancel={onCloseBlockModal}
      >
        {"Xác nhận khóa tài khoản này"}
      </Modal>
    </>
  );
}
