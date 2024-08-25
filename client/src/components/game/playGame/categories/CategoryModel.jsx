export default function CategoryModel({ props }) {
  const {
    categoryInfo,
    currCategoryCount,
    allCategories,
    chosenOption,
    selectQuestion,
    client,
    activePlayer,
  } = props;

  return (
    <div
      className={
        currCategoryCount == categoryInfo[0] ? "activeCat" : "inactiveCat"
      }
    >
      {currCategoryCount == categoryInfo[0] ? (
        <>
          <select
            name="categoryA"
            id="categoryA"
            value={categoryInfo[1].category}
            onChange={chosenOption}
          >
            {allCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button disabled={client.user.name === activePlayer ? false : true} onClick={selectQuestion}>Ready</button>
        </>
      ) : (
        <p>{categoryInfo[1].category}</p>
      )}
    </div>
  );
}
