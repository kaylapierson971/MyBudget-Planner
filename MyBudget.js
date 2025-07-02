let balance = 0;

const balanceDisplay = document.getElementById('balance');
const button = document.getElementById('button');
var table = document.getElementById("transactionTable");

const descriptionEl = document.getElementById('description');
const amountEl = document.getElementById('amount');
const typeSelect = document.getElementById('Type');
var tbody = table.querySelector('tbody');

button.addEventListener('click', addTransaction);

function renderTransaction(transaction){
    if (!transaction || typeof transaction.amount !== 'number' || isNaN(transaction.amount)) {
        console.warn("Invalid transaction", transaction);
        return;
    }

    const newRow = document.createElement("tr");
    if (transaction.type === 'income') {
        balance += transaction.amount;
        newRow.classList.add('income-row');
    } else if (transaction.type === 'expense') {
        balance -= transaction.amount;
        newRow.classList.add('expense-row');
    }

    balanceDisplay.textContent = `Balance: $${balance.toFixed(2)}`;

    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    const cell3 = document.createElement("td");

    cell1.innerHTML = transaction.description;
    cell2.textContent = (transaction.type === 'expense' ? '-' : '') + `$${transaction.amount.toFixed(2)}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
        removeTransaction(transaction);
        newRow.remove();
    });

    cell3.appendChild(deleteBtn);

    newRow.appendChild(cell1);
    newRow.appendChild(cell2);
    newRow.appendChild(cell3);

    tbody.insertBefore(newRow, tbody.firstChild);
};

function addTransaction(){
    event.preventDefault();
    const description = descriptionEl.value
    const amount = parseFloat(amountEl.value);
    const type = typeSelect.value;

    const transaction = {
        description: description,
        amount: amount,
        type: type
    };

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    renderTransaction(transaction);
}


function removeTransaction(transaction) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    if (transaction.type === 'income') {
        balance -= transaction.amount;
    } else if (transaction.type === 'expense') {
        balance += transaction.amount;
    }

    transactions = transactions.filter(function(transaction) {
        return !(transaction.description === transaction.description &&
                 transaction.amount === transaction.amount &&
                 transaction.category === transaction.category);
    });
    
    localStorage.setItem('transactions', JSON.stringify(transactions));
    balanceDisplay.textContent = `Balance: $${balance.toFixed(2)}`;
}


function loadTransactions() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    transactions.forEach(function(transaction) {
        transaction.amount = parseFloat(transaction.amount);
        renderTransaction(transaction);
    });
}

window.addEventListener('load', loadTransactions);
