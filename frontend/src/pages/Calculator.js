import React, { useState } from 'react';

const SendValue = () => {
    const [priceBefore, setPriceBefore] = useState('');
    const [discount, setDiscount] = useState('');
    const [discountType, setDiscountType] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/send-value', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value: { priceBefore, discount, discountType } }),
            });

            const data = await response.json();
            setResponseMessage(data.message);
        } catch (error) {
            console.error('Error sending value:', error);
        }
    };

    return (
        <div>
            <div className="Calculator w-1/4 m-auto bg-slate-100 p-4 mt-8 rounded-md">
                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                            Price before discount
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                                type="text"
                                name="price"
                                id="price"
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="0.00"
                                value={priceBefore}
                                onChange={(e) => setPriceBefore(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                            Discount type
                        </label>
                        <div className="flex gap-4">

                            <span className="flex items-center mb-2 mt-2">
                                <input
                                    id="default-radio-1"
                                    type="radio"
                                    value="percent"
                                    name="discount-type"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={(e) => setDiscountType(e.target.value)}
                                />
                                <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium">Percent off</label>
                            </span>
                            <span className="flex items-center">
                                <input
                                    id="default-radio-2"
                                    type="radio"
                                    value="fixed"
                                    name="discount-type"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={(e) => setDiscountType(e.target.value)}
                                />
                                <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium">Fixed amount off</label>
                            </span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                            Discount
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 sm:text-sm">
                                    {
                                        discountType === "percent" ?
                                            "%" :
                                            "$"
                                    }
                                </span>
                            </div>
                            <input
                                type="text"
                                name="price"
                                id="price"
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="0.00"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                            onClick={() => {
                                setPriceBefore("");
                                setDiscount("");
                                setResponseMessage("");
                            }}
                        >
                            Clear
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Calculate
                        </button>
                    </div>
                </form>
            </div>
            {
                responseMessage.priceAfter &&
                <div className="Calculator w-1/4 m-auto bg-slate-200 p-4 mt-4 rounded-md">
                    <p>Price after discount: ${responseMessage.priceAfter}</p>
                    {
                        (discountType === "percent") ?
                            <p>You saved: ${responseMessage.savedValue}</p> :
                            <p>Discount percentage: {responseMessage.savedValue}%</p>
                    }
                </div>
            }
        </div>
    );
};

export default SendValue;
