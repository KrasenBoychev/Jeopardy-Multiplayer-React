import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { createCategory } from "../../../api/create-api";

export default function CreateCategory() {
  const navigate = useNavigate();

  return (
    <div className="authentication">
      <h1>Category Name</h1>
      <Formik
        initialValues={{ name: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Name is required";
          }

          return errors;
        }}
        onSubmit={async (values) => {
          try {
            await createCategory(values);
            navigate("/createQuestion");
          } catch (error) {
            return toast.error(error.message);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="authentication-form">
            <Field type="text" name="name" className="authentication-input" />
            <ErrorMessage
              name="name"
              component="div"
              className="authentication-error"
            />
            <button className="authentication-form-button" type="submit" disabled={isSubmitting}>
              Next Page
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
