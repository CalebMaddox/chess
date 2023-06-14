import Navbar from "./Navbar";
import "./signUp.css";

export default function SignUp() {
  return (
    <>
      <Navbar></Navbar>
      <div className="page-wrapper">
        <h1 className="pageTitle">Sign Up</h1>
        <form action="">
          <label htmlFor="firstName">First Name</label>
          <input required type="text" id="firstName" />
          <label htmlFor="lastname">Last Name</label>
          <input required type="text" id="lastname" />
          <label htmlFor="email">Email</label>
          <input required type="email" id="email" />
          <label htmlFor="username">Username</label>
          <input required type="text" id="username" />
          <label htmlFor="handle">Handle</label>
          <input required type="text" id="handle" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}
