import { useState } from 'react';
import './App.css';
import CurrencyInput from './components/CurrencyInputs/CurrencyInput';
import { useEffect } from 'react';
import axios from 'axios';
import { useCallback } from 'react';

export default function App() {

    const [firstCoin, setFirstCoin] = useState(1);
    const [secondCoin, setSecondCoin] = useState(1);

    const [currency1, setCurrency1] = useState("USD");
    const [currency2, setCurrency2] = useState("EUR");

    const [rates, setRates] = useState(null);

    useEffect(() => {
        axios.get("https://api.exchangerate-api.com/v4/latest/USD")
            .then((res) => {
                setRates(res.data.rates);
                console.log(res.data.rates);
            })
            .catch((err) => {
                console.log(err);
                setRates({});
            });
    }, []);

    function format(number) {
        return number.toFixed(2);
    }

    const handleAmountChange = useCallback(
        (firstCoin) => {

            if (rates) {
                setSecondCoin(format(((firstCoin * rates[currency2]) / rates[currency1])));
                setFirstCoin(firstCoin);
            }
        }, [rates, currency1, currency2]);

    useEffect(() => {
        if (rates) {
            handleAmountChange(firstCoin);
        }
    }, [rates, firstCoin, handleAmountChange]);

    function handleCurrency1Change(currency1) {
        if (rates) {
            setSecondCoin(((firstCoin * rates[currency2]) / rates[currency1]));
            setCurrency1(currency1);
        }
    }

    function handleAmount2Change(secondCoin) {
        if (rates) {
            setFirstCoin(format((secondCoin * rates[currency1]) / rates[currency2]));
            setSecondCoin(secondCoin);
        }
    }

    function handleCurrency2Change(currency2) {
        if (rates) {
            setFirstCoin(format((secondCoin * rates[currency1]) / rates[currency2]));
            setCurrency2(currency2);
        }
    }

    if (!rates) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="container">
                <h1>Conversor de Moedas</h1>
                <div className="content">
                    <ul>
                        <li><h3>Digite os valores que deseja converter.</h3></li>
                        <li><h3>Em seguida, selecione as moedas.</h3></li>
                    </ul>
                    <div className="inputs">

                        <CurrencyInput
                            onAmountChange={handleAmountChange}
                            onCurrencyChange={handleCurrency1Change}
                            currencies={Object.keys(rates)}
                            amount={firstCoin}
                            currency={currency1}
                        />

                        <CurrencyInput
                            onAmountChange={handleAmount2Change}
                            onCurrencyChange={handleCurrency2Change}
                            currencies={Object.keys(rates)}
                            amount={secondCoin}
                            currency={currency2}
                        />

                    </div>
                </div>
            </div>
        </>
    );
}