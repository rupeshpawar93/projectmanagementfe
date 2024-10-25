'use strict'

import React, { useState, useEffect } from "react";
import moment from "moment";
import { Label, Input, Button, Select, Loader } from "../reuseable-component/index";
import { FetchAPI } from "../utilities/apiCall";

const ProjectForm = (props) => {
    const { fetchProject, clickHandle, projectData, members, setApiError } = props;
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [targetCompletionDate, setTargetCompletionDate] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
    const [assignedMember, setAssignedMember] = useState([]);

    useEffect(() => {
        if (projectData) {
            setName(projectData.name);
            setDescription(projectData.description);
            setTargetCompletionDate(moment(projectData.targetCompletionDate).format('YYYY-MM-DD')); // Format date for input
        }
    }, [projectData]);

    const handleProject = async (e) => {
        e.preventDefault();
        setLoading(true);
        const buttonClicked = e.nativeEvent.submitter.name;
        try {
            if (buttonClicked === 'submit') {
                const response = await FetchAPI('project', 'POST', { name, description, targetCompletionDate, assignedMember }, true);
                const data = await response.json();
                if (response.status === 200) {
                    clickHandle(false);
                    fetchProject();
                }
            } else {
                const response = await FetchAPI(`project/${projectData.id}`, 'PATCH', { name, description, targetCompletionDate, assignedMember }, true);
                const data = await response.json();
                if (response.status === 200) {
                    clickHandle();
                    console.log("---------click handle---");
                    fetchProject();
                }
            }
        } catch (error) {
            setApiError(true);
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <form onSubmit={handleProject} >
                <div className="form-group my-4">
                    <Label forId="projectName" text="Name" />
                    <Input type="text" class="form-control" set={setName} value={name} name="name" id="projectName" required="true" maxlength="200" />
                </div>
                <div className="form-group  my-4">
                    <Label forId="projectDesc" text="Description" />
                    <Input type="text" class="form-control" set={setDescription} value={description} name="description" id="projectDesc" required="true" maxlength="200" />
                </div>
                <div className="form-group  my-4">
                    <Label forId="targetCompletionDate" text="Target Completion Date" />
                    <Input type="date" class="form-control" set={setTargetCompletionDate} value={targetCompletionDate} name="targetCompletionDate" id="targetCompletionDate" required="true" />
                </div>
                <div className="form-group  my-4">
                    <Label forId="assignedMember" text="Assigned To Member" />
                    <Select multiple="true" class="form-control" set={setAssignedMember} options={members} name="assignedMember" id="assignedMember" defaultValue="Select Members" required="true" />
                </div>
                {
                    Object.keys(projectData).length === 0 ? <Button name="submit" type="submit" class="btn btn-primary" text="Submit" /> : <Button name="update" type="submit" class="btn btn-primary" text="Update" />
                }
            </form>
            {loading && <Loader />}
        </>
    )
}

export default ProjectForm;