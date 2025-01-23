import './CurrencyInput.css';
export default function CurrencyInput({
    amount, currency, onAmountChange, onCurrencyChange, currencies
}) {
    return (
        <>
            <div className="container-input">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => onAmountChange(parseFloat(e.target.value))}
                />

                <select
                    value={currency}
                    onChange={(e) => onCurrencyChange(e.target.value)}
                >
                    {
                        currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))
                    }
                </select>
            </div>
        </>
    );
}