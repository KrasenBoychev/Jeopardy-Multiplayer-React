import { useNavigate } from "react-router-dom";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import "./create.css";

export default function Create() {
  const navigate = useNavigate();

  const createCategoryHandler = () => {
    navigate("/createCatAndQ");
  };

  const createQuestionHandler = () => {
    navigate("/createQuestion");
  };

  return (
    <BackgroundBeamsWithCollision>
      <div className="create-container">
        <section>
          <p onClick={createCategoryHandler}>
            Create Category and Questions for it
          </p>
        </section>
        <section>
          <p onClick={createQuestionHandler}>Create Question only</p>
        </section>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
