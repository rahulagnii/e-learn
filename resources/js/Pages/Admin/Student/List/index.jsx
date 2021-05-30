import React from "react";
import { Table, Button } from "antd";
import { Inertia } from "@inertiajs/inertia";

const OfficersList = ({ hospitals }) => {
    console.log(hospitals);
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
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            width: "25%",
        },
        {
            title: "website",
            dataIndex: "website",
            key: "aadhar_id",
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
                    Inertia.get(`/admin/student/create`);
                }}
            >
                Add
            </Button>
            <Table
                bordered
                dataSource={hospitals}
                columns={columns}
                pagination={{
                    onChange(current) {
                        setPage(current);
                    },
                }}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            Inertia.get(
                                `/admin/hospital/${record.user_id}/edit`
                            );
                        },
                    };
                }}
            />
        </>
    );
};

export default OfficersList;
