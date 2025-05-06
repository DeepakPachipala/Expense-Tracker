import React, { useState } from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';

function Navigation({ active, setActive }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <HeaderStyled>
            <div className="logo-con">
                <img src={avatar} alt="Avatar" />
                <div className="text">
                    <h2>Mike</h2>
                    <p>Your Money</p>
                </div>
            </div>
            <div className="menu-container">
                <ul className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
                    {menuItems.map((item) => {
                        return (
                            <li
                                key={item.id}
                                onClick={() => setActive(item.id)}
                                className={active === item.id ? 'active' : ''}
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </li>
                        );
                    })}
                </ul>
                {/* Hamburger Menu (three dots) */}
                <div className="hamburger-menu" onClick={toggleMenu}>
                    <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                </div>
            </div>
            <div className="bottom-nav">
                <li>{signout} Sign Out</li>
            </div>
        </HeaderStyled>
    );
}

const HeaderStyled = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background: rgba(252, 246, 249, 0.95); /* Lighter transparent background for a clean header */
    backdrop-filter: blur(6px);
    border-bottom: 2px solid #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    z-index: 999;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);

    .logo-con {
        display: flex;
        align-items: center;
        gap: 1rem;

        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            padding: 0.2rem;
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
        }

        .text {
            color: rgba(34, 34, 96, 1);
            h2 {
                font-size: 1.4rem;
                font-weight: 600;
            }
            p {
                color: rgba(34, 34, 96, 0.6);
                font-size: 1rem;
            }
        }
    }

    .menu-container {
        display: flex;
        align-items: center;
        gap: 1.5rem;

        .menu-items {
            display: flex;
            gap: 2rem;
            list-style-type: none;

            li {
                display: flex;
                align-items: center;
                cursor: pointer;
                transition: all 0.3s ease-in-out;
                font-weight: 500;
                color: rgba(34, 34, 96, 0.8);
                padding: 0.5rem;

                i {
                    color: rgba(34, 34, 96, 0.8);
                    font-size: 1.4rem;
                    margin-right: 0.8rem;
                    transition: all 0.3s ease-in-out;
                }

                span {
                    font-size: 1.1rem;
                }
            }

            &.open {
                display: block;
                position: absolute;
                top: 80px;
                left: 0;
                width: 100%;
                background: rgba(252, 246, 249, 0.95);
                backdrop-filter: blur(6px);
                box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
                border-bottom: 2px solid #FFFFFF;
                border-radius: 8px;
                flex-direction: column;
                gap: 1rem;
                padding: 1rem 0;
                z-index: 1000;
            }
        }

        .hamburger-menu {
            display: none;
            flex-direction: column;
            gap: 5px;
            cursor: pointer;

            .bar {
                width: 25px;
                height: 3px;
                background-color: #222260;
                border-radius: 5px;
                transition: all 0.3s ease;
            }

            .bar.open {
                transform: rotate(45deg);
                &:nth-child(1) {
                    transform: rotate(45deg) translateY(8px);
                }
                &:nth-child(2) {
                    opacity: 0;
                }
                &:nth-child(3) {
                    transform: rotate(-45deg) translateY(-8px);
                }
            }
        }
    }

    .active {
        color: rgba(34, 34, 96, 1) !important;
        i {
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }

    .bottom-nav {
        display: none;
    }

    // Responsiveness: For smaller screens
    @media (max-width: 768px) {
        padding: 0 1rem;

        .menu-items {
            gap: 1.5rem;
        }

        .logo-con {
            gap: 0.8rem;
            img {
                width: 40px;
                height: 40px;
            }
        }

        .hamburger-menu {
            display: flex;
        }

        .menu-items {
            display: none; /* Menu is hidden by default */
        }

        .menu-items.open {
            display: block;
            position: absolute;
            top: 80px;
            left: 0;
            width: 100%;
            background: rgba(252, 246, 249, 0.95);
            backdrop-filter: blur(6px);
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
            border-bottom: 2px solid #FFFFFF;
            border-radius: 8px;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 0;
            z-index: 1000;
        }
    }
`;

export default Navigation;
