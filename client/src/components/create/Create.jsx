import { useNavigate } from "react-router-dom";

import "./create.css";

export default function Create() {
  const navigate = useNavigate();

  const createCategoryHandler = () => {
    navigate('/createCategory');
  };

  const createQuestionHandler = () => {
    navigate('/createQuestion');
  };

  return (
    <div className="create-section">
      <div onClick={createCategoryHandler}>
        <p>Create Category and Questions for it</p>
      </div>
      <div onClick={createQuestionHandler}>
        <p>Create Question only</p>
      </div>
    </div>
  );
}
