import { useEffect, useRef } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = ({
  addExpense,
  expenseToUpdate,
  updateExpense,
  resetExpenseToUpdate,
  categories,
}) => {
  console.log(categories);
  const expenseTextInput = useRef();
  const expenseAmountInput = useRef();
  const expenseCategorySelect = useRef();

  useEffect(() => {
    if (!expenseToUpdate) return;
    expenseTextInput.current.value = expenseToUpdate.text;
    expenseAmountInput.current.value = expenseToUpdate.amount;
    // expenseCategorySelect.current.value = expenseToUpdate.amount;
  }, [expenseToUpdate]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const expenseText = expenseTextInput.current.value;
    const expenseAmount = expenseAmountInput.current.value;
    const expenseCategory = expenseCategorySelect.current.value;

    if (parseInt(expenseAmount) === 0) {
      return;
    }
    if (!expenseToUpdate) {
      const expense = {
        text: expenseText,
        amount: expenseAmount,
        category: expenseCategory,
        data: new Date(),
      };
      addExpense(expense);
      clearInput();
      return;
    }

    const expense = {
      text: expenseText,
      amount: expenseAmount,
      id: expenseToUpdate.id,
    };

    const result = updateExpense(expense);
    if (!result) return;
    clearInput();
    resetExpenseToUpdate();
  };

  const clearInput = () => {
    expenseAmountInput.current.value = "";
    expenseTextInput.current.value = "";
    expenseCategorySelect.current.value =
      expenseCategorySelect.current.defaultValue;
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h3>{expenseToUpdate ? "Edit " : "Add new "}transaction</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        ref={expenseTextInput}
        required
      />
      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense,positive-income)</div>
      </div>
      <input
        className={styles.input}
        id="expenseAmount"
        type="number"
        placeholder="Enter amount..."
        ref={expenseAmountInput}
        required
      />
      <select
        className={styles.select}
        defaultValue="Add Category Name"
        ref={expenseCategorySelect}
      >
        <option value="Add Category Name" disabled>
          Add Category Name
        </option>
        {categories.map((category, i) => {
          return (
            <option key={i} value={category.text}>
              {category.text}
            </option>
          );
        })}
      </select>
      <button className={styles.submitBtn}>
        {expenseToUpdate ? "Edit " : "Add "} Transaction
      </button>
    </form>
  );
};

export default ExpenseForm;
