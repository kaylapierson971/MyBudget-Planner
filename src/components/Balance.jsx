export const Balance = ({
  balance
}) => {
    return (
        <>
          <div id="balance">Balance: ${balance.toFixed(2)}</div>
        </>
    )
}
