
'use strict'

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FetchAPI } from '../utilities/apiCall';
import TaskCard from './taskCard';
import {Loader, withModal, Button} from '../reuseable-component/index';
import TaskForm from './taskForm';

const TaskModelForm = withModal(TaskForm);

const Task = () => {
   const { id } = useParams();
   const [showModal, setShowModal] = useState(false);
   const [taskList, setTaskList] = useState([]);
   const [loading, setLoading] = useState(false);
   const [taskData, setTaskData] =  useState({});
   const [memberList, setMemberList] = useState({});

   useEffect(() => {
    fetchTask(id);
   }, [id])

   useEffect(() => {
    // This will log `memberList` after it is updated
    console.log("------memberList useEffect", memberList);
    }, [memberList]);
   
   async function fetchTask(id) {
       setLoading(true);
       const response = await FetchAPI(`task/project/${id}`, 'GET', {}, true);
       const data = await response.json();
       if(response.status === 200) {
            setTaskList(data.data.task);
            setMemberList(data.data.members ?? {});
            setLoading(false);
            console.log(data.data);
            console.log("------memberList", memberList);
            console.log("----------setTaskList", taskList);
       }
   }

   const resetFormModal = () => {
        setTaskData({});
        taskFormModal();
    }

   const taskFormModal = () => {
        setShowModal(!showModal);
    } 
    
   return (
        <>
       <div className="container-fluid">
           <div className="d-flex row my-4">
               <h2 className="col-lg-3">Task</h2>
               <div className="col-lg-9"><Button class="btn btn-primary" text="+ Task"  clickHandle={resetFormModal}/></div>
           </div>
           {
              taskList.length > 0 &&  <div className="row"> 
                    {
                        !loading && taskList && taskList.map((task) => {
                            return (
                                    <TaskCard key={task.id} task={task} taskFormModal={taskFormModal} setLoading={setLoading} fetchTask={fetchTask} setTaskData={setTaskData}/>
                            )
                        })
                    }
                    
              </div>
            }
            { Object.keys(memberList).length > 0 && <TaskModelForm project_id={id} showModal={showModal} clickHandle={taskFormModal} fetchTask={fetchTask} taskData={taskData} memberList={memberList} /> }
       </div>
       { loading && <Loader /> }
       </>
   )
}

export default Task;