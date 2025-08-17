import { useState, useEffect } from "react"
import { Header } from './components/Header'
import { Balance } from './components/Balance'
import { TransactionForm } from './components/TransactionForm'
import { TransactionList } from './components/TransactionList'
import ExpenseChart from './components/ExpenseChart'; 
import "./style.css"

function App() {
  const [transactions, setTransactions] = useState([]);
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [balance, setBalance] = useState(0);

  const incomeCategories = ["Salary", "Bonus", "Gift", "Investment", "Other"];
  const expenseCategories = ["Rent", "Food", "Utilities", "Entertainment", "Transportation", "Other"];

  const categoryOptions = type === "income" ? incomeCategories : expenseCategories;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));

    let total = 0;
    transactions.forEach(t => {
      const amt = parseFloat(t.amount);
      if (t.type === 'income') total += amt;
      else total -= amt;
    });
    setBalance(total);
  }, [transactions]);

  function handleAddTransaction(e) {
    e.preventDefault();
    const newTransaction = {
      id: crypto.randomUUID(),
      category,
      amount: parseFloat(amount),
      type,
    };
    setTransactions(prev => [newTransaction, ...prev]);
    setAmount('');
    setType('income');
  }

  function handleDeleteTransaction(id) {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }

  const chartData = transactions.reduce((acc, t) => {
    if (t.type === "expense") {
      const existing = acc.find(item => item.category === t.category);
      if (existing) {
        existing.amount += Number(t.amount);
      } else {
        acc.push({ category: t.category, amount: Number(t.amount) });
      }
    }
    return acc;
  }, []);

return (
  <div>
    <Header />

    <div className="box-wrapper">
      <div className="left-column">
        <div className="input-container">
          <Balance balance={balance} />
          <TransactionForm 
            type={type}
            setType={setType}
            category={category}
            setCategory={setCategory}
            amount={amount}
            setAmount={setAmount}
            handleAddTransaction={handleAddTransaction}
            categoryOptions={categoryOptions}
          />
        </div>

        <div className="chart-card">
          <ExpenseChart chartData={chartData}/>
        </div>
      </div>

      <div className="box">
        <TransactionList 
          transactions={transactions}
          handleDeleteTransaction={handleDeleteTransaction}
        />
      </div>
    </div>
  </div>
  );
}

export default App;
