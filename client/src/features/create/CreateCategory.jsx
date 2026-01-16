import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  deleteItems,
  goToNextPage,
  selectCategoryName,
  setCategoryName,
} from "./createSlice";
import { useCheckIfCategoryExistsMutation } from "./createApiSlice";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export default function CreateCategory() {
  const [categoryNameValue, setCategoryNameValue] = useState("");
  const categoryName = useSelector(selectCategoryName);
  const [checkIfCategoryExists] = useCheckIfCategoryExistsMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const placeholders = ["What will be the new category called?"];

  const handleChange = (e) => {
    setCategoryNameValue(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    if (categoryNameValue.trim() == "") {
      return;
    }

    try {
      const response = await checkIfCategoryExists(categoryNameValue.trim());

      if (response.data) {
        toast.error(categoryNameValue + " already exists");
        return;
      }
    } catch (err) {
      toast.error("Something went wrong! Please refresh the page.");
      dispatch(deleteItems());
      navigate("/create");
    }

    dispatch(setCategoryName(categoryNameValue.trim()));
    dispatch(goToNextPage());
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 bg-[url(planet.png)] bg-cover bg-center">
      <div className="p-30 bg-[#00000099] rounded-md shadow-[0px_0px_10px_10px_var(--chart-5)] max-[1600px]:p-25 max-[1400px]:p-20">
        <h2 className="mb-20 text-5xl text-center text-chart-5 uppercase font-bold max-[1600px]:text-4xl max-[1600px]:mb-15 max-[1400px]:mb-10">
          Category Name
        </h2>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
          initialValue={categoryName}
        />
      </div>
    </div>
  );
}
