import React from 'react'
import { NavLink } from 'react-router-dom';


export default function Header() {
    return (
        
    <div>
      <h1>Expensify</h1>
          <div className='navLinks'>
                <NavLink to='/' activeClassName='is-active' exact={true}>Dashboard</NavLink>
                <NavLink to='/create' activeClassName='is-active'>Create</NavLink>
               
                <NavLink to='/help' activeClassName='is-active'>Help</NavLink>
          </div>
    </div>
        
    )
}
