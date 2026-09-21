console.log("Expense Tracker loaded");

const itemInput = document.getElementById("itemInput");
const amountInput = document.getElementById("amountInput");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const totalDisplay = document.getElementById("total");
const message = document.getElementById("message");

let expenses = [];

addBtn.addEventListener("click", function () {
  const item = itemInput.value.trim();
  if (item === "") {
    message.textContent = "Please enter a description.";
    return;
  }

  const amount = Number(amountInput.value);
  if (amount <= 0) {
    message.textContent = "Please enter a valid amount.";
    return;
  }

  message.textContent = "";

  const expense = { item: item, amount: amount };

  expenses.push(expense);
  saveExpenses();                          // 💾 naya
  renderList();

  itemInput.value = "";
  amountInput.value = "";
});

function renderList() {
  expenseList.innerHTML = "";

  let total = 0;

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.textContent = `${expense.item} — ${expense.amount}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";

    deleteBtn.addEventListener("click", () => {
      expenses.splice(index, 1);
      saveExpenses();                      // 💾 naya
      renderList();
    });

    li.appendChild(deleteBtn);
    expenseList.appendChild(li);

    total = total + expense.amount;
  });

  totalDisplay.textContent = total;
}

function saveExpenses() {                  // 💾 naya
  localStorage.setItem("expenses", JSON.stringify(expenses));
}
const saved = localStorage.getItem("expenses");

if (saved !== null) {
  expenses = JSON.parse(saved);
}

renderList();