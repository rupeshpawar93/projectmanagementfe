'use strict'

import React, { useState, useEffect, useContext, useCallback } from "react";
import ProjectForm from "./projectForm";
import ProjectCard from "./projectCard";
import { withModal, Loader, Button } from "../reuseable-component/index";
import { FetchAPI } from "../utilities/apiCall";
import AuthContext from "../context/authContext";
import Error from "./error";

const ProjectModalForm = withModal(ProjectForm);

const Project = () => {
    const { isAdmin } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [pageNo, setPageNo] = useState(1);
    const [loading, setLoading] = useState(false);
    const [projectData, setProjectData] = useState({});
    const [members, setMembers] = useState({});
    const [apiError, setApiError] = useState(false);

    const fetchProject = useCallback(async () => {
        setLoading(true);
        try {
            const response = await FetchAPI(`project?pageNo=${pageNo}&pageSize=${pageSize}`, 'GET', {}, true);
            const data = await response.json();
            if (response.status === 200) {
                setProjects(prev => {
                    return [...data.data.project]
                });
                setMembers(data.data.members);
                setLoading(false);
            }
        } catch (error) {
            setApiError(true);
        } finally {
            setLoading(false);
        }
    }, [pageNo, pageSize])

    useEffect(() => {
        fetchProject();
        return () => {
        }
    }, [fetchProject])

    const resetFormModal = useCallback(() => {
        setProjectData({});
        projectFromModal();
    }, [])

    const projectFromModal = useCallback(() => {
        setShowModal(!showModal);
    }, [showModal]);

    if (apiError) {
        return <Error />
    }
    return (
        <div className="container-fluid">
            <div className="d-flex row my-4">
                <h2 className="col-lg-3">Project</h2>
                {(isAdmin == 'true') && <div className="col-lg-9"><Button class="btn btn-primary" text="+ Project" clickHandle={resetFormModal} /></div>}
            </div>
            <div className="row">
                {
                    !loading && projects && projects.map((project) => {
                        return (
                            <ProjectCard key={project.id} project={project} projectFromModal={projectFromModal} setLoading={setLoading} fetchProject={fetchProject} setProjectData={setProjectData} />
                        )
                    })
                }
                <ProjectModalForm members={members} showModal={showModal} clickHandle={projectFromModal} fetchProject={fetchProject} projectData={projectData} setApiError={setApiError} />
            </div>
            {loading && <Loader />}
        </div>
    )
}

export default Project;
