import { createSlice } from "@reduxjs/toolkit";

export const defaultOption = "--- Choose Category ---";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: null,
    gameCategories: [
      defaultOption,
      defaultOption,
      defaultOption,
      defaultOption,
    ],
    categoryCount: 0,
  },
  reducers: {
    setCategories: (state, action) => {
      const allCategories = action.payload;
      state.categories = allCategories;
    },
    updateCategories: (state, action) => {
      const categoryName = action.payload;
      state.categories = state.categories.filter(
        (category) => category.name !== categoryName
      );
    },
    updateGameCategories: (state, action) => {
      const { categoryName, index } = action.payload;
      state.gameCategories.splice(index, 1, categoryName);
    },
    updateCategoryCount: (state, action) => {
      state.categoryCount = state.categoryCount + 1;
    },
    deleteCategories: (state, action) => {
      state.categories = null;
    },
  },
});

export const {
  setCategories,
  updateCategories,
  updateGameCategories,
  updateCategoryCount,
  deleteCategories,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;

export const selectCategories = (state) => state.categories.categories;
export const selectGameCategories = (state) => state.categories.gameCategories;
export const selectCategoryCount = (state) => state.categories.categoryCount;
