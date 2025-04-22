const addItemBtnDOM = document.getElementById("addItemBtn");
const transIncDOM = document.getElementById("transactionListIncome");
const transExpDOM = document.getElementById("transactionListExpense");
const balanceDOM = document.getElementById("balanceNumber");
const totalIncomeDOM = document.getElementById("totalIncome");
const totalExpenseDOM = document.getElementById("totalExpense");
const resetDOM = document.getElementById("reset");
const currencySelectorDOM = document.getElementById("currency");
const titleDOM = document.getElementById("title");
const amountDOM = document.getElementById("amount");
const deleteBtn = document.getElementById('deleteBtn');

let balance = Number(localStorage.getItem("balanceMain")) || 0;
let totalIncome = Number(localStorage.getItem("totalIncome")) || 0;
let totalExpense = Number(localStorage.getItem("totalExpense")) || 0;
let currency = localStorage.getItem("currency") || "usd";

window.addEventListener("load", () => {
  currencySelectorDOM.value = currency;
  updateDisplay();
});

resetDOM.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

addItemBtnDOM.addEventListener("click", () => {
  const typeSelector = document.getElementById("type").value;
  if (typeSelector === "income") {
    createIncomeTransaction();
  } else if (typeSelector === "expense") {
    createExpenseTransaction();
  } else {
    alert("Please choose if it's an Income or an Expense");
  }
});

function createIncomeTransaction() {
  const title = titleDOM.value.trim();
  const amount = Number(amountDOM.value);
  const type = document.getElementById("type").value;

  if (!title || isNaN(amount) || type !== "income") {
    alert("Please fill out all fields and select 'Income' type.");
    return;
  }

  const li = document.createElement("li");
  li.classList.add("transaction", "income");
  li.innerHTML = `💸 ${title} +$${amount.toFixed(
    2
  )} <button class="delete" id="deleteBtn">×</button>`;
  transIncDOM.appendChild(li);

  balance += amount;
  totalIncome += amount;

  clearInputs();
  updateDisplay();
  saveToLocalStorage();
}

deleteBtn.addEventListener('click', () => {
  deleteBtn.remove()
});

function createExpenseTransaction() {
  const title = titleDOM.value.trim();
  const amount = Number(amountDOM.value);
  const type = document.getElementById("type").value;

  if (!title || isNaN(amount) || type !== "expense") {
    alert("Please fill out all fields and select 'Expense' type.");
    return;
  }

  const li = document.createElement("li");
  li.classList.add("transaction", "expense");
  li.innerHTML = `🧾 ${title} -$${amount.toFixed(
    2
  )} <button class="delete" id="deleteBtn">×</button>`;
  transExpDOM.appendChild(li);

  balance -= amount;
  totalExpense += amount;

  clearInputs();
  updateDisplay();
  saveToLocalStorage();
}

function clearInputs() {
  titleDOM.value = "";
  amountDOM.value = "";
  document.getElementById("category").value = "";
  document.getElementById("type").value = "";
  titleDOM.blur();
  amountDOM.blur();
}

function updateDisplay() {
  const symbol = getCurrencySymbol(currency);
  balanceDOM.textContent = symbol + balance.toFixed(2);
  totalIncomeDOM.textContent = "+" + symbol + totalIncome.toFixed(2);
  totalExpenseDOM.textContent = "-" + symbol + totalExpense.toFixed(2);
}

function saveToLocalStorage() {
  localStorage.setItem("balanceMain", balance);
  localStorage.setItem("totalIncome", totalIncome);
  localStorage.setItem("totalExpense", totalExpense);
  localStorage.setItem("currency", currency);
}

currencySelectorDOM.addEventListener("change", () => {
  currency = currencySelectorDOM.value;
  updateDisplay();
  saveToLocalStorage();
});

function getCurrencySymbol(code) {
  const map = {
    usd: "$",
    eur: "€",
    gbp: "£",
    aed: "د.إ",
    afn: "؋",
    pkr: "₨",
  };
  return map[code] || "$";
}
