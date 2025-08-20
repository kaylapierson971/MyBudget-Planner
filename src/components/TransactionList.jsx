export const TransactionList = ({
    transactions,
    handleDeleteTransaction
}) => {
    return (
        <>
          <h2>Transactions</h2>
          <table id="transactionTable">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr
                  key={transaction.id}
                  className={transaction.type === 'income' ? 'income-row' : 'expense-row'}
                >
                  <td>{transaction.category}</td>
                  <td>
                    {transaction.type === 'expense' ? '-' : ''}
                    ${parseFloat(transaction.amount).toFixed(2)}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
    )
}