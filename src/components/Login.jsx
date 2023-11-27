import axios from "axios";
import React, { startTransition, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      startTransition(async () => {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/login`,
            values,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          await toast.success("Successfully Login!");
          setTimeout(() => {
            formik.resetForm();
            if (res.data.token) {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("username", res.data.username);
              localStorage.setItem("id", res.data.id);
              navigate("/");
            } else {
              toast("Login failed");
            }
          }, 800);
        } catch (error) {
          toast.error(
            ` ${
              error.response?.data?.Error ||
              "An error occurred during login. Please try again"
            }. `
          );
        }
      });
    },
  });

  return (
    <div className="row login-row justify-content-center align-items-center">
      <div className="col-sm-5 login-wrapper p-3">
        <div className="wrapper">
          <h1 className="text-center">Log In </h1>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
            </Form.Group>
            <Button type="submit">Login</Button>
            <div className="d-flex my-2 gap-1 justify-content-center">
              <span>Didn't have an account ? </span>
              <Link className="nav-link text-success" to={"/signup"}>
                Sign up
              </Link>
            </div>
            <Toaster />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
