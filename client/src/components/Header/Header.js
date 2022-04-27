import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container, NavLink } from "react-bootstrap";
import { Button, Avatar, Box, Badge, IconButton } from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import * as actionType from "./../../helpers/constants";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import useStyles from "./styles";
const Header = ({ items, isAdmin }) => {
  const pages = ["coins", "biscuits"];
  const pageItems = [
    [1, 2, 5, 10],
    [25, 30],
  ];
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className={classes.navbar}>
      <Container>
        <Navbar.Brand onClick={() => history.push("/")}>Fintech</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {pages.map((page, i) => (
              <NavLink
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  textTransform: "capitalize",
                }}
              >
                <span onClick={() => history.push(`/shop/${page}`)}>
                  {page}
                </span>
                <NavDropdown title="" id="basic-nav-dropdown">
                  {pageItems[i].map((item, i) => (
                    <NavDropdown.Item
                      key={i}
                      onClick={() => history.push(`/shop/${page}?gram=${item}`)}
                    >
                      {item} {item > 1 ? "grams" : "gram"}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              </NavLink>
            ))}
          </Nav>
        </Navbar.Collapse>
        {user?.result ? (
          <Box
            style={{
              display: "flex",
              marginLeft: "auto",
              alignItems: "center",
            }}
          >
            {!isAdmin && (
              <Nav.Link onClick={() => history.push("/myBag")}>
                <Badge badgeContent={items} color="error">
                  <ShoppingCartIcon style={{ color: "grey" }} />
                </Badge>
              </Nav.Link>
            )}
            <NavDropdown
              title={
                <IconButton sx={{ p: 0, color: "grey" }}>
                  <Avatar alt="Remy Sharp" src="" />
                </IconButton>
              }
              id="basic-nav-dropdown"
            >
              {isAdmin && (
                <NavDropdown.Item onClick={() => history.push("/form")}>
                  create
                </NavDropdown.Item>
              )}
              <NavDropdown.Item onClick={() => history.push("/orders")}>
                orders
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>logout</NavDropdown.Item>
            </NavDropdown>
          </Box>
        ) : (
          <Button style={{ color: "white" }} component={Link} to="/auth">
            signin
          </Button>
        )}
      </Container>
    </Navbar>
  );
};
export default Header;
