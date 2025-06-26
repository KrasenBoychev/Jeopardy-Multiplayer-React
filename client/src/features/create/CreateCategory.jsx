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
    <div className="flex flex-col justify-center  items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black uppercase">
        Category Name
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
        initialValue={categoryName}
      />
    </div>
  );
}
