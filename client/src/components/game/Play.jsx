import { useAuthContext } from "../../contexts/AuthContext";
import usePlay from "../../hooks/usePlay";
import JoinGame from "./startGame/joinGame/JoinGame";

export default function Play(props) {
  const { username } = useAuthContext();

  const client = usePlay(username);

  return (
    <>
      <JoinGame game={props.game} client={client} />
    </>
  );
}
