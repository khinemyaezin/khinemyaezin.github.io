"use client";

import { memo } from "react";
import Project from "./Project";

const ProjectWrapper = memo(function ProjectWrapper() {
  return (
    <section className="relative min-h-full">
      <Project />
    </section>
  );
});

export default ProjectWrapper;
