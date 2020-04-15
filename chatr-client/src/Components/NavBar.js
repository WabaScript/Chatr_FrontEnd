import React from 'react'
import { ReactDOM } from 'react-dom'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

const link = {
    width: '100px',
    padding: '12px',
    margin: '0 6px 6px',
    background: 'blue',
    textDecoration: 'none',
    color: 'white'
  }

const NavBar = props => {
    return (
        <div>
            <NavLink to="/" exact style={link} activeStyle={{background: "orange"}}>HomesweetHome</NavLink>
            <NavLink to="/newChat" exact style={link} activeStyle={{background: "orange"}}>Create New Chat</NavLink>
            <NavLink to="/chats" exact style={link} activeStyle={{background: "orange"}}>Chatr Chats</NavLink>
            <NavLink to="/popchats" exact style={link} activeStyle={{background: "orange"}}>PoPuLaR Chatr Chats</NavLink>
            <NavLink to="/profile" exact style={link} activeStyle={{background: "orange"}}>Profile</NavLink>
            <NavLink to="/login" exact style={link} activeStyle={{background: "orange"}}>Login</NavLink>
            <NavLink to="/signup" exact style={link} activeStyle={{background: "orange"}}>Become One of Us</NavLink>
        </div>
    )

}

export default NavBar;