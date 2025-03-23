import { useGameContext } from "../../../../contexts/GameContext";

export default function QuestionModel({ props }) {
  const { activePlayer, categoryName, question, questionAnswered } = props;

  const { channel, client } = useGameContext();

  const showQuestionClickHandler = async () => {
    if (questionAnswered) {
      return;
    }

    await channel.sendEvent({
      type: "choose-question",
      data: {
        activePlayer,
        categoryName,
        question,
      },
    });
  };

  return (
    <div
      className={
        !props.question
          ? "category-box"
          : questionAnswered
          ? "question-box question-answered"
          : client.user.name === activePlayer
          ? "question-box active-box"
          : "question-box inactive-box"
      }
      onClick={showQuestionClickHandler}
    >
      {props.question ? question.points : props.categoryName}
    </div>
  );
}
