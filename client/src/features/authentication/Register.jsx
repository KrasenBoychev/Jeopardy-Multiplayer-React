import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-hot-toast";
import { setCredentials } from "./authSlice";
import { useRegisterMutation } from "./authApiSlice";
import "./authentication.css";

export default function Register() {
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="authentication-container">
      <div className="authentication-wrapper">
        <h1>Register</h1>
        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
            rePass: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email is required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            if (!values.username) {
              errors.username = "Username is required";
            } else if (values.username.length > 10) {
              errors.username = "Username should be maximum 10 symbols";
            }

            if (!values.password) {
              errors.password = "Password is required";
            } else if (values.password.length < 3) {
              errors.password = "Password must be at least 3 characters";
            } else if (values.password != values.rePass) {
              errors.rePass = "Passwords do not match";
            }

            return errors;
          }}
          onSubmit={async (values) => {
            try {
              const userData = await register({
                email: values.email,
                username: values.username,
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
                toast.error("Register Failed");
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
                type="text"
                name="username"
                placeholder="Username"
                className="authentication-input"
              />
              <ErrorMessage
                name="username"
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
              <Field
                type="password"
                name="rePass"
                placeholder="Repeat Password"
                className="authentication-input"
              />
              <ErrorMessage
                name="rePass"
                component="div"
                className="authentication-error"
              />
              <button
                type="submit"
                className="authentication-form-button"
                disabled={isSubmitting}
              >
                Register
              </button>
            </Form>
          )}
        </Formik>

        <p>
          Aready registered? Click here to{" "}
          <Link to="/login" className="authentication-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
