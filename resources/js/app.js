require("./bootstrap");

import { App } from "@inertiajs/inertia-react";
import React from "react";
import { render } from "react-dom";
import "./App.css";
import AdminLayout from "./layouts/admin";
import ParentLayout from "./layouts/parent";
import TeacherLayout from "./layouts/teacher";
import StudentLayout from "./layouts/student";

const el = document.getElementById("app");

render(
    <App
        initialPage={JSON.parse(el.dataset.page)}
        resolveComponent={(name) =>
            import(`./Pages/${name}`).then(({ default: page }) => {
                if (page.layout === undefined && name.startsWith("Admin/")) {
                    page.layout = (page) => <AdminLayout children={page} />;
                }
                if (page.layout === undefined && name.startsWith("Teacher/")) {
                    page.layout = (page) => <TeacherLayout children={page} />;
                }
                if (page.layout === undefined && name.startsWith("Student/")) {
                    page.layout = (page) => <StudentLayout children={page} />;
                }
                if (page.layout === undefined && name.startsWith("Parent/")) {
                    page.layout = (page) => <ParentLayout children={page} />;
                }
                return page;
            })
        }
    />,
    el
);
