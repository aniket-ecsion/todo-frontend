import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { Puff } from "react-loader-spinner";

const AllTask = ({ data, setData, getTask, getEditVale, setAdd }) => {
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/task/${id}`
      );
      toast.success("Task Deleted");
      getTask();
      return;
    } catch (error) {
      toast(error);
    }
  };
  const handleEdit = (id) => {
    getEditVale(id);
    setAdd(false);
  };

  const color = ["primary", "secondary", "warning","info"];
  useEffect(() => {
    getTask();
  }, []);

  useEffect(() => {
    console.log(data.length);
  }, [data]);

  let varIndex = 0;
  return (
    <div className="mt-5">
      <Card className="login-wrapper">
        <Card.Body>
          {data.length <= 0 ? (
            <div className="d-flex justify-content-center">
              <Puff
                height="80"
                width="80"
                radius={1}
                color="#4fa94d"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                className="text-center"
              />
            </div>
          ) : (
            <>
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
                        {varIndex < 3 ? varIndex++ : (varIndex = 0)}
                      </span>
                    </li>
                  );
                })}{" "}
              </ul>
            </>
          )}

          <Toaster />
        </Card.Body>
      </Card>
    </div>
  );
};

export default AllTask;
