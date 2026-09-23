const itemInput = document.getElementById("itemInput");
const amountInput = document.getElementById("amountInput");
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const totalDisplay = document.getElementById("total");
const message = document.getElementById("message");

let expenses = [];

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

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
  saveExpenses();
  renderList();

  itemInput.value = "";
  amountInput.value = "";
  itemInput.focus();
});

function renderList() {
  expenseList.innerHTML = "";

  let total = 0;

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.textContent = `${expense.item} — ${expense.amount}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.type = "button";

    deleteBtn.addEventListener("click", () => {
      expenses.splice(index, 1);
      saveExpenses();
      renderList();
    });

    li.appendChild(deleteBtn);
    expenseList.appendChild(li);

    total = total + expense.amount;
  });

  totalDisplay.textContent = total;
}

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

const saved = localStorage.getItem("expenses");

if (saved !== null) {
  expenses = JSON.parse(saved);
}

renderList();
