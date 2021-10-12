import React from 'react';
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./Navbarelements";

const Navbar  = () => {

    return (
        <>
           <Nav>
            <NavLogo to="/">
                CoinCalculator
            </NavLogo>
            <Bars />

            <NavMenu>
                <NavLink to="/signin">
                    Sign In
                </NavLink>
                <NavBtn>
                     <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>                
                </NavBtn>
            </NavMenu> 
           </Nav> 
        </>
    )
}

export default Navbar;