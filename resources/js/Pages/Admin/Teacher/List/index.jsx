import React from "react";
import { Table, Button } from "antd";
import { Inertia } from "@inertiajs/inertia";

const DriverList = ({ drivers }) => {
    const [page, setPage] = React.useState(1);
    const columns = [
        {
            title: "Sl No.",
            key: "index",
            render: (value, item, index) => (page - 1) * 10 + index + 1,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "25%",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "25%",
        },
        {
            title: "Licence",
            dataIndex: "licence",
            key: "licence",
            width: "25%",
        },
        {
            title: "Vehicle No.",
            dataIndex: "vehicle_number",
            key: "vehicle_number",
            width: "25%",
        },
        {
            title: "Aadhar id",
            dataIndex: "aadhar_id",
            key: "aadhar_id",
            width: "25%",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            width: "25%",
        },
    ];

    return (
        <>
            <Button
                htmlType="button"
                className="float-right"
                type="primary"
                onClick={() => {
                    Inertia.get(`/admin/teacher/create`);
                }}
            >
                Add
            </Button>
            <Table
                bordered
                dataSource={drivers}
                columns={columns}
                pagination={{
                    onChange(current) {
                        setPage(current);
                    },
                }}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            Inertia.get(`/admin/driver/${record.user_id}/edit`);
                        },
                    };
                }}
            />
        </>
    );
};

export default DriverList;
