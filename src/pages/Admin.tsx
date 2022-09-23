import React from 'react';
import {PageHeaderWrapper} from "@ant-design/pro-layout";

const Admin: React.FC = (props) => {
  return (
    <PageHeaderWrapper>
      {props.children}
    </PageHeaderWrapper>
  );
};

export default Admin;
