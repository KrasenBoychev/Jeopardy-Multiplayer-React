import { NavLink } from 'react-router-dom';

import './header.css';

export default function Header() {


    return (
        <nav>
           
            <ul className='logo'>
                <li>
                    Logo
                </li>
                <li>
                    <NavLink to='/'>
                        Jeopardy
                    </NavLink>
                </li>
            </ul>
            <ul className='points'>
                <li>
                    Points won today: e.g. 1000
                </li>
                <li>
                    My Rating: e.g. 8.5
                </li>
            </ul>
            <ul className='profile'>
                <li>
                    <NavLink>
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        Register
                    </NavLink>
                </li>
            </ul>
           
        </nav>
    );
}