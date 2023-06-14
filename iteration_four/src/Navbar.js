import { Link } from "react-router-dom";

import "./navbar.css";

export default function Navbar({ userId }) {
  const accountBtnText = userId ? "Account" : "Sign Up";

  const accountBtn = (
    <Link
      to={userId ? "/account" : "/signUp"}
      className="btn-outline clr-schm-primary">
      {accountBtnText}
    </Link>
  );

  return (
    <>
      <div className="page-nav">
        <Link to="/">
          <h1 className="nav-title fnt-cursive">
            <span className="fs-l">C</span>oolest{" "}
            <span className="fs-l">C</span>
            hess
          </h1>
        </Link>
        <nav>
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/contact"}>Contact</Link>
        </nav>
        <div className="wrapper no-fit-wrapper nav-btn-wrapper">
          {accountBtn}
        </div>
      </div>
    </>
  );
}
