'use strict'

import React, {useState, useEffect, useContext} from "react";
import moment from "moment";
import Label from "../reuseable-component/label";
import Input from "../reuseable-component/input";
import Button from "../reuseable-component/button";
import { FetchAPI } from "../utilities/apiCall";
import Select from "../reuseable-component/select";
import { labelList, statusList, priorityList } from "../utilities/constants";
import AuthContext from "../context/authContext";

const TaskForm = (props) => {
    const { isAdmin } = useContext(AuthContext);
    const { fetchTask, clickHandle, taskData, project_id } = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [label, setLabel] = useState('');
    const [priority, setPriority] = useState('');
    const [targetCompletionDate, setTargetCompletionDate] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));

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
        console.log(e.target);
        const buttonClicked = e.nativeEvent.submitter.name;
        console.log("-------buttonClicked-", buttonClicked);
        if(buttonClicked === 'submit') {
            const response = await FetchAPI('task', 'POST', { title, description, targetCompletionDate, priority, status, label, project_id}, true);
            const data = await response.json();
            if(response.status === 200) {
                clickHandle(false);
                fetchTask(project_id);
            }
        } else {
            const response = await FetchAPI(`task/${taskData.id}`, 'PATCH', { title, description, targetCompletionDate, priority, status, label, project_id}, true);
            const data = await response.json();
            if(response.status === 200) {
                clickHandle(false);
                fetchTask(project_id);
            } 
        }  
    };

    return (
            <form onSubmit={handleTask} >
                <div className="form-group my-4">
                    <Label forId="taskTitle" text="Title"/>
                    <Input type="text" class="form-control" set={setTitle} value={title} name="title" id="taskTitle" required="true" maxlength="200"/>
                </div>
                <div className="form-group  my-4">
                    <Label forId="taskDesc" text="Description"/>
                    <Input type="text" class="form-control" set={setDescription} value={description} name="description" id="taskDesc" required="true" maxlength="200"/>
                </div>
                <div className="form-group  my-4">
                    <Label forId="label" text="Label"/>
                    <Select type="text" defaultValue='Select Label' name="label" id="label" set={setLabel} value={label} options={labelList} class="form-control form-control-md" />
                </div>
                <div className="form-group  my-4">
                    <Label forId="status" text="Status"/>
                    <Select type="text" defaultValue='Select Status' name="status" id="status" set={setStatus} value={status} options={statusList} class="form-control form-control-md" />
                </div>
                <div className="form-group  my-4">
                    <Label forId="priority" text="Priority"/>
                    <Select type="text" defaultValue='Select Priority' name="priority" id="priority" set={setPriority} value={priority} options={priorityList} class="form-control form-control-md" />
                </div>
                <div className="form-group  my-4">
                    <Label forId="targetCompletionDate" text="Target Completion Date"/>
                    <Input type="date" class="form-control" set={setTargetCompletionDate} value={targetCompletionDate} name="targetCompletionDate" id="targetCompletionDate" required="true" />
                </div>
                {
                  isAdmin === 'true' && <div className="form-group  my-4">
                        <Label forId="targetCompletionDate" text="Target Completion Date"/>
                        <Input type="date" class="form-control" set={setTargetCompletionDate} value={targetCompletionDate} name="targetCompletionDate" id="targetCompletionDate" required="true" />
                    </div>
                }
                {
                    Object.keys(taskData).length === 0 ? <Button name="submit" type="submit" class="btn btn-primary" text="Submit" /> : <Button name="update" type="submit" class="btn btn-primary" text="Update" />
                }
        
                
            </form>
    )
}

export default TaskForm;