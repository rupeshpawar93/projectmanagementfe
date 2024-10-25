'use strict'

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../reuseable-component/index";
import { FetchAPI } from "../utilities/apiCall";
import AuthContext from "../context/authContext";

const ProjectCard = (props) => {
    const { isAdmin } = useContext(AuthContext);
    const { project, projectFromModal, fetchProject, setLoading, setProjectData } = props
    const { id, name, description, targetCompletionDate, taskCount } = project

    async function deleteProject() {
        setLoading(true);
        const response = await FetchAPI(`project/${id}`, 'DELETE', {}, true);
        const data = await response.json();
        if (response.status === 200) {
            fetchProject();
            setLoading(false);
        }
    }

    return (
        <div className="col-sm-4 mb-4" key={id}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Name: {name}</h5>
                    <p className="card-text">Description: {description}</p>
                    <p className="card-text">Target Date: {targetCompletionDate}</p>
                    <div className="d-flex justify-content-between mb-4">
                        <Link to={`/project/${id}`} className="btn btn-primary">Go in Task List</Link>
                        <Link to={`/project/${id}`} className="btn btn-primary">Task Count: {taskCount}</Link>
                    </div>

                    {
                        isAdmin === 'true' && (
                            <div className="d-flex justify-content-between">
                                <Button class="btn btn-primary" text="Update" clickHandle={() => {
                                    setProjectData(project);
                                    projectFromModal();
                                }} />
                                <Button class="btn btn-danger" text="Delete" clickHandle={deleteProject} />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default React.memo(ProjectCard);