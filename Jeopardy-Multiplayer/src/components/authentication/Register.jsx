import { Formik, Form, Field, ErrorMessage } from "formik";

import "./authentication.css";

export default function Register() {
  return (
    <div className="authentication">
      <div>
        <h1>Register</h1>
        <Formik
          initialValues={{ email: "", password: "", rePass: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            if (!values.password) {
              errors.password = "Password is required";
            } else if (values.password != values.rePass) {
              errors.rePass = "Passwords do not match";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
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
