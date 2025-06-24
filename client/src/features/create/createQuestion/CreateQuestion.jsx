import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  deleteItems,
  goToNextPage,
  goToPreviousPage,
  selectCategoryName,
  selectCreateItemsAllValues,
  selectCurrentPage,
  setQuestionDetails,
} from "../createSlice";
import {
  correctAnswerValues,
  gamePoints,
  setNewFormValues,
  validateAllValues,
} from "./validateValues";
import useCreateQuestion from "./useCreateQuestion";
import {
  useRecordCategoryAndQuestionsMutation,
  useRecordSingleQuestionMutation,
} from "../createApiSlice";
import "../create.css";

export default function CreateQuestion({
  formInitialValues,
  setMoveToNextQuestion,
}) {
  const [formValues, setFormValues] = useState({
    category: { content: formInitialValues.categoryName, error: false },
    points: { content: formInitialValues.points, error: false },
    question: { content: formInitialValues.questionName, error: false },
    answerOne: { content: formInitialValues.answerOne, error: false },
    answerTwo: { content: formInitialValues.answerTwo, error: false },
    answerThree: { content: formInitialValues.answerThree, error: false },
    answerFour: { content: formInitialValues.answerFour, error: false },
    correctAnswer: { content: formInitialValues.correctAnswer, error: false },
  });
  const categoryName = useSelector(selectCategoryName);
  const currentPage = useSelector(selectCurrentPage);
  const createItemsAllValues = useSelector(selectCreateItemsAllValues);
  const dispatch = useDispatch();
  const allCategoriesNames = useCreateQuestion();
  const [recordSingleQuestion, { isLoading }] =
    useRecordSingleQuestionMutation();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const elementChanged = e.target.id;
    const newContent = e.target.value;
    const copyFormValues = Object.assign({}, formValues);

    const newValues = setNewFormValues(
      copyFormValues,
      elementChanged,
      newContent,
      allCategoriesNames,
      categoryName,
      currentPage
    );

    setFormValues(newValues);
  };

  const handlePreviousPage = () => {
    setMoveToNextQuestion(false);
    dispatch(goToPreviousPage());
  };

  const handleNextPageAndSubmit = async () => {
    const areFormValuesValid = validateAllValues(
      formValues,
      setFormValues,
      allCategoriesNames,
      categoryName,
      currentPage
    );

    if (!areFormValuesValid) {
      return;
    }

    const questionDetails = {
      categoryName: formValues.category.content,
      points: formValues.points.content,
      questionName: formValues.question.content,
      answerOne: formValues.answerOne.content,
      answerTwo: formValues.answerTwo.content,
      answerThree: formValues.answerThree.content,
      answerFour: formValues.answerFour.content,
      correctAnswer: formValues.correctAnswer.content,
    };

    if (currentPage == 0) {
      // add a DotSpinner to the save button
      // try if everything works
      setTimeout(async () => {
        try {
          await recordSingleQuestion(questionDetails);
          toast.success("Question saved successfully!");
        } catch (err) {
          toast.error("Question was not saved! Please try again.");
        }
        navigate("/create");
      }, 5000);
    } else if (currentPage > 0 && currentPage <= 4) {
      const questionNumber = Object.keys(createItemsAllValues)[currentPage];
      setMoveToNextQuestion(false);
      dispatch(setQuestionDetails({ questionNumber, questionDetails }));
      dispatch(goToNextPage());
    }
  };

  return (
    <div className="flex-column self-center bg-black pt-25 pb-10">
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8">
        <h2 className="text-center text-xl font-bold text-neutral-800 dark:text-neutral-200 uppercase">
          Create Question
        </h2>
        <form className="my-8">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="category">Category</Label>
            {currentPage > 0 ? (
              <Input
                id="category"
                type="text"
                className="uppercase"
                disabled
                value={formValues.category.content}
              />
            ) : (
              <Select
                name="category"
                id="category"
                className={formValues.category.error == true && "false"}
                optionsArray={allCategoriesNames}
                onChange={handleInput}
              />
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="points">Points</Label>
            {currentPage > 0 ? (
              <Input
                id="points"
                type="text"
                className="uppercase"
                disabled
                value={formValues.points.content}
              />
            ) : (
              <Select
                name="points"
                id="points"
                className={formValues.points.error == true && "false"}
                optionsArray={gamePoints}
                onChange={handleInput}
              />
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              type="text"
              className={formValues.question.error == true && "false"}
              value={formValues.question.content}
              onChange={handleInput}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="answerOne">Answer 1</Label>
            <Input
              id="answerOne"
              type="text"
              className={formValues.answerOne.error == true && "false"}
              value={formValues.answerOne.content}
              onChange={handleInput}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="answerTwo">Answer 2</Label>
            <Input
              id="answerTwo"
              type="text"
              className={formValues.answerTwo.error == true && "false"}
              value={formValues.answerTwo.content}
              onChange={handleInput}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="answerThree">Answer 3</Label>
            <Input
              id="answerThree"
              type="text"
              className={formValues.answerThree.error == true && "false"}
              value={formValues.answerThree.content}
              onChange={handleInput}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="answerFour">Answer 4</Label>
            <Input
              id="answerFour"
              type="text"
              className={formValues.answerFour.error == true && "false"}
              value={formValues.answerFour.content}
              onChange={handleInput}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="correctAnswer">Correct Answer</Label>
            <Select
              name="correctAnswer"
              id="correctAnswer"
              className={formValues.correctAnswer.error == true && "false"}
              optionsArray={correctAnswerValues}
              value={formValues.correctAnswer.content}
              onChange={handleInput}
            />
          </LabelInputContainer>
          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        </form>

        <div className={`mt-10 ${currentPage > 0 && "flex gap-10"}`}>
          {currentPage > 0 && (
            <button
              className="group/btn relative block h-10 w-full rounded-md cursor-pointer bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              onClick={handlePreviousPage}
            >
              Previous Page
              <BottomGradient />
            </button>
          )}

          <button
            className="group/btn relative block h-10 w-full rounded-md cursor-pointer bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            onClick={handleNextPageAndSubmit}
            disabled={isLoading ? true : false}
          >
            {currentPage == 0
              ? isLoading
                ? ""
                : "Save Question"
              : currentPage > 0 && currentPage <= 3
              ? "Next Page"
              : "Save Category and Questions"}
            <BottomGradient />
          </button>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
