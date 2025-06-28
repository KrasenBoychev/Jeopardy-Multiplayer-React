import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { deleteItems, selectResponseMsg } from "./createSlice";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import "./create.css";

export default function Create() {
  const responseMsg = useSelector(selectResponseMsg);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (responseMsg.status) {
      if (responseMsg.status == "success") {
        toast.success(responseMsg.msg);
      } else if ((responseMsg.status = "error")) {
        toast.error(responseMsg.msg);
      }
    }

    dispatch(deleteItems());
  }, []);

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
