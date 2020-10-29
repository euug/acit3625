import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Form from "./Form";
import FilterButton from "./FilterButton";
import Todo from "./Todo";

const DATA = [];

const FILTER_MAP = {
  All: () => true,
  NotStarted: task => 0,
  Started: task => 1,
  Completed: task => 2
};

const FILTER_NAMES = Object.keys(FILTER_MAP); //might be up top

function Home(props) {

  useEffect(() => {
    const data = localStorage.getItem('listOfTasks');
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('listOfTasks', JSON.stringify(tasks));
  });

  const [tasks, setTasks] = useState(DATA);
  const [filter, setFilter] = useState('All');

  function toggleTask(id, current) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        if (current === 0) {
          return {...task, status: 0}
        }
        else if (current === 1) {
          return {...task, status: 1}
        }
        else {
          return {...task, status: 2}
        }
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function clearTasks() {
    const zeroTasks = tasks.filter(task => 1 == 0);
    setTasks(zeroTasks);
  }

  const taskList = tasks
  .filter(task => FILTER_MAP[filter](task))
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      status={task.status}
      key={task.id}
      toggleTask={toggleTask}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, status: 0 };
    setTasks([...tasks, newTask]);
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <button type="button" className="btn btn__danger" style={{marginLeft: 200}} onClick={() => clearTasks()}>
        Delete All Tasks
      </button>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default Home;