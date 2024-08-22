import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from 'react-hot-toast';
import "./authentication.css";

import { useRegister } from '../../hooks/useAuth';

export default function Register() {
  const navigate = useNavigate();
  const register = useRegister();

  return (
    <div className="authentication">
      <div>
        <h1>Register</h1>
        <Formik
          initialValues={{ email: "", username: "", password: "", rePass: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            if (!values.username) {
              errors.username = "Username is required";
            }

            if (!values.password) {
              errors.password = "Password is required";
            } else if (values.password != values.rePass) {
              errors.rePass = "Passwords do not match";
            }

            return errors;
          }}
          onSubmit={async (values) => {
            try {
              await register(values.email, values.username, values.password);
              
              navigate('/');
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
              <button type="submit" disabled={isSubmitting}>
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
