import { useDispatch, useSelector } from "react-redux";
import {
  goToNextPage,
  selectCategoryName,
  setCategoryName,
} from "./createSlice";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useState } from "react";

export default function CreateCategory() {
  const [categoryNameValue, setCategoryNameValue] = useState("");
  const categoryName = useSelector(selectCategoryName);
  const dispatch = useDispatch();

  const placeholders = ["What will be the new category called?"];

  const handleChange = (e) => {
    setCategoryNameValue(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (categoryNameValue.trim() == "") {
      return;
    }

    // Check if this category exists - if yes show error msg

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
