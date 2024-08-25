export default function CategoryModel({ props }) {
  const {
    categoryInfo,
    currCategoryCount,
    allCategories,
    chosenOption,
    selectQuestion,
    client,
    activePlayer,
    defaultOption,
  } = props;

  return (
    <div
      className={
        currCategoryCount > categoryInfo[0]
          ? "chosen-category category-model"
          : currCategoryCount == categoryInfo[0]
          ? "activeCat category-model"
          : "inactiveCat category-model"
      }
    >
      {currCategoryCount == categoryInfo[0] ? (
        <>
          <select
            name="categoryA"
            id="categoryA"
            disabled={client.user.name === activePlayer ? false : true}
            value={categoryInfo[1].category}
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
              client.user.name === activePlayer &&
              categoryInfo[1].category !== defaultOption
                ? false
                : true
            }
            onClick={selectQuestion}
          >
            Ready
          </button>
        </>
      ) : (
        <p>{categoryInfo[1].category}</p>
      )}
    </div>
  );
}
