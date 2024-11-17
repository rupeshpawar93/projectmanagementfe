'use strict'

import React, { useState, useEffect, useContext, useCallback } from "react";
import ProjectForm from "./projectForm";
import ProjectCard from "./projectCard";
import SearchProjectBar from "./search";
import { withModal, Loader, Button, Input } from "../reuseable-component/index";
import AuthContext from "../context/authContext";
import Error from "./error";
import { useFetchAPI } from "../utilities/customHook";
import { statusList, labelList } from "../utilities/constants";

const ProjectModalForm = withModal(ProjectForm);

const Project = () => {
    const FetchAPI = useFetchAPI();
    const { isAdmin } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [pageNo, setPageNo] = useState(1);
    const [loading, setLoading] = useState(false);
    const [projectData, setProjectData] = useState({});
    const [members, setMembers] = useState({});
    const [apiError, setApiError] = useState(false);
    const [projectStatus, setProjectStatus] = useState('');
    const [projectDetail, setProjectDetail] = useState('')

    const fetchProject = useCallback(async () => {
        setLoading(true);
        try {
            const response = await FetchAPI(`project?pageNo=${pageNo}&pageSize=${pageSize}`, 'GET', {}, true);
            const { status, data } = response;
            if (status === 200) {
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

    const fetchProjectByStatus = useCallback(async()=> {
        setLoading(true);
        try {
            const response = await FetchAPI(`project/search`, 'POST', { where: {t_status: projectStatus}, operator: '='}, true);
            const { status, data } = response;
            if (status === 200) {
                setProjects(prev => {
                    return [...data.data.project]
                });
                setMembers(data.data.members);
                setLoading(false);
            }
        } catch (error) {
            console.log("--------error", error);
            setApiError(true);
        } finally {
            setLoading(false);
        }
    }, [projectStatus]);

    useEffect(() => {
        if(projectStatus!='') {
            fetchProjectByStatus();
        }
       
    }, [fetchProjectByStatus]);

    const searchProject = useCallback(async()=> {
        setLoading(true);
        try {
            const response = await FetchAPI(`project/search`, 'POST', { where: { p_name: projectDetail } , operator: 'like'}, true);
            const { status, data } = response;
            if (status === 200) {
                setProjects(prev => {
                    return [...data.data.project]
                });
                setMembers(data.data.members);
                setLoading(false);
            }
        } catch (error) {
            console.log("--------error", error);
            setApiError(true);
        } finally {
            setLoading(false);
        }
    }, [projectDetail]);

    useEffect(() => {
        if(projectDetail!='') {
            searchProject();
        }  
    }, [searchProject]);

    if (apiError) {
        return <Error />
    }
    return (
        <div className="container-fluid">
            <div className="d-flex row my-4">
                <h2 className="col-lg-3">Project</h2>
                {(isAdmin == 'true') && <div className="col-lg-3"><Button class="btn btn-primary" text="+ Project" clickHandle={resetFormModal} /></div>}
                
                <div class="dropdown col-lg-6 d-flex justify-content-end">
                    <SearchProjectBar searchProject={searchProject} projectDetail={projectDetail} setProjectDetail={setProjectDetail}/>
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Filter By Status
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {
                            Object.keys(statusList).map(list=> {
                                return  <li key={list}><Button  class="dropdown-item" type="submit" clickHandle={() => setProjectStatus(list)} text={statusList[list]} /></li>
                            })
                        }
                    </ul>
                </div>
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
