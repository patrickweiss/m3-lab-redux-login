import * as React from 'react';
import { NavLink } from 'react-router-dom';

const nav = ( props: any ) => {
    return (
        <nav>
            <ul>
                <li><NavLink exact={true} to="/">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="/showassets">Assets</NavLink></li>
            </ul>
        </nav>
    )
}
export default nav;