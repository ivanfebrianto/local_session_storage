const superadminsUsername = ["superadmin1", "superadmin2", "superadmin3"];

const loginUser = () => {
  //get value of the username in input tag
  const usernameInput = document.getElementById("username").value;

  if (superadminsUsername.includes(usernameInput)) {
    //save username to session storage
    sessionStorage.setItem("username", JSON.stringify(usernameInput));

    //run display main page function
    showMainPage(usernameInput);
  } else {
    alert("Invalid Username");
  }
};

const showMainPage = (usernameInput) => {
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("mainPage").style.display = "block";
  document.getElementById("displayUsername").textContent = usernameInput;
};

let transactionId = 0; // Initialize transaction ID counter

// Function to add a transaction
const addTransaction = () => {
  const amountInput = document.getElementById("amount").value;
  if (amountInput) {
    const transaction = {
      id: ++transactionId,
      amount: amountInput,
      status: "On going",
    };

    // Get existing transactions from localStorage or create an empty array
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push(transaction);

    // Store updated transactions array in localStorage
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Add the transaction to the table
    addTransactionToTable(transaction);

    // Clear the input field after adding
    document.getElementById("amount").value = "";
  } else {
    alert("Please enter an amount.");
  }
};

// Function to add a transaction row to the table
const addTransactionToTable = (transaction) => {
  const tableBody = document.getElementById("transactionList");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${transaction.id}</td>
    <td>${transaction.amount}</td>
    <td>${transaction.status}</td>
    <td>
      <button onclick="markAsDone(${transaction.id})" class="btn btn-success btn-sm">Done</button>
      <button onclick="deleteTransaction(${transaction.id})" class="btn btn-danger btn-sm">Delete</button>
    </td>
  `;
  tableBody.appendChild(row);
};

// Function to mark a transaction as done
const markAsDone = (id) => {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const transaction = transactions.find((t) => t.id === id);
  if (transaction) {
    transaction.status = "Completed";
    localStorage.setItem("transactions", JSON.stringify(transactions));
    loadTransactions(); // Refresh the table to reflect the updated status
  }
};

// Function to delete a transaction
const deleteTransaction = (id) => {
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions = transactions.filter((t) => t.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  loadTransactions(); // Refresh the table to remove the deleted transaction
};

// Function to load all transactions from localStorage into the table
const loadTransactions = () => {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const tableBody = document.getElementById("transactionList");
  tableBody.innerHTML = ""; // Clear existing rows
  transactions.forEach(addTransactionToTable); // Add each transaction to the table
};

// Load transactions when the page loads
window.onload = loadTransactions;
