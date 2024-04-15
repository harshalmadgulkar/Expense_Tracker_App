import { useState, useReducer, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import CategoryForm from "./components/CategoryForm/CategoryForm";
import { toast, ToastContainer } from "react-toastify";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebaseInit";
import { reducer } from "./App";

export function App() {
  const [state, dispatch] = useReducer(reducer, {
    expenses: [],
    categories: [],
  });
  const [expenseToUpdate, setExpenseToUpdate] = useState(null);

  useEffect(() => {
    getData();
    toast.success("Expenses retrived successfully.");
  }, []);

  // whenever db changes
  const getData = async () => {
    const unsub = onSnapshot(collection(db, "expenses"), (snapshot) => {
      const expenses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch({ type: "GET_EXPENSES", payload: { expenses } });

      const unsubCat = onSnapshot(collection(db, "categories"), (snapshot) => {
        const categories = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({ type: "GET_CATEGORIES", payload: { categories } });
      });
    });
  };

  const addExpense = async (expense) => {
    const expenseRef = collection(db, "expenses");
    const docRef = await addDoc(expenseRef, expense);
    // dispatch({
    //   type: "ADD_EXPENSE",
    //   payload: { expense: { id: docRef.id, ...expense } },
    // });
    toast.success("Expense added successfully.");
  };

  const deleteExpense = async (id) => {
    // dispatch({ type: "REMOVE_EXPENSE", payload: { id } });
    await deleteDoc(doc(db, "expenses", id));
    toast.success("Expense deleted successfully.");
  };

  const resetExpenseToUpdate = () => {
    setExpenseToUpdate(null);
  };

  const updateExpense = async (expense) => {
    const expensePos = state.expenses
      .map(function (exp) {
        return exp.id;
      })
      .indexOf(expense.id);

    if (expensePos === -1) {
      return false;
    }

    const expenseRef = doc(db, "expenses", expense.id);
    await updateDoc(expenseRef, expense);

    // dispatch({ type: "UPDATE_EXPENSE", payload: { expensePos, expense } });
    toast.success("Expense updated successfully.");
  };

  const addCategory = async (cateory) => {
    const expenseRef = collection(db, "categories");
    const docRef = await addDoc(expenseRef, cateory);
    toast.success("Category added successfully.");
  };

  // console.log(analytics);
  console.log(state);

  return (
    <>
      <a
        id="github-repo"
        href="https://github.com/harshalmadgulkar/Expense_Tracker_App"
        target="_blank"
        rel="noreferrer"
      >
        GithHub Repo
      </a>
      <ToastContainer />
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm
          addExpense={addExpense}
          expenseToUpdate={expenseToUpdate}
          updateExpense={updateExpense}
          resetExpenseToUpdate={resetExpenseToUpdate}
          categories={state.categories}
        />
        <div className="expenseContainer">
          <ExpenseInfo expenses={state.expenses} />
          <ExpenseList
            expenses={state.expenses}
            deleteExpense={deleteExpense}
            changeExpenseToUpdate={setExpenseToUpdate}
          />
        </div>
        <div className="creatCategory">
          <CategoryForm addCategory={addCategory} />
        </div>
      </div>
    </>
  );
}
