import { useAuthContext } from "../../../../contexts/AuthContext";

export default function QuestionsHeader({ activePlayer }) {
  const { username } = useAuthContext();

  return (
    <p
      className={
        username === activePlayer
          ? "active_player player_categories"
          : "player_categories"
      }
    >
      {activePlayer} chooses question
    </p>
  );
}
