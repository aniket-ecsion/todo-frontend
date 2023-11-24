import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

const AllTask = ({ data, setData, getTask, getEditVale, setAdd }) => {
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/task/${id}`);
      alert(res);

      getTask();
      return;
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (id) => {
    getEditVale(id);
    setAdd(false);
  };

  
  const color = ["primary", "secondary", "warning"];
  useEffect(() => {
    getTask();
  }, []);
  let varIndex = 0;
  return (
    <div className="mt-5">
      <Card>
        <Card.Body>
          <ul className="navbar-nav">
            {data.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`d-flex justify-content-between p-2 my-2 text-white bg-${color[varIndex]}`}
                  style={{ borderRadius: "4px" }}
                >
                  <span>{item.task}</span>
                  <div>
                    <Button
                      variant="success"
                      onClick={() => handleEdit(item._id)}
                      className="mx-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </div>
                  <span className="d-none">
                    {" "}
                    {varIndex < 2 ? varIndex++ : (varIndex = 0)}
                  </span>
                </li>
              );
            })}
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AllTask;
