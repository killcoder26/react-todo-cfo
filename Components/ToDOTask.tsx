import React, { useEffect, useState } from 'react';
import { ITask } from '../Interfaces';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Checkbox, TextField } from '@mui/material';
import './todo.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
  task: ITask;
  deleteTask(taskName: string): void;
}

const ToDOTask = ({ task, deleteTask }: Props, key: number) => {
  const [open, setOpen] = useState(false);
  const [editedtask, setEditedtask] = useState('');
  const [editedday, setEditedDay] = useState<number>(0);
  const dialogClose = () => {
    setOpen(!open);
  };
  const edit = () => {
    dialogClose();
    setEditedtask(task.taskName);
    setEditedDay(task.deadline);
  };
  const editFinal = () => {
    task.taskName = editedtask;
    task.deadline = editedday;
    dialogClose();
  };

  return (
    <div className="task">
      <div className="content">
        <Checkbox
          aria-label="chk"
          sx={{ color: 'white', '&.Mui-checked': { color: 'orange' } }}
          onChange={(e) => {
            if (e.target.checked === true) {
              task.completed = true;
            } else {
              task.completed = false;
            }
          }}
        />
        <span className={task.completed ? 'strike' : 'normal'}>
          {task.taskName}
        </span>
        <span className={task.completed ? 'strike' : 'normal'}>
          {task.deadline} Day(s)
        </span>
        <Button onClick={edit}>
          <EditIcon sx={{ color: 'white', marginLeft: 2 }} />
        </Button>
        <Button
          onClick={() => {
            deleteTask(task.taskName);
          }}
        >
          <DeleteIcon sx={{ color: 'white', marginLeft: 2 }} />
        </Button>
      </div>
      <Dialog open={open} onClose={dialogClose}>
        <DialogTitle>EDIT TASKS</DialogTitle>
        <DialogContent sx={{ width: 300, height: 170 }}>
          <DialogContentText>Enter Task Name:</DialogContentText>
          <TextField
            autoFocus
            variant="standard"
            value={editedtask}
            onChange={(e) => {
              setEditedtask(e.target.value);
            }}
            sx={{ width:290,marginTop:2,marginBottom:1 }}
          />
          <DialogContentText>Enter Task Duration:</DialogContentText>
          <TextField
            autoFocus
            variant="standard"
            value={editedday}
            onChange={(e) => {
              setEditedDay(Number(e.target.value));
            }}
            sx={{ width:290,marginTop:2,marginBottom:1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogClose}>Cancel</Button>
          <Button onClick={editFinal}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ToDOTask;
