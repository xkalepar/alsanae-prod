import React from "react";
import { CreateProjectFormPage } from "../components/forms";
import { createProjectAction } from "../actions";

const page = () => {
  return (
    <div>
      <div className="container py-10">
        <CreateProjectFormPage action={createProjectAction} />;
      </div>
    </div>
  );
};

export default page;
