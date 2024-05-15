import React, { useState } from 'react';
import InputBox from "./InputBox";
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("INR");
    const [convertedAmount, setConvertedAmount] = useState(0);
    const currencyInfo = useCurrencyInfo(from);

    const options = Object.keys(currencyInfo);

    const swap = () => {
        const tempAmount = amount;
        setAmount(convertedAmount);
        setConvertedAmount(tempAmount * currencyInfo[from]);

        setFrom(to);
        setTo(from);
    }

    const handleAmountChange = (newAmount) => {
        setAmount(newAmount);
        setConvertedAmount(Number((newAmount * currencyInfo[to]).toFixed(2)));
    };

    return (
        <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://www.tripsavvy.com/thmb/XlOiDI2VV3X7jgcuVSj7TZWfI34=/6292x4559/filters:fill(auto,1)/pound-coins-and-bank-notes-909209056-5af38dc11d64040036b164f8.jpg')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setFrom(currency)}
                                selectCurrency={from.toUpperCase()}
                                onAmountChange={handleAmountChange}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to.toUpperCase()}
                                amountDisable
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
