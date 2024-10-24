'use strict'

import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../reuseable-component/button";
import { FetchAPI } from '../utilities/apiCall';
import { labelList, statusList, priorityList } from "../utilities/constants";

const TaskCard = (props) => {
    const { task, fetchTask, setLoading, setTaskData, taskFormModal } = props;
    const { project_id: id } = task;
    const navigate = useNavigate()

    async function deleteTask() {
        setLoading(true);
        const response = await FetchAPI(`task/${task.id}`, 'DELETE', {}, true);
        console.log("---------delete api called");
        const data = await response.json();
        if(response.status===200) {
            setLoading(false);
            fetchTask(id);
        }
    }

    return (<div className="col-sm-4 mb-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Title: {task.title}</h5>
            <p className="card-text">Label: {labelList[task.label]}</p>
            <p className="card-text">Status: {statusList[task.status]}</p>
            <p className="card-text">Proirity: {priorityList[task.priority]}</p>
            <div className="d-lg-flex flex-row flex-sm-column flex-md-column flex-lg-row justify-content-between">
                <Button class="btn btn-primary" text="Update" clickHandle={
                    () => {
                        setTaskData(task);
                        taskFormModal();
                    }
                } />
                <Button class="btn btn-danger" text="Delete" clickHandle={deleteTask} />
            </div>
          </div>
        </div>
      </div>)
}

export default TaskCard;