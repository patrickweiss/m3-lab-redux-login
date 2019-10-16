import * as React from 'react';
import { NavLink } from 'react-router-dom';

const nav = ( props: any ) => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/more">More</NavLink></li>
            </ul>
        </nav>
    )
}
export default nav;