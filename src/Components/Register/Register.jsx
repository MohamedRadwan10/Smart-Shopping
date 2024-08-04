import React from "react";
import { Circles } from "react-loader-spinner";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";

let phoneRegex = /^(\+2){0,1}(01)[0125][0-9]{8}$/gm;

let validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "name minLength is 3")
    .max(16, "name maxLength is 16")
    .required("name is required"),
  email: yup.string().email().required("email is required"),
  phone: yup
    .string()
    .matches(phoneRegex, "phone is invalid")
    .required("phone is required"),
  password: yup
    .string()
    .matches(/^[A-Z][a-z0-9]{5,10}$/, "password start with uppercase")
    .required("password is required"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "password and repassword is not matches")
    .required("repassword is required"),
});

export default function Register() {
  const [errors, seterrors] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();

  async function registerSubmit(value) {
    setisLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, value)
      .catch((err) => {
        setisLoading(false);
        seterrors(err.response.data.message);
      });
    if (data.message === "success") {
      setisLoading(true);
      navigate("/login");
    }
  }
  let Formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });
  return (
    <>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register Page" />
      </Helmet>
      <div className="w-75 mx-auto py-5">
        <h2>Register</h2>

        <form onSubmit={Formik.handleSubmit}>
          {errors !== null ? (
            <div className="alert alert-danger">{errors}</div>
          ) : (
            ""
          )}

          <label htmlFor="name">Name: </label>
          <input
            type="text"
            className="form-control"
            value={Formik.values.name}
            onBlur={Formik.handleBlur}
            onChange={Formik.handleChange}
            id="name"
            name="name"
          />
          {Formik.errors.name && Formik.touched.name ? (
            <div className="alert alert-danger p-2 mt-2">
              {Formik.errors.name}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="phone">Phone: </label>
          <input
            type="tel"
            className="form-control"
            value={Formik.values.phone}
            onBlur={Formik.handleBlur}
            onChange={Formik.handleChange}
            id="phone"
            name="phone"
          />
          {Formik.errors.phone && Formik.touched.phone ? (
            <div className="alert alert-danger p-2 mt-2">
              {Formik.errors.phone}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="email">Email: </label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={Formik.values.email}
            onBlur={Formik.handleBlur}
            onChange={Formik.handleChange}
            id="email"
          />
          {Formik.errors.email && Formik.touched.email ? (
            <div className="alert alert-danger p-2 mt-2">
              {Formik.errors.email}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="password">Password: </label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={Formik.values.password}
            onBlur={Formik.handleBlur}
            onChange={Formik.handleChange}
            id="password"
          />
          {Formik.errors.password && Formik.touched.password ? (
            <div className="alert alert-danger p-2 mt-2">
              {Formik.errors.password}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="rePassword">RePassword: </label>
          <input
            name="rePassword"
            type="Password"
            className="form-control"
            value={Formik.values.rePassword}
            onBlur={Formik.handleBlur}
            onChange={Formik.handleChange}
            id="rePassword"
          />

          {Formik.errors.rePassword && Formik.touched.rePassword ? (
            <div className="alert alert-danger p-2 mt-2">
              {Formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          {isLoading ? (
            <button
              className="btn  my-3 bg-main"
              type="button"
            >
              <Circles
                height="20"
                width="20"
                color="#fff"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </button>
          ) : (
            <button
              disabled={!(Formik.isValid && Formik.dirty)}
              type="submit"
              className="btn text-white my-3 bg-main"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
}
