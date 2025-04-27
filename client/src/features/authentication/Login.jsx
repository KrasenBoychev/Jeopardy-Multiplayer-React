import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLoginMutation } from "./authApiSlice";

import "./authentication.css";
import { setCredentials } from "./authSlice";

// import { useLogin } from "../../hooks/useAuth";

export default function Login({ setIsUserAuthenticated }) {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  // const login = useLogin(setIsUserAuthenticated);

  return (
    <div className="authentication-container">
      <div className="authentication-wrapper">
        <div>{isLoading && <h1>Loading...</h1>}</div>
        <h1>Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email is required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            if (!values.password) {
              errors.password = "Password is required";
            }

            return errors;
          }}
          onSubmit={async (values) => {
            try {
              const userData = await login({
                email: values.email,
                password: values.password,
              }).unwrap();

              dispatch(setCredentials(userData));

              navigate("/");
            } catch (err) {
              // if (!err?.originalStatus) {
              //   // isLoading: true until timeout occurs
              //   toast.error("No Server Response");
              // } else if (err.originalStatus === 400) {
              //   toast.error("Missing Username or Password");
              // } else if (err.originalStatus === 401) {
              //   toast.error("Unauthorized");
              // } else if (err.originalStatus === 403) {
              //   toast.error("Incorrect email or password");
              // } else {
              //   toast.error("Login Failed");
              // }

              if (!err?.status) {
                // isLoading: true until timeout occurs
                toast.error("No Server Response");
              } else if (err.status === 400) {
                toast.error("Missing Username or Password");
              } else if (err.status === 401) {
                toast.error("Unauthorized");
              } else if (err.status === 403) {
                toast.error("Incorrect email or password");
              } else {
                toast.error("Login Failed");
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="authentication-form">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="authentication-input"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="authentication-error"
              />
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="authentication-input"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="authentication-error"
              />
              <button
                type="submit"
                className="authentication-form-button"
                disabled={isSubmitting}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <p>
          Do not have an account yet? Click here to{" "}
          <Link to="/register" className="authentication-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
