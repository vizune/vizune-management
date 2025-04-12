'use client'; // Important for using React hooks like useState

import { useState } from 'react';

export default function AddExpense() {
  const [billDate, setBillDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [account, setAccount] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleAddItem = () => {
    const newItem = { account, description, amount: parseFloat(amount) };
    setItems([...items, newItem]);
    setTotalAmount(totalAmount + parseFloat(amount));
    // Clear fields after adding item
    setAccount('');
    setDescription('');
    setAmount('');
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    // Recalculate total after deletion
    setTotalAmount(updatedItems.reduce((sum, item) => sum + item.amount, 0));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Add Expense</h1>

      {/* Expense Dates */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Expense Date</label>
          <input
            type="date"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={billDate}
            onChange={(e) => setBillDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      {/* Account Details */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Account</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={handleAddItem}
          className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          Add Expense Item
        </button>
      </div>

      {/* Line Item Table */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Expense Details</h3>
        <table className="min-w-full table-auto mt-4">
          <thead>
            <tr>
              <th className="p-3 text-left text-sm font-medium text-gray-700">#</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">Account</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">Description</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">Amount</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{item.account}</td>
                <td className="p-3">{item.description}</td>
                <td className="p-3">{item.amount.toFixed(2)}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDeleteItem(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Amount */}
      <div className="text-right font-semibold">
        <p>Total: <span className="text-lg text-blue-600">${totalAmount.toFixed(2)}</span></p>
      </div>
    </div>
  );
}
