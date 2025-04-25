import { useAuthContext } from "../../../../contexts/AuthContext";

export default function CategoryModel({ props }) {
  const {
    categoryName,
    categoryIndex,
    currCategoryCount,
    allCategories,
    chosenOption,
    selectQuestion,
    activePlayer,
    defaultOption,
  } = props;

  const { username } = useAuthContext();

  return (
    <div
      className={
        currCategoryCount > categoryIndex
          ? "chosen_category category_model"
          : currCategoryCount == categoryIndex
          ? "category_model"
          : "inactiveCat category_model"
      }
    >
      {currCategoryCount == categoryIndex ? (
        <>
          <select
            name="category"
            id="category"
            disabled={username === activePlayer ? false : true}
            value={categoryName}
            onChange={chosenOption}
          >
            {allCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            disabled={
              username === activePlayer && categoryName !== defaultOption
                ? false
                : true
            }
            onClick={selectQuestion}
          >
            Ready
          </button>
        </>
      ) : (
        <p>{categoryName}</p>
      )}
    </div>
  );
}
