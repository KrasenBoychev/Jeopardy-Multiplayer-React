import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: { categories: null },
  reducers: {
    setCategories: (state, action) => {
      const newCategories = action.payload;
      state.categories = newCategories;
    },
    updateCategories: (state, action) => {
      const categoryName = action.payload;
      state.categories = state.categories.map((category) => {
        if (category.name == categoryName) {
          category.selected = true;
        }

        return category;
      });
    },
    deleteCategories: (state, action) => {
      state.categories = null;
    },
  },
});

export const { setCategories, deleteCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;

export const selectCategories = (state) => state.categories.categories;
