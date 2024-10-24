'use strict'

import React, { useState, useEffect, useContext } from "react";
import ProjectForm from "./projectForm";
import ProjectCard from "./projectCard";
import withModal from "../reuseable-component/modal";
import Button from "../reuseable-component/button";
import { FetchAPI } from "../utilities/apiCall";
import AuthContext from "../context/authContext";

const ProjectModalForm = withModal(ProjectForm);

const Project = () => {
    const { isAdmin } = useContext(AuthContext);
    console.log("--------isAdmin-------", isAdmin);
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [pageNo, setPageNo] = useState(1);
    const [loading, setLoading] = useState(false);
    const [projectData, setProjectData] = useState({});
    const [members, setMembers] = useState({});

    useEffect(() => {
      setLoading(true);
      fetchProject();
      return () => {
      }
    }, [pageNo, pageSize])
    
    async function fetchProject() {
        const response = await FetchAPI(`project?pageNo=${pageNo}&pageSize=${pageSize}`, 'GET', {}, true);
        const data = await response.json();
        if(response.status===200) {
            console.log("============data", data);
            setProjects(prev=>{
                return [...data.data.project]
            });
            setMembers(data.data.members);
            setLoading(false);
        }
    }

    const resetFormModal = () => {
        setProjectData({});
        projectFromModal();
    }

    const projectFromModal = () => {
        setShowModal(!showModal);
    }

    return (
        <div className="container-fluid">
            <div className="d-flex row my-4">
                <h2 className="col-lg-3">Project</h2>
                { (isAdmin == 'true') && <div className="col-lg-9"><Button class="btn btn-primary" text="+ Project" clickHandle={resetFormModal}/></div>}
            </div>
            <div className="row"> 
                { loading && <p>...Loading</p>}
                {
                    !loading && projects && projects.map((project) => {
                        return (
                           <ProjectCard key={project.id} project={project} projectFromModal={projectFromModal} setLoading={setLoading} fetchProject={fetchProject} setProjectData={setProjectData}/>
                        )

                    })
                }
                <ProjectModalForm members={members} showModal={showModal} clickHandle={projectFromModal} fetchProject={fetchProject} projectData={projectData}/>
            </div>
        </div>
    )
}

export default Project;
