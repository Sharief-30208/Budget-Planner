/* =========================
   CHANGE LOGIN ROLE
========================= */

function changeRole() {

    let role = document.getElementById("role").value;

    let userLogin = document.getElementById("userLogin");
    let adminLogin = document.getElementById("adminLogin");

    if (role == "admin") {

        userLogin.style.display = "none";
        adminLogin.style.display = "block";

    } else {

        userLogin.style.display = "block";
        adminLogin.style.display = "none";

    }
}


/* =========================
   USER SIGNUP
========================= */

function signup() {

    let username =
        document.getElementById("newUser").value.trim();

    let email =
        document.getElementById("newEmail").value.trim();

    let phone =
        document.getElementById("newPhone").value.trim();

    let password =
        document.getElementById("newPass").value;


    if (!username || !email || !phone || !password) {

        alert("Please fill all fields!");
        return;

    }


    if (phone.length != 10 || isNaN(phone)) {

        alert("Enter a valid 10-digit phone number!");
        return;

    }


    let users =
        JSON.parse(localStorage.getItem("users")) || [];


    /* CHECK DUPLICATE EMAIL */

    let exists = users.some(function(user) {

        return user.email == email;

    });


    if (exists) {

        alert("Email already registered!");
        return;

    }


    /* CREATE USER */

    users.push({

        username: username,
        email: email,
        phone: phone,
        password: password

    });


    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    alert("Signup successful!");

    document.getElementById("newUser").value = "";
    document.getElementById("newEmail").value = "";
    document.getElementById("newPhone").value = "";
    document.getElementById("newPass").value = "";
}


/* =========================
   LOGIN
========================= */

function login() {

    let role =
        document.getElementById("role").value;


    /* ADMIN LOGIN */

    if (role == "admin") {

        let username =
            document.getElementById("adminUsername").value;

        let password =
            document.getElementById("adminPassword").value;


        if (username == "admin" && password == "1234") {

            localStorage.setItem(
                "currentRole",
                "admin"
            );

            window.location.href = "admin.html";

        } else {

            alert("Invalid admin login!");

        }

        return;
    }


    /* USER LOGIN */

    let email =
        document.getElementById("email").value.trim();

    let phone =
        document.getElementById("phone").value.trim();

    let password =
        document.getElementById("password").value;


    let users =
        JSON.parse(localStorage.getItem("users")) || [];


    let user = users.find(function(user) {

        return user.email == email &&
               user.phone == phone &&
               user.password == password;

    });


    if (user) {

        localStorage.setItem(
            "currentUser",
            user.username
        );

        localStorage.setItem(
            "currentRole",
            "user"
        );

        window.location.href = "user.html";

    } else {

        alert("Invalid user login!");

    }
}


/* =========================
   SAVE BUDGET
========================= */

function saveBudget() {

    let budget =
        Number(document.getElementById("budget").value);

    let user =
        localStorage.getItem("currentUser");


    if (!user) {

        alert("Please login first!");
        return;

    }


    if (budget <= 0) {

        alert("Enter a valid budget!");
        return;

    }


    localStorage.setItem(
        "budget_" + user,
        budget
    );


    alert("Budget saved!");

    updateDashboard();
}


/* =========================
   ADD EXPENSE
========================= */

function addExpense() {

    let name =
        document.getElementById("expense").value.trim();

    let amount =
        Number(document.getElementById("amount").value);

    let user =
        localStorage.getItem("currentUser");


    if (!name || amount <= 0) {

        alert("Enter valid expense details!");
        return;

    }


    if (!user) {

        alert("Please login first!");
        return;

    }


    let key = "expenses_" + user;


    let expenses =
        JSON.parse(localStorage.getItem(key)) || [];


    expenses.push({

        name: name,
        amount: amount

    });


    localStorage.setItem(
        key,
        JSON.stringify(expenses)
    );


    document.getElementById("expense").value = "";
    document.getElementById("amount").value = "";


    displayExpenses();
    updateDashboard();
}


/* =========================
   DISPLAY EXPENSES
========================= */

function displayExpenses() {

    let list =
        document.getElementById("list");


    if (!list) {
        return;
    }


    let user =
        localStorage.getItem("currentUser");


    let expenses =
        JSON.parse(
            localStorage.getItem(
                "expenses_" + user
            )
        ) || [];


    if (expenses.length == 0) {

        list.innerHTML =
            "No expenses added.";

        return;

    }


    list.innerHTML = "";


    expenses.forEach(function(expense) {

        list.innerHTML +=
            "💸 " +
            expense.name +
            " - ₹" +
            expense.amount +
            "<br>";

    });
}


/* =========================
   UPDATE DASHBOARD
========================= */

function updateDashboard() {

    let user =
        localStorage.getItem("currentUser");


    if (!user) {
        return;
    }


    let budget =
        Number(
            localStorage.getItem(
                "budget_" + user
            )
        ) || 0;


    let expenses =
        JSON.parse(
            localStorage.getItem(
                "expenses_" + user
            )
        ) || [];


    let total = 0;


    expenses.forEach(function(expense) {

        total += Number(expense.amount);

    });


    let remaining =
        budget - total;


    let showBudget =
        document.getElementById("showBudget");

    let showExpense =
        document.getElementById("showExpense");

    let showBalance =
        document.getElementById("showBalance");


    if (showBudget) {

        showBudget.innerHTML =
            "₹" + budget;

    }


    if (showExpense) {

        showExpense.innerHTML =
            "₹" + total;

    }


    if (showBalance) {

        showBalance.innerHTML =
            "₹" + remaining;

    }
}


/* =========================
   SHOW USERNAME
========================= */

function showUsername() {

    let username =
        document.getElementById("username");


    if (username) {

        username.innerHTML =
            localStorage.getItem("currentUser") || "User";

    }
}


/* =========================
   ADMIN VIEW USERS
========================= */

function viewUsers() {

    let list =
        document.getElementById("userList");


    if (!list) {
        return;
    }


    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    if (users.length == 0) {

        list.innerHTML =
            "No registered users.";

        return;

    }


    list.innerHTML = "";


    users.forEach(function(user, index) {

        list.innerHTML +=

            "<p>" +
            (index + 1) +
            ". " +
            user.username +
            " | " +
            user.email +
            " | " +
            user.phone +
            "</p>";

    });
}


/* =========================
   LOGOUT
========================= */

function logout() {

    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentRole");

    window.location.href =
        "index.html";
}


/* =========================
   PAGE LOAD
========================= */

displayExpenses();
updateDashboard();
showUsername();