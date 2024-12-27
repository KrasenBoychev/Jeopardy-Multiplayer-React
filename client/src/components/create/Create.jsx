import { useNavigate } from "react-router-dom";

import "./create.css";
import DotLoader from "react-spinners/DotLoader";

export default function Create() {
  const navigate = useNavigate();

  const createCategoryHandler = () => {
    navigate("/createCategory");
  };

  const createQuestionHandler = () => {
    navigate("/createQuestion");
  };

  return (
    <main>
      <div className="create-container">
        <section>
          <p onClick={createCategoryHandler}>Create Category and Questions for it</p>
        </section>
        <section>
          <p onClick={createQuestionHandler}>Create Question only</p>
        </section>
      </div>
    </main>
  );
}
