import type {ReactNode} from 'react';
import { Col, Row } from "antd";
import Header from "../components/common/Header";
import React from 'react';

interface LayoutDefaultProps {
  children: ReactNode;
}

const LayoutDefault: React.FC<LayoutDefaultProps> =  ({children}) => {
  return (
    <div className="w-full min-h-screen">
      <Header/>
      <Row>
        <Col span={24}>
          <div className="mb-10 mt-[120px] mx-auto w-[90%] max-w-[1200px] p-8">
            {children}
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <footer className="w-full text-center text-sm text-gray-500 py-6 border-t mt-10">
            © 2025 SIT. Tất cả quyền được bảo lưu.
          </footer>
        </Col>
      </Row>
    </div>
  );
}

export default LayoutDefault;