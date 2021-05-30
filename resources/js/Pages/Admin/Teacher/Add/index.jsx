/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
    Form,
    Input,
    Button,
    Upload,
    Select,
    DatePicker,
    message,
    InputNumber,
} from "antd";
import { Inertia } from "@inertiajs/inertia";
import { UploadOutlined } from "@ant-design/icons";

const AddDriver = () => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const [image, setImage] = useState("");
    const onFinish = (values) => {
        const data = { ...values, profile_picture: image };
        Inertia.post(`/admin/teacher`, data);
    };

    function customRequest(option) {
        const formData = new FormData();
        formData.append("files[]", option.file);
        const reader = new FileReader();
        reader.readAsDataURL(option.file);
        reader.onloadend = function (e) {
            setImage(e.target.result);
            if (e && e.target && e.target.result) {
                option.onSuccess();
            }
        };
    }

    function beforeUpload(file) {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("Only upload JPG or PNG files!");
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image size must be less than 2MB!");
            return false;
        }
        return isJpgOrPng && isLt2M;
    }

    const props = {
        customRequest: customRequest,
        showUploadList: true,
        beforeUpload: beforeUpload,
    };

    return (
        <Form
            className="text-left"
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            scrollToFirstError
        >
            <div className="row">
                <div className="col-6">
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Name!",
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                            {
                                required: true,
                                message: "Please input your E-mail!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        new Error(
                                            "The two passwords that you entered do not match!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[
                            {
                                type: "text",
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="age"
                        label="Age"
                        rules={[
                            {
                                type: "number",
                                required: true,
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="dob"
                        label="Date of birth"
                        rules={[
                            {
                                type: "date",
                                required: true,
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select defaultValue="select" style={{ width: 120 }}>
                            <Option disabled value="select">
                                Select
                            </Option>
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                        </Select>
                    </Form.Item>
                </div>
                <div className="col-6">
                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[
                            {
                                type: "text",
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="religion"
                        label="Religion"
                        rules={[
                            {
                                type: "text",
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="fatherName"
                        label="Father's Name"
                        rules={[
                            {
                                type: "text",
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="motherName"
                        label="Mother's Name"
                        rules={[
                            {
                                type: "text",
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="guardian"
                        label="Guardian"
                        rules={[
                            {
                                type: "text",
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="nationality"
                        label="Nationality"
                        rules={[
                            {
                                type: "text",
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="qualification"
                        label="Highest qualification"
                        rules={[
                            {
                                type: "text",
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[
                            {
                                type: "text",
                                required: true,
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </div>
            </div>

            <Form.Item label="Profile Picture" valuePropName="fileList">
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddDriver;
