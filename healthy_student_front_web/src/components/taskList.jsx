import React, { useEffect, useState} from 'react';
import { Task } from './task';
import Stack from '@mui/material/Stack';
import instance from '../axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        getTasks("NEW", "Admin", setTasks);
      }, [])

    return (
        <Stack>
        {tasks.map(task => {
            return <Task key={task.id} item={task}/>
        })}
        </Stack>
    );
}

export const getTasks = async (status, user) => {
    const { data } = await instance.get(`http://localhost:8080/tasks?status=NEW&user=1`);
    return data;
  }

export { TaskList };