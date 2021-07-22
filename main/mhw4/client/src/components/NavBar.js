import React, { useContext } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom'
const NavBar = observer(() => {
    const { user } = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="info" variant="info">
            <Container>
                <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>SVETOFOR</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button
                            variant={"success"}
                            onClick={() => history.push(ADMIN_ROUTE)}
                        >
                            <i class="fas fa-plus"></i>
                        </Button>
                        <Button
                            variant={"warning"}
                            onClick={() => history.push(BASKET_ROUTE)}
                            className="ml-2"
                        >
                            <i class="fas fa-shopping-cart"></i>
                        </Button>
                        <Button
                            variant={"danger"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            <i class="fas fa-sign-out-alt"></i>
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant={"success"} onClick={() => history.push(LOGIN_ROUTE)}><i class="fas fa-sign-in-alt"></i></Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;
