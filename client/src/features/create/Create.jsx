import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { deleteItems, selectResponseMsg } from "./createSlice";

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
    <div className="flex-1 flex items-center bg-[url(planet.png)] bg-cover bg-center">
      <section className="flex-1 flex justify-center">
        <p
          className="w-[500px] h-[200px] flex items-center justify-center p-10 text-[30px] text-center text-white font-bold uppercase bg-[#00000099] rounded-md shadow-[inset_0_0_10px_10px_var(--chart-4)] cursor-pointer hover:shadow-white max-[1400px]:text-[25px] max-[1400px]:w-[400px]"
          onClick={createCategoryHandler}
        >
          Create Category and Questions for it
        </p>
      </section>
      <section className="flex-1 flex justify-center">
        <p
          className="w-[500px] h-[200px] flex items-center justify-center p-10 text-[30px] text-center text-white font-bold uppercase bg-[#00000099] rounded-md shadow-[inset_0_0_10px_10px_var(--active-player)] cursor-pointer hover:shadow-white max-[1400px]:text-[25px] max-[1400px]:w-[400px]"
          onClick={createQuestionHandler}
        >
          Create Question only
        </p>
      </section>
    </div>
  );
}
