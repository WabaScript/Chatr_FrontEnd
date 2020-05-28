import React from 'react'
import { ReactDOM } from 'react-dom'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";

const NavBar = props => {
    
      const linkAnimation = useSpring({
        from: { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
        to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
        delay: 800,
        config: config.wobbly,
      });

      const barAnimation = useSpring({
        from: { transform: 'translate3d(0, -10rem, 0)' },
        transform: 'translate3d(0, 0, 0)',
      });

    return (
        <div style={barAnimation}>
            <FlexContainer>
                <NavLinks style={linkAnimation}>
                    <a href="/" >HomesweetHome</a>
                    <a href="/newChat" >Create New Chat</a>
                    <a href="/chats" >Chatr Chats</a>
                    {/* <a href="/popchats" >Quote of the Day</a> */}
                    <a href="/profile" >Profile</a>
                    {!props.currentUser ? <a href="/login" >Login</a> : null}
                    <a href="/signup" >Become One of Us</a>
                </NavLinks>
            </FlexContainer>
        </div>
    )

}

export default NavBar;



const FlexContainer = styled.div`
  max-width: 110rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;;
  justify-content: space-between;
  height: 5rem;
  background: 73c0ec;
`;

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    color: blue;
    text-transform: uppercase;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: rgba(0,0,0,0.57);
      border-bottom: 8px solid #73c0ec;
    }

    @media (max-width: 768px) {
      display: :inline-block;
    }
  }
`;