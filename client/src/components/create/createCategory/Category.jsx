import { Formik, Form, Field, ErrorMessage } from "formik";

export default function Category({ props }) {
  const { category, setCategory, setMoveToNextPage } = props;

  return (
    <div className="authentication">
      <h1>Category Name</h1>
      <Formik
        initialValues={{ name: category }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Name is required";
          }

          return errors;
        }}
        onSubmit={async (values) => {
          setCategory(values.name);
          setMoveToNextPage(oldValue => oldValue + 1);
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
            <button
              className="authentication-form-button"
              type="submit"
              disabled={isSubmitting}
            >
              Next Page
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
