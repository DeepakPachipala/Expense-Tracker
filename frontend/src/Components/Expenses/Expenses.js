import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';

function Expenses() {
    const {addIncome,expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()

    useEffect(() =>{
        getExpenses()
    }, [])
    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-income">Total Expense: <span>${totalExpenses()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="incomes">
                        {expenses.map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
                            console.log(income)
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    width: 100%;
    padding-bottom: 2rem;

    h1 {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: #2c3e50;
    }

    .total-income {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ffffff;
        border: 2px solid #f0f0f0;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        border-radius: 16px;
        padding: 1rem 2rem;
        margin: 1.5rem 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: #333;

        span {
            font-size: 2rem;
            font-weight: 800;
            color: var(--color-green, #27ae60);
            margin-left: 0.5rem;
        }
    }

    .income-content {
        display: flex;
        gap: 2rem;
        align-items: flex-start;

        .form-container {
            flex: 1;
            min-width: 300px;
        }

        .incomes {
            flex: 2;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            overflow-y: auto;
            max-height: 600px;
            padding-right: 1rem;
        }
    }

    @media (max-width: 1024px) {
        .income-content {
            flex-direction: column;

            .incomes {
                max-height: none;
                padding-right: 0;
            }
        }

        .total-income {
            flex-direction: column;
            font-size: 1.3rem;

            span {
                font-size: 1.8rem;
            }
        }
    }

    @media (max-width: 480px) {
        h1 {
            font-size: 2rem;
        }

        .total-income {
            font-size: 1.2rem;

            span {
                font-size: 1.5rem;
            }
        }
    }
`;


export default Expenses