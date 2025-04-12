'use client';
 
import { useEffect, useState } from 'react';
 
export default function Home() {
  const [expenses, setExpenses] = useState([]);
 
  useEffect(() => {
    fetch('http://localhost:4000/expenses')
      .then((res) => res.json())
      .then(setExpenses);
  }, []);
 
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>
      <ul>
        {expenses.map((exp: any) => (
          <li key={exp.id}>
            {exp.date} - {exp.vendor} - £{exp.amount}
          </li>
        ))}
      </ul>
    </main>
  );
}