import { Card } from "antd";
import React from "react";

const Admin = ({ teachers, students, parents }) => {
    const gridStyle = {
        width: "25%",
        textAlign: "center",
        color: "#fff",
        borderRadius: 10,
        margin: 10,
    };
    return (
        <Card bordered={false} style={{ background: "#f9f9f9" }}>
            <div className="d-flex justify-content-center">
                <Card.Grid style={{ ...gridStyle, background: "#d81159" }}>
                    <h5 style={{ color: "#fff" }}>Teachers</h5>
                    <div style={{ fontSize: 50, fontWeight: "bolder" }}>
                        {teachers}
                    </div>
                </Card.Grid>
                <Card.Grid style={{ ...gridStyle, background: "#8f2d56" }}>
                    <h5 style={{ color: "#fff" }}>Students</h5>
                    <div style={{ fontSize: 50, fontWeight: "bolder" }}>
                        {students}
                    </div>
                </Card.Grid>
                <Card.Grid style={{ ...gridStyle, background: "#218380" }}>
                    <h5 style={{ color: "#fff" }}>Parents</h5>
                    <div style={{ fontSize: 50, fontWeight: "bolder" }}>
                        {parents}
                    </div>
                </Card.Grid>
            </div>
        </Card>
    );
};

export default Admin;
