import React from 'react'
import { Navbar,Container,Nav, NavDropdown } from 'react-bootstrap' 
import { LinkContainer } from 'react-router-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {logout} from '../actions/userActions.js'

const Header = () => {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }
  return ( 
      <header>
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
            <LinkContainer to='/'>
                <Navbar.Brand>ProShop</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <LinkContainer to='/cart'>
                        <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                    </LinkContainer>
                    {userInfo ? (
                        <NavDropdown title={userInfo.name} id = 'username'>
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}>
                                logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) :
                    (<LinkContainer to='/login'>
                    <Nav.Link><i className='fas fa-user'></i> Sign In</Nav.Link>
                </LinkContainer>)}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    </header>
  )
}

export default Header