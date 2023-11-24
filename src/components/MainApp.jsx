import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import AllTask from "./AllTask";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const MainApp = () => {
  const [task, setTask] = useState({
    id: localStorage.getItem("id"),
    task: "",
  });
  const navigate = useNavigate();
  const [holdEdit, SetHoldEdit] = useState({});
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(true);
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    setTask({ ...task, id: localStorage.getItem("id") });
  }, []);

  const handleUpdate = async (id) => {
    try {
    } catch (error) {}
  };
  const getTask = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/task/${task.id}`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addValue = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/task", task);
      alert(res);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEditVale = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/task/edit/${id}`);
      SetHoldEdit(res.data);
      setTask({ ...task, task: res.data.task });
    } catch (error) {
      console.log(error);
    }
  };

  const updateValue = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:4000/api/task/${holdEdit._id}`,
         task
      );
      setData(res.data);
      alert(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
    if (task.task.length < 2) {
      setAdd(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (add) {
      addValue();
      getTask();
      setTask({ task: "" });
    } else {
      updateValue();
      setAdd(true);
      setTask({ task: "" });
    }
  };
  const handleLogOut = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between">
            <h4>Welcome {username}</h4>
            <Button onClick={handleLogOut}>Log Out</Button>
          </div>
          <Form.Group className="mb-3" controlId="task">
            <Form.Label>Add Task</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Task"
              onChange={handleChange}
              name="task"
              value={task.task}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {add ? "Add" : "Update"}
          </Button>
        </Form>
        <div>
          <AllTask
            data={data}
            setData={setData}
            getTask={getTask}
            getEditVale={getEditVale}
            setAdd={setAdd}
          />
        </div>
      </div>
    </div>
  );
};

export default MainApp;
