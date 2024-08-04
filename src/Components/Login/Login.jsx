import React, { useContext } from "react";
import { Circles } from "react-loader-spinner";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserTokenContext } from "../../Context/UserTokenContext";
import { Helmet } from "react-helmet";

let validationSchema = yup.object({
  email: yup.string().email().required("email is required"),

  password: yup
    .string()
    .matches(/^[A-Z][a-z0-9]{5,10}$/, "password start with uppercase")
    .required("password is required"),
});

export default function Register() {
  let { setUserToken, setUserData } = useContext(UserTokenContext);
  const [errors, seterrors] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();

  async function loginSubmit(value) {
    setisLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, value)
      .catch((err) => {
        setisLoading(false);
        seterrors(err.response.data.message);
      });
    if (data.message === "success") {
      setisLoading(true);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      localStorage.setItem("userData",JSON.stringify(data.user));
      setUserData( data.user);
      navigate("/");
    }
  }
  let Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login Page" />
      </Helmet>
      <div className="w-75 mx-auto py-5">
        <h2>Login</h2>

        <form onSubmit={Formik.handleSubmit}>
          {errors !== null ? (
            <div className="alert alert-danger p-2 mt-2">{errors}</div>
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

          {isLoading ? (
            <button className="btn  my-3 bg-main" type="button">
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
            <div className="d-flex align-items-center">
              <button
                disabled={!(Formik.isValid && Formik.dirty)}
                type="submit"
                className="btn text-white my-3 bg-main"
              >
                Login
              </button>
              <Link to="/register" className="btn">
                Register Now
              </Link>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
