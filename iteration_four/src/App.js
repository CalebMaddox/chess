import "./main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Account from "./Account";
import SignUp from "./SignUp";
import About from "./About";
import Contact from "./Contact";

const userId = "";
// get user's id if they have one stored

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home userId={userId ? userId : null} />}></Route>
        <Route path="/account" element={<Account userId={userId} />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/about" element={<About userId={userId} />}></Route>
        <Route path="/contact" element={<Contact userId={userId} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
