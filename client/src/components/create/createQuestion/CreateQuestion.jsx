import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { createQuestion } from "../../../../api/create-api";

import useCreateQuestion from "../../../hooks/useCreateQuestion";

import { points } from "../../../common/gamePoints";
import { checkTrueAnswer, validateValues } from "./validationForm";

export default function CreateQuestion({ props }) {
  const {
    category,
    question,
    setQuestion,
    move,
    setMove,
    setRecordCategoryAndQuestions,
  } = props;

  const [answersCorrectValues, setAnswersCorrectValues, allCategories] =
    useCreateQuestion(category, question);

  const navigate = useNavigate();

  const changeCorrectAnswer = (e) => {
    const clickedAnswer = Number(e.target.id.split("-")[1]);

    const copyValues = answersCorrectValues.map((value, index) => {
      if (clickedAnswer == index) {
        return (answersCorrectValues[index] = "true");
      } else {
        return (answersCorrectValues[index] = "false");
      }
    });

    setAnswersCorrectValues(copyValues);
  };

  return (
    <div className="authentication create-question-div">
      <h1>Category Question</h1>
      <Formik
        initialValues={
          category
            ? {
                name: question.name,
                answerOne: question.answers.answerOne,
                answerTwo: question.answers.answerTwo,
                answerThree: question.answers.answerThree,
                answerFour: question.answers.answerFour,
              }
            : {
                category: "--- Choose Category ---",
                points: "--- Choose Points ---",
                name: "",
                answerOne: "",
                answerTwo: "",
                answerThree: "",
                answerFour: "",
              }
        }
        validate={(values) => {
          const errors = {};

          validateValues(values, errors, category, allCategories);

          return errors;
        }}
        onSubmit={async (values) => {
          const correctAnswerValue = checkTrueAnswer(
            answersCorrectValues,
            values
          );
          if (!correctAnswerValue) {
            return;
          }

          if (category) {
            setQuestion({
              name: values.name,
              points: values.points,
              answers: {
                answerOne: values.answerOne,
                answerTwo: values.answerTwo,
                answerThree: values.answerThree,
                answerFour: values.answerFour,
              },
              correctAnswer: correctAnswerValue
            });

            if (setMove) {
              setMove((oldValue) => oldValue + 1);

              const index = points.indexOf(values.points);
              points.splice(index, 1);
            }

            if (setRecordCategoryAndQuestions) {
              setRecordCategoryAndQuestions(true);
            }
          } else {
            const selectedCategory = allCategories.filter(
              (c) => c.name == values.category
            );

            try {
              await createQuestion(
                {
                  name: values.name,
                  points: values.points,
                  answers: {
                    answerOne: values.answerOne,
                    answerTwo: values.answerTwo,
                    answerThree: values.answerThree,
                    answerFour: values.answerFour
                  },
                  correctAnswer: correctAnswerValue
                },
                selectedCategory[0]._id
              );

              navigate("/");
            } catch (error) {
              return toast.error(error.message);
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="authentication-form">
            {move ? (
              <div className="authentication-input category-span">
                {category}
              </div>
            ) : (
              <>
                <Field
                  as="select"
                  name="category"
                  className="authentication-input category-select"
                >
                  <option value="chooseCategory">
                    --- Choose Category ---
                  </option>
                  {allCategories.map((eachCategory) => {
                    return (
                      <option key={eachCategory.name} value={eachCategory.name}>
                        {eachCategory.name}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="authentication-error"
                />
              </>
            )}

            <Field
              as="select"
              name="points"
              className="authentication-input category-select"
            >
              {question && question.points ? (
                <option value={question.points}>{question.points}</option>
              ) : (
                <option value="choosePoints">--- Choose Points ---</option>
              )}
              {points.map((point) => {
                return (
                  <option key={point} value={point}>
                    {point}
                  </option>
                );
              })}
            </Field>
            <ErrorMessage
              name="points"
              component="div"
              className="authentication-error"
            />

            <Field
              as="textarea"
              name="name"
              placeholder="Name"
              className="authentication-input textarea-question"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="authentication-error"
            />
            <p className="create-questions-paragraph">
              Choose the correct answer by clicking the button next to it
            </p>

            <div className="create-question-wrapper">
              <Field
                type="text"
                name="answerOne"
                placeholder="Answer One"
                className="create-question-input"
              />
              <button
                type="button"
                id="correct-0"
                className={
                  answersCorrectValues[0] == "true"
                    ? "create-question-button true"
                    : "create-question-button false"
                }
                onClick={changeCorrectAnswer}
              >
                {answersCorrectValues[0]}
              </button>
            </div>
            <ErrorMessage
              name="answerOne"
              component="div"
              className="authentication-error"
            />

            <div className="create-question-wrapper">
              <Field
                type="text"
                name="answerTwo"
                placeholder="Answer Two"
                className="create-question-input"
              />
              <button
                type="button"
                id="correct-1"
                className={
                  answersCorrectValues[1] == "true"
                    ? "create-question-button true"
                    : "create-question-button false"
                }
                onClick={changeCorrectAnswer}
              >
                {answersCorrectValues[1]}
              </button>
            </div>
            <ErrorMessage
              name="answerTwo"
              component="div"
              className="authentication-error"
            />

            <div className="create-question-wrapper">
              <Field
                type="text"
                name="answerThree"
                placeholder="Answer Three"
                className="create-question-input"
              />
              <button
                type="button"
                id="correct-2"
                className={
                  answersCorrectValues[2] == "true"
                    ? "create-question-button true"
                    : "create-question-button false"
                }
                onClick={changeCorrectAnswer}
              >
                {answersCorrectValues[2]}
              </button>
            </div>
            <ErrorMessage
              name="answerThree"
              component="div"
              className="authentication-error"
            />

            <div className="create-question-wrapper">
              <Field
                type="text"
                name="answerFour"
                placeholder="Answer Four"
                className="create-question-input"
              />
              <button
                type="button"
                id="correct-3"
                className={
                  answersCorrectValues[3] == "true"
                    ? "create-question-button true"
                    : "create-question-button false"
                }
                onClick={changeCorrectAnswer}
              >
                {answersCorrectValues[3]}
              </button>
            </div>
            <ErrorMessage
              name="answerFour"
              component="div"
              className="authentication-error"
            />

            <button
              type="submit"
              className="authentication-form-button"
              disabled={isSubmitting}
            >
              {move
                ? move == 4
                  ? "Record Category and Questions"
                  : "Next Question"
                : "Record Question"}
            </button>
          </Form>
        )}
      </Formik>
      {/* {move && <button onClick={() => setMove(oldValue => oldValue - 1)}>Back</button>} */}
    </div>
  );
}
