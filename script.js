function signup() {
    let user = document.getElementById("newUser").value;
    let pass = document.getElementById("newPass").value;

    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);

    alert("Signup successful!");
}

function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let role = document.getElementById("role").value;

    if (role == "admin" && user == "admin" && pass == "1234") {
        window.location.href = "admin.html";
    }
    else if (
        role == "user" &&
        user == localStorage.getItem("user") &&
        pass == localStorage.getItem("pass")
    ) {
        window.location.href = "user.html";
    }
    else {
        alert("Invalid login!");
    }
}

function saveBudget() {
    let budget = document.getElementById("budget").value;

    localStorage.setItem("budget", budget);

    alert("Budget saved!");
    updateBalance();
}

function addExpense() {
    let name = document.getElementById("expense").value;
    let amount = Number(document.getElementById("amount").value);

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    expenses.push({
        name: name,
        amount: amount
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
    updateBalance();
}

function displayExpenses() {
    let list = document.getElementById("list");

    if (!list) return;

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    list.innerHTML = "";

    expenses.forEach(function(expense) {
        list.innerHTML +=
            expense.name + " - ₹" + expense.amount + "<br>";
    });
}

function updateBalance() {
    let balance = document.getElementById("balance");

    if (!balance) return;

    let budget = Number(localStorage.getItem("budget")) || 0;
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let total = 0;

    expenses.forEach(function(expense) {
        total += expense.amount;
    });

    balance.innerHTML =
        "Remaining Budget: ₹" + (budget - total);
}

function viewUser() {
    let user = localStorage.getItem("user");

    document.getElementById("user").innerHTML =
        "Registered User: " + user;
}

function logout() {
    window.location.href = "index.html";
}

displayExpenses();
updateBalance();