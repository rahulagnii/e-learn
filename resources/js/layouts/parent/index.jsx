import React from "react";
import { Layout, Menu, Avatar } from "antd";
import { LogoutOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import "./style.css";
import { Helmet } from "react-helmet";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";

const ClientLayout = ({ children }) => {
    const { Content, Footer, Sider } = Layout;
    const { auth } = usePage().props;

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Helmet>
                <title>Client Dashboard</title>
            </Helmet>
            <Sider>
                <div className="logo">
                    <Avatar
                        size={64}
                        style={{ lineHeight: "58px" }}
                        icon={
                            <UserOutlined style={{ verticalAlign: "middle" }} />
                        }
                    />
                </div>
                <div className="text-white text-center mb-2">
                    <strong>{auth.user.name}</strong>
                </div>
                <Menu defaultActiveFirst theme="dark" mode="inline">
                    <Menu.Item
                        key="d1"
                        icon={<TeamOutlined />}
                        onClick={() => {
                            Inertia.get("/farmer");
                        }}
                    >
                        Dashboard
                    </Menu.Item>
                    <Menu.Item
                        key="u1"
                        icon={<TeamOutlined />}
                        onClick={() => {
                            Inertia.get("/farmer/notification");
                        }}
                    >
                        Notifications
                    </Menu.Item>
                    <Menu.Item
                        key="h1"
                        icon={<TeamOutlined />}
                        onClick={() => {
                            Inertia.get("/farmer/application/status");
                        }}
                    >
                        Check Status
                    </Menu.Item>
                    <Menu.Item
                        key="h2"
                        icon={<TeamOutlined />}
                        onClick={() => {
                            Inertia.get("/farmer/profile");
                        }}
                    >
                        Profile
                    </Menu.Item>

                    <Menu.Item
                        key="signout"
                        icon={<LogoutOutlined />}
                        onClick={() => {
                            Inertia.post("/logout");
                        }}
                    >
                        Logout
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content>
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, mineight: "100vh" }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>E-Learn © 2021</Footer>
            </Layout>
        </Layout>
    );
};
export default ClientLayout;
