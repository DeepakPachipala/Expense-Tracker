import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';


function ExpenseForm() {
    const {addExpense, error, setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    })

    const { title, amount, date, category,description } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        addExpense(inputState)
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        })
    }

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input 
                    type="text" 
                    value={title}
                    name={'title'} 
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input value={amount}  
                    type="text" 
                    name={'amount'} 
                    placeholder={'Expense Amount'}
                    onChange={handleInput('amount')} 
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled >Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>  
                    <option value="travelling">Travelling</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
                <Button 
                    name={'Add Expense'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </ExpenseFormStyled>
    )
}


const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;

    .error {
        color: #ff4d4f;
        font-size: 0.95rem;
        font-weight: 500;
        text-align: center;
        background: #fff0f0;
        padding: 0.5rem;
        border-radius: 8px;
    }

    .input-control,
    .selects {
        width: 100%;
    }

    input,
    textarea,
    select {
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
        padding: 0.75rem 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
        transition: all 0.3s ease;
        width: 100%;
        color: #222;

        &:focus {
            outline: none;
            border-color: var(--color-primary, #4CAF50);
            background-color: #fff;
        }

        &::placeholder {
            color: #aaa;
        }
    }

    textarea {
        resize: vertical;
        min-height: 100px;
    }

    .selects select {
        appearance: none;
        background-color: #f9f9f9;
        color: #555;
    }

    .submit-btn {
        display: flex;
        justify-content: center;

        button {
            background-color: var(--color-accent, #4CAF50);
            color: #fff;
            padding: 0.8rem 1.6rem;
            font-size: 1rem;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: background 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

            &:hover {
                background-color: var(--color-green, #43a047);
            }
        }
    }

    /* DatePicker Custom Styling */
    .react-datepicker-wrapper {
        width: 100%;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        padding: 1.5rem;

        input,
        textarea,
        select {
            font-size: 0.95rem;
        }

        .submit-btn button {
            width: 100%;
        }
    }

    @media (max-width: 480px) {
        padding: 1rem;

        .submit-btn button {
            font-size: 0.9rem;
        }
    }
`;

export default ExpenseForm