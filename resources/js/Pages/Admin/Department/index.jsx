import { Inertia } from "@inertiajs/inertia";
import { Button, Table, Modal, Form, Input } from "antd";
import React, { useCallback, useEffect, useState } from "react";

const Department = ({ departments }) => {
    console.log(departments);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [page, setPage] = useState(1);
    const [action, setAction] = useState();
    const [initialValues, setInitialValues] = useState({});
    const [form] = Form.useForm();
    useEffect(() => {
        form.resetFields();
    }, [isModalVisible]);

    const showAddModal = () => {
        setAction("Add");
        setIsModalVisible(true);
        setInitialValues({ department: "" });
    };

    const showEditModal = useCallback(
        (data) => {
            setAction("Edit");
            setIsModalVisible(true);
            setInitialValues({
                id: data.id,
                department: data.department,
            });
        },
        [initialValues, action, departments]
    );

    const reset = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    const onFinish = (values) => {
        if (action === "Add") Inertia.post(`/admin/department`, values);
        if (action === "Edit")
            Inertia.put(`/admin/department/${initialValues?.id}`, values);
        reset();
    };
    const columns = [
        {
            title: "Sl No.",
            key: "index",
            render: (value, item, index) => (page - 1) * 10 + index + 1,
            width: 50,
        },
        {
            title: "Department",
            dataIndex: "department",
            key: "department",
        },
    ];

    return (
        <>
            <Button
                htmlType="button"
                className="float-right"
                type="primary"
                onClick={showAddModal}
            >
                Add
            </Button>
            <Table
                bordered
                dataSource={departments}
                columns={columns}
                pagination={{
                    onChange(current) {
                        setPage(current);
                    },
                }}
                onRow={(record) => {
                    return {
                        onClick: () => showEditModal(record),
                    };
                }}
            />
            <Modal
                title={`${action} department`}
                visible={isModalVisible}
                footer={null}
                onCancel={reset}
            >
                <Form
                    className="text-left"
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    layout="vertical"
                    scrollToFirstError
                    initialValues={initialValues}
                >
                    <Form.Item
                        name="department"
                        label="Department"
                        rules={[
                            {
                                required: true,
                                message: "Please input a department name!",
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {`${action === "Add" ? "Save" : "Update"}`}
                        </Button>
                        {action !== "Add" ? (
                            <Button
                                htmlType="button"
                                className="float-right"
                                danger
                                onClick={() => {
                                    Inertia.delete(
                                        `/admin/department/${initialValues.id}`
                                    );
                                    reset();
                                }}
                            >
                                Delete
                            </Button>
                        ) : (
                            ""
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Department;
