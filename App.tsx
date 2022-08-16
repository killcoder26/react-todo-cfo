import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Button, Typography } from '@mui/material';
import { ITask } from './Interfaces';
import ToDOTask from './Components/ToDOTask';

const App: FC = () => {
  const [task, setTask] = useState<string>(' ');
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodolist] = useState<ITask[]>([]);
  const [deletedList, setdeletedlist] = useState<ITask[]>([]);
  const [ID, setId] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const [isDeleted, setDeleted] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'task') {
      setTask(event.target.value);
    }
    if (event.target.name === 'deadline') {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = {
      id: ID,
      taskName: task,
      deadline: deadline,
      completed: false,
      isDeleted: false,
    };
    setTodolist([...todoList, newTask]);
    console.log(todoList);
    setId(ID + 1);
    setTask('');
    setDeadline(0);
    setCompleted(false);
  };
  const deleteTask = (taskID: number): void => {
    setTodolist(todoList.filter((t) => t.id !== taskID));
    let a = todoList.filter((t) => t.id === taskID);
    setdeletedlist([...deletedList, ...a]);
    console.log(deletedList);
  };

  const updateTaskHandler = (taskName: string): void => {};

  return (
    <div className="App">
      <div className="header">
        <TextField
          label="Task..."
          value={task}
          name="task"
          id="custom-css-outlined-input"
          onChange={handleChange}
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="Days..."
          value={deadline}
          name="deadline"
          onChange={handleChange}
        />
        <Button className="add-btn" onClick={addTask}>
          <AddTaskIcon
            sx={{ fontSize: 30, color: '#70e000', marginTop: 0.5 }}
          />
        </Button>
      </div>
      <Typography sx={{ textAlign: 'left', fontSize: 30, marginLeft: 1 }}>
        Tasks:
      </Typography>
      <div className="todo">
        {todoList.map((task: ITask, key: number) => {
          return (
            <div className="list">
              <ul>
                <li key={key}>
                  <ToDOTask key={key} task={task} deleteTask={deleteTask} />
                </li>
              </ul>
            </div>
          );
        })}
      </div>
      {deletedList.length === 0 ? (
        <div></div>
      ) : (
        <div>
          <Typography sx={{ textAlign: 'left', fontSize: 24, marginLeft: 1 }}>
            Deleted Task:
          </Typography>
          <div className="todo2">
            {deletedList.map((task: ITask, key: number) => {
              return (
                <div className="list">
                  <ul>
                    <li key={key}>
                      {task.taskName}&nbsp;&nbsp;&nbsp;{task.deadline}days
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
