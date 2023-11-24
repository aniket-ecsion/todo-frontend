import axios from "axios";
import React, { startTransition, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      startTransition(async () => {
        const res = await axios.post(
          "http://localhost:4000/api/register",
          values
        );
        alert(res.data.massgae);
        setValues({
          username: "",
          email: "",
          password: "",
        });
      });
    } catch (error) {
      console.error("Error:", error);
      // Handle errors
    }
  };
  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <h1>Sign up</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter username"
              name="username"
              value={values.username}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="enter email"
              name="email"
              value={values.email}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="enter password"
              name="password"
              value={values.password}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Button type="submit">Sign Up</Button>
          <Link className="nav-link" to={"/login"}>
            Log In
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
