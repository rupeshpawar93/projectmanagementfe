
'use strict'

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { FetchAPI } from '../utilities/apiCall';
import TaskCard from './taskCard';
import {Loader, withModal, Button} from '../reuseable-component/index';
import TaskForm from './taskForm';
import Error from './error';

const TaskModelForm = withModal(TaskForm);

const Task = () => {
   const { id } = useParams();
   const [showModal, setShowModal] = useState(false);
   const [taskList, setTaskList] = useState([]);
   const [loading, setLoading] = useState(false);
   const [taskData, setTaskData] =  useState({});
   const [memberList, setMemberList] = useState({});
   const [projectTargetDate, setProjectTargetDate] = useState('');
   const [apiError, setApiError] = useState(false);

   const fetchTask = useCallback(async (id) => {
        setLoading(true);
        try {
            const response = await FetchAPI(`task/project/${id}`, 'GET', {}, true);
            const data = await response.json();
            if(response.status === 200) {
                setTaskList(data.data.task);
                setMemberList(data.data.members ?? {});
                setProjectTargetDate(data.data.projectTargetDate);
                setLoading(false);
            }
        } catch (error) {
            setApiError(true);
        } finally {
            setLoading(false);
        }
    }, [id]);

   useEffect(() => {
    fetchTask(id);
   }, [fetchTask])

   useEffect(() => {
    }, [memberList, projectTargetDate]);
   


   const resetFormModal = useCallback(() => {
        setTaskData({});
        taskFormModal();
    }, []);

   const taskFormModal = useCallback(() => {
        setShowModal(!showModal);
    }, [showModal]);

   if(apiError) {
    return <>
        <div className="container-fluid">
            <Error />
        </div>
       </>
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
                                    <TaskCard key={task.id} task={task} taskFormModal={taskFormModal} setLoading={setLoading} fetchTask={fetchTask} setTaskData={setTaskData} setApiError={setApiError}/>
                            )
                        })
                    }
                    
              </div>
            }
            { Object.keys(memberList).length > 0 && <TaskModelForm project_id={id} showModal={showModal} clickHandle={taskFormModal} fetchTask={fetchTask} taskData={taskData} memberList={memberList} projectTargetDate={projectTargetDate} setApiError={setApiError} /> }
       </div>
       { loading && <Loader /> }
       </>
   )
}

export default Task;