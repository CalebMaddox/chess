// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import * as React from "react";
import { useRoutes } from "react-router-dom";

import Home from "./Home";
// import Id from "./Id";

function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return <Home />;
}

export default App;
