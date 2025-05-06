import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import DashboardHistory from '../../History/DashboardHistory';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const {
        totalExpenses,
        incomes,
        expenses,
        totalIncome,
        totalBalance,
        getIncomes,
        getExpenses
    } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        {/* Income Chart */}
                        <Chart data={incomes} title="Income Chart" type="income" />
                        
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    {dollar} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* History */}
                    <div className="history-con">
                        <DashboardHistory />
                        <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                        <div className="salary-item">
                            <p>${Math.min(...incomes.map(item => item.amount))}</p>
                            <p>${Math.max(...incomes.map(item => item.amount))}</p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item">
                            <p>${Math.min(...expenses.map(item => item.amount))}</p>
                            <p>${Math.max(...expenses.map(item => item.amount))}</p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    width: 100%;
    font-family: 'Roboto', sans-serif;
    background: #F4F5FA; // Background color for overall dashboard

    h1 {
        text-align: center;
        color: #4A4A4A;
        font-size: 3rem;
        margin-bottom: 2rem;
    }

    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        padding: 0 2rem;

        .chart-con {
            grid-column: 1 / 4;
            height: auto;
            background-color: #fff;
            border-radius: 20px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 2rem;

            .amount-con {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 1rem;

                .income, .expense, .balance {
                    background: #FCF6F9;
                    border-radius: 15px;
                    padding: 1.5rem;
                    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);

                    h2 {
                        color: #4A4A4A;
                        font-size: 1.4rem;
                        margin-bottom: 1rem;
                    }

                    p {
                        font-size: 2rem;
                        font-weight: 700;
                        color: #4A4A4A;
                    }
                }

                .income, .expense {
                    grid-column: span 2;
                }

                .balance {
                    grid-column: 1 / 5;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    p {
                        font-size: 2.8rem;
                        color: #27AE60;
                        opacity: 0.7;
                    }
                }
            }
        }

        .history-con {
            grid-column: 4 / -1;
            background-color: #fff;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

            h2 {
                margin: 1.5rem 0;
                font-size: 1.6rem;
                color: #4A4A4A;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .salary-title {
                font-size: 1.2rem;
                font-weight: bold;

                span {
                    font-size: 1.5rem;
                    color: #f39c12;
                }
            }

            .salary-item {
                background: #FCF6F9;
                padding: 1.5rem;
                border-radius: 12px;
                box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;

                p {
                    font-weight: 600;
                    font-size: 1.6rem;
                    color: #4A4A4A;
                }
            }
        }
    }

    // 💻 Tablets and Smaller Desktops
    @media (max-width: 1024px) {
        .stats-con {
            grid-template-columns: 1fr;

            .chart-con {
                .amount-con {
                    grid-template-columns: 1fr;

                    .balance {
                        grid-column: 1 / 2;
                    }
                }
            }

            .history-con {
                grid-column: auto;
            }
        }
    }

    // 📱 Mobile Devices
    @media (max-width: 768px) {
        .stats-con {
            gap: 2rem;

            .chart-con {
                .amount-con {
                    grid-template-columns: 1fr;

                    .income, .expense, .balance {
                        grid-column: auto;
                    }

                    .balance {
                        p {
                            font-size: 2.5rem;
                        }
                    }

                    .income, .expense {
                        p {
                            font-size: 2.2rem;
                        }
                    }
                }
            }

            .history-con {
                h2 {
                    font-size: 1.2rem;
                }

                .salary-title {
                    font-size: 1.2rem;

                    span {
                        font-size: 1.4rem;
                    }
                }

                .salary-item {
                    p {
                        font-size: 1.3rem;
                    }
                }
            }
        }
    }

    // 📱 Very Small Phones
    @media (max-width: 480px) {
        .stats-con {
            gap: 1rem;

            .chart-con {
                .amount-con {
                    .balance p {
                        font-size: 2rem;
                    }
                }
            }

            .history-con {
                .salary-item {
                    flex-direction: column;
                    gap: 0.5rem;
                    align-items: flex-start;
                }
            }
        }
    }
`;



export default Dashboard;
