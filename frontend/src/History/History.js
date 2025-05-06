import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import * as XLSX from 'xlsx';

function History() {
  const { transactionHistory } = useGlobalContext();
  const [...history] = transactionHistory()

  const [filter, setFilter] = useState('all'); // 'all', 'income', or 'expense'

  // Filter transactions based on the selected filter
  const historyDetails = history.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  // Separate transactions into incomes and expenses
  const incomes = history.filter(item => item.type === 'income');
  const expenses = history.filter(item => item.type === 'expense');

  const allTransactions = [...incomes, ...expenses];
  // Function to export data as an Excel file with two sheets (Incomes and Expenses)
  const exportToExcel = () => {
    // Convert income and expense data to sheets
    const incomeSheet = XLSX.utils.json_to_sheet(incomes);
    const expenseSheet = XLSX.utils.json_to_sheet(expenses);
    const allSheet = XLSX.utils.json_to_sheet(allTransactions);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Append both sheets to the workbook
    XLSX.utils.book_append_sheet(workbook, allSheet, 'All transactions');
    XLSX.utils.book_append_sheet(workbook, incomeSheet, 'Incomes');
    XLSX.utils.book_append_sheet(workbook, expenseSheet, 'Expenses');

    // Write the file to disk
    XLSX.writeFile(workbook, 'TransactionHistory.xlsx');
  };

  return (
    <HistoryStyled>
      <h2>Recent History</h2>

      <FilterButtons>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('income')}>Income</button>
        <button onClick={() => setFilter('expense')}>Expense</button>
      </FilterButtons>

      {/* Button to download all transactions with incomes and expenses in separate sheets */}
      <DownloadButton onClick={exportToExcel}>
        Download Transactions
      </DownloadButton>

      {historyDetails.map((item) => {
        const { _id, title, amount, type } = item;
        return (
          <div key={_id} className="history-item">
            <p
              style={{
                color: type === 'expense' ? 'red' : 'var(--color-green)',
                fontWeight: 'bold',
              }}
            >
              {title}
            </p>

            <p
              style={{
                color: type === 'expense' ? 'red' : 'var(--color-green)',
                fontWeight: 'bold',
              }}
            >
              {type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0 : amount}`}
            </p>
          </div>
        );
      })}
    </HistoryStyled>
  );
}

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;

  h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #333;
  }

  .history-item {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.3s ease;
  }

  .history-item:hover {
    transform: translateY(-5px);
  }
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;

  button {
    padding: 0.5rem 1rem;
    background-color: #f4f4f4;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 1rem;
    font-weight: bold;

    &:hover {
      background-color: #e1e1e1;
    }

    &:focus {
      outline: none;
    }

    &:active {
      background-color: #d1d1d1;
    }
  }
`;

const DownloadButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  border: none;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;
  font-weight: bold;
  margin: 0.5rem 0;

  &:hover {
    background-color: #45a049;
  }

  &:focus {
    outline: none;
  }

  &:active {
    background-color: #388e3c;
  }
`;

export default History;
