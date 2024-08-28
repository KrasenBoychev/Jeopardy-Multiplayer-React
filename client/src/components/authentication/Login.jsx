import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-hot-toast";

import "./authentication.css";

import { useLogin } from "../../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const login = useLogin();

  return (
    <div className="authentication">
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
            await login(values.email, values.password);

            navigate("/");
          } catch (error) {
            return toast.error(error.message);
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
    </div>
  );
}
