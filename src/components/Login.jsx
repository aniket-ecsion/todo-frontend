import axios from "axios";
import React, { startTransition, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const token = localStorage.getItem("token");
  const handleSubmit = (e) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/login",
          values,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert(res.data.message);
        setValues({
          username: "",
          email: "",
          password: "",
        });
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("id", res.data.id);

          navigate("/");
        } else {
          alert("Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login. Please try again.");
      }
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <h1>Log In </h1>
        <Form onSubmit={handleSubmit}>
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
          <Button type="submit">Login</Button>
          <Link className="nav-link" to={"/signup"}>
            Sign up
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
