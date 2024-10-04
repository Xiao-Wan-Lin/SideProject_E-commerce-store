import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import { useEffect, useRef } from "react";

const NavComponent = ({ filterProducts, memberName, itemCount }) => {
  const navRef = useRef(null);
  useEffect(() => {
    const handleClick = () => {
      const checkbox = document.getElementById("switch");
      if (checkbox) {
        checkbox.checked = false;
      }
    };

    const navLinks = navRef.current.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", handleClick);
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return (
    <div className="banner">
      <div className="logo">
        <img src={require("../picture/logo1.jpg")} alt="logo" />
      </div>
      <nav ref={navRef}>
        <input type="checkbox" id="switch" />
        <label for="switch">
          <img src={require("../picture/burger.png")} alt="menu" />
        </label>
        <ul>
          <li>
            <Link to="/" className="home" onClick={() => filterProducts("all")}>
              全部商品
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => filterProducts("top")}>
              上身
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => filterProducts("bottom")}>
              下身
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => filterProducts("dress")}>
              洋裝
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => filterProducts("outer")}>
              外套
            </Link>
          </li>
          {/* <li>
            <Link to="/">關於我們</Link>
          </li> */}
        </ul>
        <div className="icons">
          <Link to={memberName ? "/member" : "/login"} className="icon">
            <img src={require("../picture/person.png")} alt="member" />
          </Link>
          <Link to="/cart" className="icon">
            {/* <img src={require("../picture/tote-bag.png")} alt="bag" /> */}
            {/* itemCount = cart.length */}
            <CartIcon itemCount={itemCount} />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavComponent;
