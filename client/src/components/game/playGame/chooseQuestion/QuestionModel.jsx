export default function QuestionModel({ props }) {
  return (
    <div
      className={props.categoryValue ? "category-box" : "question-box"}
    >
      {props.categoryValue ? props.categoryValue.category : props.pointsQuestion}
    </div>
  );
}
