import React, { useState } from "react";
import { Drawer,Tabs} from "antd";
import CustomerDescription from "../CustomerDescription/CustomerDescription";
import PageHeader from "../PageHeader/PageHeader";

import SellerView from "./SellerView/SellerView";
const { TabPane } = Tabs;
export default function AcceptTable() {
  
  const [visible, setVisible] = useState(false);
  
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
    <PageHeader title="Quản lý khách bán"/>
     <Tabs defaultActiveKey="1">
        <TabPane tab="Duyệt người bán" key="1">
            <SellerView></SellerView>
        </TabPane>
        <TabPane tab="Người bán hiện có" key="2">
        <SellerView></SellerView>
        </TabPane>
      </Tabs>
      
      <Drawer
        title="Thông tin người dùng"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={640}
      >
        <CustomerDescription />
      </Drawer>
    </>
  );
}
