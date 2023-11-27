import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import AllTask from "./AllTask";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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

  const getTask = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/task/${task.id}`
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addValue = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/task`,
        task
      );
      toast.success("Task Added!");
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEditVale = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/task/edit/${id}`
      );
      SetHoldEdit(res.data);
      setTask({ ...task, task: res.data.task });
    } catch (error) {
      console.log(error);
    }
  };

  const updateValue = async () => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/task/${holdEdit._id}`,
        task
      );
      setData(res.data);
      toast.success("Task Updated!");
    } catch (error) {
      toast.error(error);
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
      setTask({ ...task, task: "" });
    } else {
      updateValue();
      setAdd(true);
      setTask({ ...task, task: "" });
    }
  };
  const handleLogOut = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };
  return (
    <div className="row justify-content-center py-4">
      <div className="col-sm-6 col-12">
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
              required
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
