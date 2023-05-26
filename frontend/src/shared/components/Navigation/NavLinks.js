import React, { useContext } from "react";
import Button from "../FormElements/Button";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/main/page`}>MAIN PAGE</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <Button onClick={auth.logout}>LOGOUT</Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
