import { Inertia } from "@inertiajs/inertia";
import { Button, Table, Modal, Form, Input, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";

const Semester = ({ courses, semesters }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [page, setPage] = useState(1);
    const [action, setAction] = useState();
    const [initialValues, setInitialValues] = useState({});
    const [form] = Form.useForm();
    const { Option } = Select;
    useEffect(() => {
        form.resetFields();
    }, [isModalVisible]);

    const showAddModal = () => {
        setAction("Add");
        setIsModalVisible(true);
        setInitialValues({ semester: "" });
    };

    const showEditModal = useCallback(
        (data) => {
            setAction("Edit");
            setIsModalVisible(true);
            setInitialValues({
                id: data.id,
                course: data.course,
                semester: data.semester,
            });
        },
        [initialValues, action, semesters]
    );

    const reset = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    const onFinish = (values) => {
        if (action === "Add") Inertia.post(`/admin/course`, values);
        if (action === "Edit")
            Inertia.put(`/admin/course/${initialValues?.id}`, values);
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
            title: "Course",
            dataIndex: "course",
            key: "course",
        },
        {
            title: "Semester",
            dataIndex: "semester",
            key: "semester",
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
                dataSource={courses}
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
                        name="course"
                        label="Course"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select defaultValue="" style={{ width: 120 }}>
                            <Option disabled value="">
                                Select
                            </Option>
                            {courses.map(({ course, id }) => (
                                <Option key={`dep${id}`} value={id}>
                                    {course}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="semester"
                        label="Semester"
                        rules={[
                            {
                                required: true,
                                message: "Please input a semester name!",
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
                                        `/admin/semester/${initialValues.id}`
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

export default Semester;
