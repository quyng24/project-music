import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authProvider } from "../../context/auth";
import { Button, Col, Row } from "antd";

export default function Header() {
    const [roleName, setRoleName] = useState<string | undefined>('');
    const navigate = useNavigate();
    useEffect(() => {
        const checkRole = async () => {
        await authProvider.init();
        setRoleName(authProvider?.user?.role);
        };
        checkRole();
    }, []);
    return (
        <div>
            {roleName === "admin" ? (
          <Row className="fixed top-0 left-0 right-0 z-50 text-white">
            <Col span={24}>
              <div className="w-full flex justify-between items-center h-[80px] px-10 bg-gradient-to-r from-[#ff5a57] to-[#6700A3] shadow-md fixed top-0 left-0 right-0 z-50">
                <div className="flex justify-center items-center h-full">
                    <p className="text-2xl font-semibold text-[#6700A3] font-mono">MUSICHAY</p>
                </div>
                <p onClick={() => navigate('/admin')} className="text-center text-lg font-semibold hover:underline cursor-pointer">Quản lý Người dùng</p>
                <p onClick={() => navigate('/admin/topic')} className="text-center text-lg font-semibold hover:underline cursor-pointer">Quản lý Chủ đề</p>
                <Button type="primary" style={{backgroundColor: 'linear-gradient'}} onClick={() => authProvider.signout(() => navigate('/login'))} >Đăng xuất</Button>
              </div>
            </Col>
          </Row>
        ) : (
          <Row className="w-full flex justify-between items-center h-[80px] px-10 bg-gradient-to-r from-[#ff5a57] to-[#6700A3] shadow-md fixed top-0 left-0 right-0 z-50 text-white">
            <Col span={4}>
              <div className="flex justify-center items-center w-full h-full">
                <p>MUSICHAY</p>
              </div>
            </Col>
            <Col span={5}>
              <p onClick={() => navigate('/user')} className="text-center text-lg font-semibold hover:underline cursor-pointer">
                Trang chủ
              </p>
            </Col>
            <Col span={5}>
              <p onClick={() => navigate('/user/topic')} className="text-center text-lg font-semibold hover:underline cursor-pointer">
                Chủ đề
              </p>
            </Col>
            <Col span={5}>
              <p onClick={() => navigate('/user/history')} className="text-center text-lg font-semibold hover:underline cursor-pointer">
                Lịch sử làm bài
              </p>
            </Col>
            <Col span={5}>
              <div className="w-full flex justify-center items-end">
                <Button type="primary" onClick={() => authProvider.signout(() => navigate('/login'))} >Đăng xuất</Button>
              </div>
            </Col>
          </Row>
        )}
        </div>
    )
}