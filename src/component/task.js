
'use strict'

import React, { useEffect, useState } from 'react';
import { FetchAPI } from '../utilities/apiCall';
import Button from '../reuseable-component/button';
import TaskCard from './taskCard';
import { useParams } from 'react-router-dom';
import withModal from '../reuseable-component/modal';
import TaskForm from './taskForm';

const TaskModelForm = withModal(TaskForm);

const Task = () => {
   const { id } = useParams();
   const [showModal, setShowModal] = useState(false);
   const [taskList, setTaskList] = useState([]);
   const [loading, setLoading] = useState(false);
   const [taskData, setTaskData] =  useState({});

   useEffect(() => {
    console.log("--taks page called before");
    fetchTask(id);
    console.log("--taks page called after")

   }, [])
   
   async function fetchTask(id) {
       setLoading(true);
       const response = await FetchAPI(`task/project/${id}`, 'GET', {}, true);
       const data = await response.json();
       if(response.status === 200) {
            console.log("----data", data);
            setLoading(false);
            setTaskList(data.data)
            
       }
   }

   const resetFormModal = () => {
        setTaskData({});
        taskFormModal();
    }
   const taskFormModal = () => {
        setShowModal(!showModal);
   }
   if(taskList.length === 0) {
    return <div className="container-fluid"><p>No task present for this project</p></div>
   }
   return (
       <div className="container-fluid">
           <div className="d-flex row my-4">
               <h2 className="col-lg-3">Task</h2>
               <div className="col-lg-9"><Button class="btn btn-primary" text="+ Task"  clickHandle={resetFormModal}/></div>
           </div>
           <div className="row"> 
               { loading && <p>...Loading</p>}
               {
                   !loading && taskList && taskList.map((task) => {
                       return (
                            <TaskCard key={task.id} task={task} taskFormModal={taskFormModal} setLoading={setLoading} fetchTask={fetchTask} setTaskData={setTaskData}/>
                       )
                   })
               }
               <TaskModelForm project_id={id} showModal={showModal} clickHandle={taskFormModal} fetchTask={fetchTask} taskData={taskData}/>
           </div>
       </div>
   )
}

export default Task;