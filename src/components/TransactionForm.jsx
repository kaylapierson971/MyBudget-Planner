export const TransactionForm = ({
  type,
  setType,
  category,
  setCategory,
  amount,
  setAmount,
  handleAddTransaction,
  categoryOptions 
}) => {
    return (
        <>
          <form className="transactionForm" onSubmit={handleAddTransaction}>
            <select 
              id="Type" 
              value = {type}
              onChange = {e => setType(e.target.value)}
              required>

              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <select
              id="category-select"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

            <input 
              value={amount} 
              onChange = {e => setAmount(e.target.value)}
              type="number" 
              id="amount" 
              placeholder="Amount" />

            <button id="button">Enter Transaction</button>
          </form>
        </>
    )
}
