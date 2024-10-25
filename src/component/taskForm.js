'use strict'

import React, {useState, useEffect, useContext} from "react";
import moment from "moment";
import {Label, Button, Input, Loader, Select} from "../reuseable-component/index";
import { FetchAPI, errorAPIFormat } from "../utilities/apiCall";
import { labelList, statusList, priorityList } from "../utilities/constants";
import AuthContext from "../context/authContext";

const TaskForm = (props) => {
    const { isAdmin } = useContext(AuthContext);
    const { fetchTask, clickHandle, taskData, project_id, memberList , projectTargetDate, setApiError } = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [label, setLabel] = useState('');
    const [priority, setPriority] = useState('');
    const [targetCompletionDate, setTargetCompletionDate] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
    const [assignedTo, setAssignedTo] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (taskData) {
            setTitle(taskData.title);
            setDescription(taskData.description);
            setLabel(taskData.label);
            setPriority(taskData.priority);
            setStatus(taskData.status);
            setTargetCompletionDate(moment(taskData.targetCompletionDate).format('YYYY-MM-DD')); // Format date for input
        }
    }, [taskData]);

    const handleTask = async (e) => {
        e.preventDefault();
        setLoading(true);
        const buttonClicked = e.nativeEvent.submitter.name;
        try {
            if(buttonClicked === 'submit') {
                const response = await FetchAPI('task', 'POST', { title, description, targetCompletionDate, priority, status, label, project_id, assigned_to: isAdmin ? assignedTo : null}, true);
                const data = await response.json();
                if(response.status === 200) {
                    clickHandle(false);
                    fetchTask(project_id);
                } else {
                    const errorResponse = errorAPIFormat(data.errors);
                    console.log("--------errResponse", errorResponse)
                    setErrors(errorResponse);
                }
            } else {
                const response = await FetchAPI(`task/${taskData.id}`, 'PATCH', { title, description, targetCompletionDate, priority, status, label, project_id, assigned_to: isAdmin ? assignedTo : null}, true); 
                const data = await response.json();
                if(response.status === 200) {
                    clickHandle(false);
                    fetchTask(project_id);
                } else {
                    const errorResponse = errorAPIFormat(data.errors);
                    console.log("--------errResponse", errorResponse)
                    setErrors(errorResponse);
                }
            }
        } catch(error) {
            setApiError(true);
        } finally {
            setLoading(false);
        }
        
    };

    return (
            <>
                <form onSubmit={handleTask} >
                    <div className="form-group my-4">
                        <Label forId="taskTitle" text="Title"/>
                        <Input type="text" class="form-control" set={setTitle} value={title} name="title" id="taskTitle" required="true" maxlength="200"/>
                        { errors && errors['title'] && <span className="text-danger">{errors['title']}</span>}
                    </div>
                    <div className="form-group  my-4">
                        <Label forId="taskDesc" text="Description"/>
                        <Input type="text" class="form-control" set={setDescription} value={description} name="description" id="taskDesc" required="true" maxlength="200"/>
                        { errors && errors['description'] && <span className="text-danger">{errors['description']}</span>}
                    </div>
                    <div className="form-group  my-4">
                        <Label forId="label" text="Label"/>
                        <Select type="text" defaultValue='Select Label' name="label" id="label" set={setLabel} value={label} options={labelList} class="form-control form-control-md" />
                        { errors && errors['label'] && <span className="text-danger">{errors['label']}</span>}
                    </div>
                    <div className="form-group  my-4">
                        <Label forId="status" text="Status"/>
                        <Select type="text" defaultValue='Select Status' name="status" id="status" set={setStatus} value={status} options={statusList} class="form-control form-control-md" />
                        { errors && errors['status'] && <span className="text-danger">{errors['status']}</span>}
                    </div>
                    <div className="form-group  my-4">
                        <Label forId="priority" text="Priority"/>
                        <Select type="text" defaultValue='Select Priority' name="priority" id="priority" set={setPriority} value={priority} options={priorityList} class="form-control form-control-md" />
                        { errors && errors['priority'] && <span className="text-danger">{errors['priority']}</span>}
                    </div>
                    <div className="form-group  my-4">
                        <Label forId="targetCompletionDate" text="Target Completion Date"/>
                        <Input type="date" class="form-control" set={setTargetCompletionDate} value={targetCompletionDate} name="targetCompletionDate" id="targetCompletionDate" required="true"  max={projectTargetDate.split('T')[0]}/>
                        { errors && errors['targetCompletionDate'] && <span className="text-danger">{errors['targetCompletionDate']}</span>}
                    </div>
                    {
                    isAdmin === 'true' && <div className="form-group  my-4">
                        <Label forId="assignedMember" text="Assigned To Member"/>
                        <Select multiple="false" class="form-control" set={setAssignedTo} options={memberList} value={assignedTo} name="assignedMember" id="assignedMember" defaultValue="Select Members" required="true" />
                    </div>
                    }
                    {
                        Object.keys(taskData).length === 0 ? <Button name="submit" type="submit" class="btn btn-primary" text="Submit" /> : <Button name="update" type="submit" class="btn btn-primary" text="Update" />
                    }
                </form>
                { loading && <Loader /> }
            </>
    )
}

export default TaskForm;