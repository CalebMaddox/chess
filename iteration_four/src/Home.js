import "./home.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function Home({ userId }) {
  return (
    <>
      <div className="full-width pageSize-container">
        <Navbar userId={userId}></Navbar>
        <header>
          <h1 className="fnt-cursive">
            <span className="fs-l">C</span>oolest{" "}
            <span className="fs-l">C</span>
            hess
          </h1>
          <div className="row">
            <Link to="/gameSelect" className="btn-filled clr-schm-primary">
              Start Game
            </Link>
            <Link to="/puzzleSelect" className="btn-outline clr-schm-primary">
              Try Puzzles
            </Link>
          </div>
        </header>
        <div className="home-background"></div>
      </div>
      <div className="homePage-background"></div>
      
    </>
  );
}
