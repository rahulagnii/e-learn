import React from "react";
import { Layout, Menu, Avatar } from "antd";
import { LogoutOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import "./style.css";
import { Helmet } from "react-helmet";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";

const AdminLayout = ({ children }) => {
    const { auth } = usePage().props;
    const { Content, Footer, Sider } = Layout;

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Helmet>
                <title>Admin Dashboard</title>
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
                            Inertia.get("/admin");
                        }}
                    >
                        Dashboard
                    </Menu.Item>
                    <Menu.Item
                        key="u1"
                        icon={<TeamOutlined />}
                        onClick={() => {
                            Inertia.get("/admin/teacher");
                        }}
                    >
                        Teachers
                    </Menu.Item>
                    <Menu.Item
                        key="h1"
                        icon={<TeamOutlined />}
                        onClick={() => {
                            Inertia.get("/admin/student");
                        }}
                    >
                        Students
                    </Menu.Item>
                    <Menu.Item
                        key="c1"
                        icon={<TeamOutlined />}
                        onClick={() => {
                            Inertia.get("/admin/parent");
                        }}
                    >
                        Parents
                    </Menu.Item>
                    <Menu.Item
                        key="dd1"
                        icon={<TeamOutlined />}
                        onClick={() => {
                            Inertia.get("/admin/department");
                        }}
                    >
                        Departments
                    </Menu.Item>
                    <Menu.Item
                        key="cc1"
                        icon={<TeamOutlined />}
                        onClick={() => {
                            Inertia.get("/admin/course");
                        }}
                    >
                        Courses
                    </Menu.Item>
                    <Menu.Item
                        key="ss1"
                        icon={<TeamOutlined />}
                        onClick={() => {
                            Inertia.get("/admin/semester");
                        }}
                    >
                        Semester
                    </Menu.Item>

                    <Menu.Item
                        key="csss1"
                        icon={<TeamOutlined />}
                        onClick={() => {
                            Inertia.get("/admin");
                        }}
                    >
                        Subjects
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
export default AdminLayout;
