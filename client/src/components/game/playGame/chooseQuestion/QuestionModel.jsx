import { useChannelStateContext, useChatContext } from "stream-chat-react";

export default function QuestionModel({ props }) {
  const {
    activePlayer,
    categoryName,
    question,
  } = props;

  const { client } = useChatContext();
  const { channel } = useChannelStateContext();

  const showQuestionClickHandler = async () => {
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
          : client.user.name === activePlayer
          ? "question-box active-box"
          : "question-box"
      }
      onClick={showQuestionClickHandler}
    >
      {props.question ? question.points : props.categoryName}
    </div>
  );
}
