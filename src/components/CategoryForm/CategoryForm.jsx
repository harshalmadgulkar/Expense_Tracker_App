import { useRef } from "react";

const CategoryForm = ({ addCategory }) => {
  const categoryTextInput = useRef();
  const categoryTypeSelect = useRef();

  const onSubmitHandler = (e) => {
    // console.log("category submitted");
    e.preventDefault();
    const categoryText = categoryTextInput.current.value;
    const categoryType = categoryTypeSelect.current.value;

    const category = {
      text: categoryText,
      type: categoryType,
    };

    addCategory(category);
    clearInput();
  };

  const clearInput = () => {
    categoryTextInput.current.value = "";
    categoryTypeSelect.current.value = "";
  };

  return (
    <>
      <h3>Create New Category</h3>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          ref={categoryTextInput}
          placeholder="Add Category Name"
        />
        <br />
        <select ref={categoryTypeSelect} defaultValue={"Add Category Name"}>
          <option value="Add Category Name">Add Category Type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <br />
        <button
        // className={styles.submitBtn}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
